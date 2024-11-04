const  mongoose = require("mongoose")

const verificationSchema= new mongoose.Schema({
    Id:{
        type: mongoose.SchemaTypes.Number,
        
    }
})

const Verify = new mongoose.model("Verify",verificationSchema)
module.exports = Verify