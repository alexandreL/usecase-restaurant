'use strict'
import {ENUM, Model, STRING, INTEGER} from 'sequelize'
import {params} from "../config"

export default class DescModel extends Model {
  static init(sequelize) {
    return super.init(
      {
        desc: {
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
        modelName: 'desc'
      }
    )
  }
}