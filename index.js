const express = require('express');
const app = express()
const movie = require('./Routes/movie.route')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/Movies').then( () => {
    console.log('Connected to mongo DB')
}).catch( () => {
    console.log('Error connecting to mongo DB')
})

app.use(express.json())
app.use('/api/movies',movie)

const port = 3000 || process.env.PORT
app.listen(port, () => {
    console.log(`Appliction live on port: ${port}`);
})