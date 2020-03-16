require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const MOVIEDEX = require('./moviedex.json')

const app = express()

app.use(morgan('dev'))

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

app.get('/genre', function handleGenre(req,res) {
    res.send('here is you genre')
})

app.get('/country', function handleCountry(req,res){
    res.send('Here are you movies by country')
})

app.get('/avg_vote', function handleVote(req, res){
    req.send('Here are your movies by vote')
})

PORT = 8000

app.listen(PORT, () => {
    console.log('Hello from express !')
})