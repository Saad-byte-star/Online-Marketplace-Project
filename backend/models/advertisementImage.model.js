const mongoose = require("mongoose")

const advertisementImageSchema = new mongoose.Schema({
    Content:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    Rank:{
        type:mongoose.SchemaTypes.Number,
        required:true
    },
    Caption:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    Advertisement:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Advertisement",
        required:true
    }
})

const AdvertisementImage = new mongoose.model("AdvertisementImage",advertisementImageSchema)

module.exports = AdvertisementImage