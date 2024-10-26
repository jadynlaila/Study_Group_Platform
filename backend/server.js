const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware")
const connectDB = require("./config/db");
const port = process.env.PORT || 6789;

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/group", require("./routes/groupRoutes"))
app.use("/api/student", require("./routes/studentRoutes"))
app.use(errorHandler)

app.listen(port, () => console.log(`Server has started on port ${port}`))

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function printStuff() {
//     for (let i = 0; i < 15; i++) {
//         console.log(require("./routes/groupRoutes"))
//         await sleep(i * 1000)
//     }
// }

// printStuff()
