const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDB = async () => {
    console.log(`\x1b[32mUsing database '${process.env.DATABASE}'\x1b[0m`)

    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DATABASE}`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;