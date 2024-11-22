const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware")
const { protectRoute } = require("./middleware/protectRoute")
const connectDB = require("./config/db");
const port = process.env.PORT || 6789;
const cors = require("cors")
const Message = require("./routes/messageRoutes");
const StudentRoutes = require("./routes/studentRoutes");
const GroupRoutes = require("./routes/groupRoutes");
const AuthRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

connectDB()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

app.use("/api/auth", AuthRoutes)
app.use("/api/group", protectRoute, GroupRoutes)
app.use("/api/student", protectRoute, StudentRoutes)
app.use(errorHandler)

app.use("/api/messages", protectRoute, Message);

app.listen(port, () => console.log(`Server has started on port ${port}`))
