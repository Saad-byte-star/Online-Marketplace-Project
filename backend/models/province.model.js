const mongoose = require("mongoose")

const provinceSchema = new mongoose.Schema({
    Name:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    Country:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Country",
        required:true
    }
})

const Province = new mongoose.model("Province",provinceSchema)

module.exports = Province