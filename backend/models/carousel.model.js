const mongoose = require('mongoose')

const carouselSchema = new mongoose.Schema({
    Image:{
        type: mongoose.SchemaTypes.String,
        required: true
    },
    Title:{
        type: mongoose.SchemaTypes.String,
        required: true
    },
    Description:{
        type: mongoose.SchemaTypes.String,
        required: true
    }
})

const Carousel = new mongoose.model('Carousel',carouselSchema)

module.exports = Carousel