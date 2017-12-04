// where the application will be defined and created.

console.log('hello')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined')) // use morgan log generator to track requests
app.use(bodyParser.json()) // parse json requests sent in
app.use(cors()) // allow any host or client to access --needed for hosting on different domains

app.post('/signup', (req, res) => {
  res.send({
    message: `Your user at ${req.body.email} was registered`
  })
})

app.listen(process.env.PORT || 8081)
