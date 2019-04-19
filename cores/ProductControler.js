'use strict'
import {Op} from 'sequelize'

import ProductModel from "../db/ProductModel"

export default class ProductControler {
  constructor(productModel) {
    this.productModel = productModel
    this.test = "test"
  }

  getAll(language) {
    const where = {}
    if (language)
      where.language = language
    return new Promise((res, rej) => {
        this.productModel.getProducts(where)
          .then(result => {
            const all = []
            result.forEach(products => {
              const obj = {
                actif: products.actif,
                _id: products.id,
                language: {}
              }
              products.names.forEach(e => {
                obj.language[e.language] = Object.assign({}, obj.language[e.language], {name: e.name})

              })
              products.descs.forEach(e => {
                obj.language[e.language] = Object.assign({}, obj.language[e.language], {desc: e.desc})
              })
              all.push(obj)
            })
            res(all)
          })
          .catch(err => {
            console.log(err)
            rej(err)
          })
      }
    )
  }

  newProduct(product) {
    const newProduct = {
      actif: product.actif,
      names: [],
      descs: []
    }
    Object.keys(product.languages).forEach(key => {
      newProduct.names.push({name: product.languages[key].name, language: key})
      newProduct.descs.push({desc: product.languages[key].desc, language: key})
    })
    return new Promise((res, rej) => {
        this.productModel.create(newProduct,
          {
            include: [
              ProductModel.NameModel,
              ProductModel.DescModel
            ]
          })
          .then(result => {
            res(result)
          })
          .catch(err => {
            console.log(err)
            rej(err)
          })
      }
    )

  }

  getById(id) {
    return new Promise((res, rej) => {
        this.productModel.getProductById(id)
          .then(result => {
            const obj = {
              actif: result.actif,
              _id: result.id,
              language: {}
            }
            result.names.forEach(e => {
              obj.language[e.language] = Object.assign({}, obj.language[e.language], {name: e.name})

            })
            result.descs.forEach(e => {
              obj.language[e.language] = Object.assign({}, obj.language[e.language], {desc: e.desc})
            })
            res(obj)
          })
          .catch(err => {
            console.log(err)
            rej(err)
          })
      }
    )
  }

  updateProduct(product) {
    const newProduct = {
      actif: product.actif,
      languages: product.languages
    }

    console.log(product)
    return new Promise((res, rej) => {
      this.productModel.updateProduct(newProduct, product.id)
        .then(result => {
          console.log(result)
          res(result)
        })
        .catch(err => {
          console.log(err)
          rej(err)
        })
    })

  }

  searchProduct(language, name) {
    const where = {name: {[Op.like]: '%' + name + '%'}}
    if (language)
      where.language = language
    return new Promise((res, rej) => {
        this.productModel.searchProducts(where)
          .then(result => {
            const all = []
            result.forEach(products => {
              const obj = {
                actif: products.actif,
                _id: products.id,
                language: {}
              }
              products.names.forEach(e => {
                obj.language[e.language] = Object.assign({}, obj.language[e.language], {name: e.name})

              })
              products.descs.forEach(e => {
                obj.language[e.language] = Object.assign({}, obj.language[e.language], {desc: e.desc})
              })
              all.push(obj)
            })
            res(all)
          })
          .catch(err => {
            console.log(err)
            rej(err)
          })
      }
    )
  }
}