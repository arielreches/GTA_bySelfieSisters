// where the application will be defined and created.

console.log('hello')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined')) // use morgan log generator
app.use(bodyParser.json()) // parse json requests sent in
app.use(cors()) // allow any host or client to access --needed for hosting on different domains

app.get('/status', (req, res) => {
  res.send({
    message: 'hello world!'
  })
})

app.listen(process.env.PORT || 8081)
