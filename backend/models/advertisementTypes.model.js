const mongoose = require("mongoose")

const advertisementTypesSchema = new mongoose.Schema({
    Name:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
})

const AdvertisementType = new mongoose.model("AdvertisementType",advertisementTypesSchema)

module.exports = AdvertisementType