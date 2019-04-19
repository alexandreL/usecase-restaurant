'use strict'
import {BOOLEAN, Model} from 'sequelize'
import NameModel from "./NameModel"
import DescModel from "./DescModel"

export default class ProductModel extends Model {
  static init(sequelize) {
    return super.init(
      {
        actif: {
          type: BOOLEAN,
          defaultValue: true
        }
      },
      {
        sequelize,
        modelName: 'product'
      }
    )
  }

  static getProducts(where) {
    return this.findAll({
      include: [{
        model: NameModel,
        where
      }, {
        model: DescModel,
        where
      }],
      order: [["createdAt", "ASC"]]
    })
  }

  static searchProducts(where) {
    return this.findAll({
      include: [{
        model: NameModel,
        where
      }, {
        model: DescModel
      }],
      order: [["createdAt", "ASC"]]
    })
  }

  static getProductById(id) {
    return this.findOne({
      where: {id},
      include: [{
        model: NameModel
      }, {
        model: DescModel
      }],
      order: [["createdAt", "ASC"]]
    })
  }

  static updateProduct(newProduct, id) {
    return this.sequelize.transaction(t => {
      return this.update(newProduct, {
        where: {id},
        include: [
          ProductModel.NameModel,
          ProductModel.DescModel
        ],
        transaction: t
      })
        .then(async product => {
          return await Promise.all([
            NameModel.findAll({where: {productId: id}}).then(async result => {
              return await result.forEach(async el => {
                await el.update({name: newProduct.languages[el.language].name}, {transaction: t})
              })
            }),
            await DescModel.findAll({where: {productId: id}}).then(async result => {
              return await result.forEach(async el => {
                await el.update({desc: newProduct.languages[el.language].desc}, {transaction: t})
              })
            })

          ])
        })
    })
  }
}
