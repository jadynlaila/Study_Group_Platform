const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware")
const { protectRoute } = require("./middleware/protectRoute")
const connectDB = require("./config/db");
const port = process.env.PORT || 6789;
const Message = require("./routes/messageRoutes");
const cookieParser = require("cookie-parser");

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

app.use("/api/group", require("./routes/groupRoutes"))
app.use("/api/student", require("./routes/studentRoutes"))
app.use(errorHandler)

app.use("/api/messages", Message);

app.listen(port, () => console.log(`Server has started on port ${port}`))
