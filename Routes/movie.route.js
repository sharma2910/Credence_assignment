//  importing required modules
const { Movie,validate } = require('../models/movie.model')
const express = require('express')
const router = express.Router() 

// Gets all the movies in database
router.get('/', async (req,res) => {
    const movie = await Movie.find().select([ "-_id","-__v"])
    res.send(movie)
})

// Gets movie with specified ID
router.get('/:id', async (req,res) => {
    const movie = await Movie.findById(req.params.id).select([ "-_id","-__v"])
    if(!movie) return res.status(404).send(`movie with ID : ${req.params.id} not found`)
    res.send(movie)
})

// To push new data into mongoDB
router.post('/',async(req,res) => {
    // Validating req body
    const { error } = validate(req.body)
    if(error) return res.status(400).send("Bad request Body",error.message)

    let movie = new Movie({
        name: req.body.name,
        image: req.body.image,
        summary: req.body.summary
    })

    movie = await movie.save()
    res.send(movie)
})

// To update existing records
router.put('/:id', async (req,res) => {
    // Validating req body
    const { error } = validate(req.body)
    if(error) return res.status(400).send('Bad request Body')
    
    const movie = await Movie.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        image: req.body.image,
        summary: req.body.summary
    }, { new: true })

    if(!movie) return res.status(404).send('movie with given id not found')
    res.send("Updated")
})

// To delete specific records
router.delete('/:id', async (req,res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id)
    if(!movie) return res.status(404).send(`movie with ID : ${req.params.id} not found`)
    res.send(movie)
})

module.exports = router