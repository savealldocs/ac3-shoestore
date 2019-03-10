const express = require('express')
const http = require('http')
const debug = require('debug')
var swaggerJSDoc = require('swagger-jsdoc')
// Set Port
const port = process.env.PORT || '3000'

const app = express()

// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Inventory API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger'
  },
  host: 'localhost:3000',
  basePath: '/'
}
// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./**/routes/*.js']// pass all in array
}
// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options)

app.set('port', port)

app.get('/', (req, res) => {
  res.status(200).send('OK')
})
app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec) 
})

const server = http.createServer(app)
server.listen(port, () => console.log(`Running on localhost:${port}`))

module.exports = server
