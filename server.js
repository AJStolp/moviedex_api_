require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const MOVIEDEX = require('./moviedex.json')

const app = express()

app.use(morgan('dev'))


app.use((req, res) => {
    console.log('I am working hi!')
})

PORT = 8000

app.listen(PORT, () => {
    console.log('Hello from express !')
})