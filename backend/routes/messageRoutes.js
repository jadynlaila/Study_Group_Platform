const express = require("express");
const { sendMessage, deleteMessage, getMessage } = require("../controllers/messageController.js");
const { protectRoute } = require("../middleware/protectRoute.js");

const router = express.Router();

// Route for sending a message
router.post("/send/:studentID/:groupID", sendMessage);

// Route for deleting a message
router.delete("/delete/:id", deleteMessage);

// Route for getting a message by ID
router.get("/:id", getMessage);

module.exports = router;