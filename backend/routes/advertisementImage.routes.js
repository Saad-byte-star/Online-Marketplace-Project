const {getAdvertisementImages,getAdvertisementImage,addAdvertisementImage,updateAdvertisementImage,deleteAdvertisementImage} = require('../controllers/advertisementImage.controller')
const express = require("express")
const advertisementImageRouter = express.Router()

advertisementImageRouter.route("/")
.get(getAdvertisementImages)
.post(addAdvertisementImage)

advertisementImageRouter.route("/:id")
.get(getAdvertisementImage)
.put(updateAdvertisementImage)
.delete(deleteAdvertisementImage)


module.exports = advertisementImageRouter