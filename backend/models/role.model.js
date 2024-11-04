const mongoose = require("mongoose")

const roleSchema = new mongoose.Schema({
    Name:{
        type:mongoose.SchemaTypes.String,
        required:true
    }
})

const Role = new mongoose.model("Role",roleSchema)

module.exports = Role