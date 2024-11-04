const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    Name:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    Email:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    ApiKey:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    LoginId:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    Password:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    SecurityQuestion:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    SecurityAnswer:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    BirthDate:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    ContactNumber:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    Image:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    Role:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Role",
        default:"6628ed05bab658b75618fbb3",
        required:true
    },
    Token:{
        type:mongoose.SchemaTypes.String,
       
    },
    isVerified:{
         type: Boolean,
          default: false
         },
})

// Password hashing using bcrypt

userSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) {
        next()
    }

    try {
        const saltRound = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(this.Password,saltRound)
        this.Password = hashPassword 

    } catch (error) {
        console.log(`failed to hash password${error}`);
    }
})

// comparing the hash password

userSchema.methods.comparePassword = async function (password) {
    try {
      return  await bcrypt.compare(password, this.Password)
    } catch (error) {
        console.log(`failed to comparing password ${error}`);
    }
}

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn:process.env.JWT_TOKEN_EXPIRES_IN
            }
        )
    } catch (error) {
        console.log(`failed to generate token ${error}`);
    }
}

const User = new mongoose.model("User",userSchema)

module.exports = User