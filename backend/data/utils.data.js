const mongoose = require("mongoose")

const URI = process.env.MONGODB_URI


const connectDb = async function () {
    try {
        await mongoose.connect(URI),{
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useCreateIndex:true
        }
        console.log(`data base connected `);
    } catch (error) {
        console.log(`failed to connect database ${error}`);
        throw error;
    }
}

module.exports = connectDb