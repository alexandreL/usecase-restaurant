import {Sequelize} from 'sequelize'
import {db} from '../config'

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: 'localhost',
  dialect: db.type
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to database has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
    process.exit()
  })

export {sequelize as db}