'use strict'
import {Sequelize} from 'sequelize'
import {db} from '../config'
import NameModel from './NameModel'
import DescModel from './DescModel'
import ProductModel from './ProductModel'

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: 'localhost',
  dialect: db.type
})
const nameModel = NameModel.init(sequelize)
const descModel = DescModel.init(sequelize)
const productModel = ProductModel.init(sequelize)

NameModel.ProductModel = nameModel.belongsTo(productModel)
ProductModel.NameModel = productModel.hasMany(nameModel)
DescModel.ProductModel = descModel.belongsTo(productModel)
ProductModel.DescModel = productModel.hasMany(descModel)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to database has been established successfully.')

    // automatically create the table
    sequelize.sync({force: true})
      .then(() => {
        return ProductModel.create({
          actif: true,
          names: [{name: "plat"}, {name: 'plate', language: 'EN'}],
          descs: [{desc: "Un bon plat"}, {desc: 'a delicious plate', language: 'EN'}]
        }, {
          include: [
            ProductModel.NameModel,
            ProductModel.DescModel
          ]
        })
      })
      .then(created => ProductModel.create({
        actif: false,
        names: [{name: "spageti"}, {name: 'spagetiEN', language: 'EN'}],
        descs: [{desc: "des pattes"}, {desc: 'pasta', language: 'EN'}]
      }, {
        include: [
          ProductModel.NameModel,
          ProductModel.DescModel
        ]
      }))
      .catch(err => console.log(err))
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
    process.exit()
  })

export {productModel}