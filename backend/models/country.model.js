const mongoose = require("mongoose")

const countrySchema = new mongoose.Schema({
    Name:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    Code:{
        type:mongoose.SchemaTypes.Number,
        required:true
    }
})

const Country = new mongoose.model("Country",countrySchema)

module.exports = Country