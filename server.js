require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const MOVIEDEX = require('../moviedex-api/MovieData/moviedex.json')
const cors = require('cors')
const helmet = require('helmet')

// console.log(process.env.API_TOKEN)

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.use(function validateBearerToken(req, res, next){
    console.log('validate bearer token middleware')
    debugger
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')
    if(!authToken || authToken.split(' ')[1]!== apiToken) {
        return res.status(401).json({error: 'unAuthorized Request'})
    }
    //move to next middleware
    next()
})

app.get('/movies', function handleGetMovies(req, res) {
    let response = MOVIEDEX

    if(req.query.genre) {
        response = response.filter(movie => movie.genre.toLowerCase().includes(req.query.genre.toLowerCase()))
    }

    if(req.query.country) {
        response = response.filter(movie => movie.country.toLowerCase().includes(req.query.country.toLowerCase()))
    }

    if(req.query.avg_vote) {
        response = response.filter(movie => movie.avg_vote.toLowerCase().includes(req.query.avg_vote.toLowerCase()))
    }

    return res.json(response)

})

PORT = 8000

app.listen(PORT, () => {
    console.log('Hello from express !')
})