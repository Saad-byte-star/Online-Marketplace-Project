const mongoose = require("mongoose")

const cityAreaSchema = new mongoose.Schema({
    Name:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    City:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"City",
        required:true
    }
})

const CityArea = new mongoose.model("CityArea",cityAreaSchema)

module.exports = CityArea