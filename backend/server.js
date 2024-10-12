const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware")
const connectDB = require("./config/db");
const port = process.env.PORT || 6789;

connectDB();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use("/api/goals", require("./routes/throwawayRoute"))

app.use("api/student", require("./routes/studentRoutes"))
app.use(errorHandler)

app.listen(port, () => console.log(`Server has started on port ${port}`))
