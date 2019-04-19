import express from 'express'
import bodyParser from 'body-parser'

// routes
import product from './product'
import restorant from './restorant'

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// allow POST from the navigator
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
})

app.use('/api', product, restorant)

export default app