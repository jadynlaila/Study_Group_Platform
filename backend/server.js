const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware")
const { protectRoute } = require("./middleware/protectRoute")
const connectDB = require("./config/db");
const port = process.env.PORT || 6789;
const cors = require("cors")
const protectRoute = require("./middleware/protectRoute")
const Message = require("./routes/messageRoutes");
const cookieParser = require("cookie-parser");

connectDB()
const corsOptions = {
    origin: process.env.BACKEND_URI || "http://localhost:6789";,
    credentials: true,
  };

const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

app.use("/api/group", require("./backend/routes/groupRoutes"))
app.use("/api/student", require("./backend/routes/studentRoutes"))
app.use("/api/message", require("./backend/routes/messageRoutes"));
app.use("/api/meeting", require("./backend/routes/meetingRoutes"));
app.use(errorHandler)

app.listen(port, () => console.log(`Server has started on port ${port}`))
