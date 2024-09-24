const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware")

const server_port = process.env.SERVER_PORT || 6789;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/goals", require("./routes/throwawayRoute"))
app.use(errorHandler)

app.listen(server_port, () => console.log(`Server has started on port ${server_port}`))
