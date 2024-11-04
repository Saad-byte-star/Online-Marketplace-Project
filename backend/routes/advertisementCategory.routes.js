const express = require("express")
const advertisementCategoryRouter = express.Router()
const upload = require("../middlewares/multer.middleware")
const {getAdvertisementCategories,getAdvertisementCategory,addAdvertisementCategory,updateAdvertisementCategory,deleteAdvertisementCategory} = require("../controllers/advertisementCategory.controller")


advertisementCategoryRouter.route("/")
.get(getAdvertisementCategories)
.post(upload.single("Image"),addAdvertisementCategory)

advertisementCategoryRouter.route("/:id")
.get(getAdvertisementCategory)
.put(updateAdvertisementCategory)
.delete(deleteAdvertisementCategory)

module.exports = advertisementCategoryRouter