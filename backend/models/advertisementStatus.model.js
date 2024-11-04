const mongoose = require("mongoose")

const advertisementStatusSchema = new mongoose.Schema({
    Name:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
})

const AdvertisementStatus = new mongoose.model("AdvertisementStatus",advertisementStatusSchema)

module.exports = AdvertisementStatus