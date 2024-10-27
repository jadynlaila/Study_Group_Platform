const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./backend/middleware/errorMiddleware")
const { protectRoute } = require("./backend/middleware/protectRoute")
const connectDB = require("./backend/config/db");
const cookieParser = require("cookie-parser");
const { spawn } = require("child_process");

const port = process.env.EXPRESS_PORT || 6789;

const app = express()
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

app.use("/api/group", require("./backend/routes/groupRoutes"))
app.use("/api/student", require("./backend/routes/studentRoutes"))
app.use("/api/messages", require("./backend/routes/messageRoutes"));
app.use(errorHandler)

const reactServer = spawn("npm", ["start"], {
    cwd: "frontend",
    env: { ...process.env, PORT: process.env.REACT_PORT },
    stdio: "inherit"
})

reactServer.on("close", (code) => {
    console.log(`React server exited with code ${code}`)
})

app.listen(port, () => console.log(`Server has started on port ${port}`))
