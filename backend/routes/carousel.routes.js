const express = require('express')
const carouselRouter = express.Router()
const upload = require('../middlewares/multer.middleware')
const {getCarousels,addCarousel} = require('../controllers/carousel.controller')

carouselRouter.route('/')
.get(getCarousels)
.post(upload.single('Image'),addCarousel)

module.exports = carouselRouter