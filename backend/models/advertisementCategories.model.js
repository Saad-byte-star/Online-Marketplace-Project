const mongoose = require("mongoose")

const advertisementCategoriesSchema = new mongoose.Schema({
    Name:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    Image:{
        type:mongoose.SchemaTypes.String,
        required:true
    }
})

const AdvertisementCategory = new mongoose.model("AdvertisementCategory",advertisementCategoriesSchema)

module.exports = AdvertisementCategory