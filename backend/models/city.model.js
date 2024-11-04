const mongoose = require("mongoose")

const citySchema = new mongoose.Schema({
    Name:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    Province:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Province",
        required:true
    }
})

const City = new mongoose.model("City",citySchema)

module.exports = City