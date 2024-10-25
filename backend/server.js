const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware")
const connectDB = require("./config/db");
const port = process.env.PORT || 6789;

connectDB();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

try {
	app.use("/api/group", require("./routes/groupRoutes"));
	app.use("/api/meeting", require("./routes/meetingRoutes"));
	app.use("/api/message", require("./routes/messageRoutes"));
	app.use("/api/student", require("./routes/studentRoutes"));
} catch (error) {
	console.error("Error loading routes:", error);
}
app.use(errorHandler)

app.listen(port, () => console.log(`Server has started on port ${port}`))
