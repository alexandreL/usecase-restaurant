'use strict'
import {ENUM, INTEGER, Model, STRING, UUID} from 'sequelize'
import {params} from '../config'

export default class NameModel extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: STRING
        },
        language: {
          type: ENUM,
          values: params.languages,
          defaultValue: params.defaultLanguage
        },
        productId: {
          type: INTEGER,
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: 'name'
      }
    )
  }
}