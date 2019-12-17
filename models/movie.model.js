const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const Movie = mongoose.model('Customer',new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    }
}))

const validate = (movie) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required(),
        summary: Joi.string().required()
    })

    return schema.validate(movie)
}

module.exports = {
    Movie,
    validate
}