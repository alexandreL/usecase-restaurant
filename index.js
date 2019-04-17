'use strict'

import express from 'express'
import {server} from './config'
import api from './routes'

const app = express()

// access to web pages
app.use(express.static('public'))

app.use(api)

app.listen(server.port, server.host,  () => {
  console.log(`App running on http://${server.host}:${server.port}`)
})
