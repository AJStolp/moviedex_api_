require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const MOVIEDEX = require('./moviedex.json')
const cors = require('cors')
const helmet = require('helmet')

console.log(process.env.API_TOKEN)

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.use(function validateBearerToken(req, res, next){
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')

    if(!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({error: 'unAuthorized Request'})
    }
    //move to next middleware
    next()
})

app.get('/movies', function handleGetMovies(req, res) {
    res.send('Here are your movies')
})



PORT = 8000

app.listen(PORT, () => {
    console.log('Hello from express !')
})