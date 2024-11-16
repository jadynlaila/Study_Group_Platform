const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI
    const MONGO_USERNAME = process.env.MONGO_USERNAME
    const MONGO_PASSWORD = process.env.MONGO_PASSWORD
    const MONGO_DATABASE = process.env.MONGO_DATABASE
    const MONGO_CONN_DETAILS = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URI}/${process.env.MONGO_DATABASE}`

    console.log(`\x1b[32mConnecting to Mongo as '${MONGO_USERNAME}'\x1b[0m`)
    console.log(`\x1b[32mUsing database '${MONGO_DATABASE}'\x1b[0m`)

    try {
        const conn = await mongoose.connect(MONGO_CONN_DETAILS);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;