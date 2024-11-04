const express = require("express")
const AdvertisementTypeRouter = express.Router()
const {getAdvertisementTypes,getAdvertisementType,addAdvertisementType,updateAdvertisementType,deleteAdvertisementType} = require("../controllers/advertisementType.controller")


AdvertisementTypeRouter.route("/")
.get(getAdvertisementTypes)
.post(addAdvertisementType)

AdvertisementTypeRouter.route("/:id")
.get(getAdvertisementType)
.put(updateAdvertisementType)
.delete(deleteAdvertisementType)


module.exports = AdvertisementTypeRouter