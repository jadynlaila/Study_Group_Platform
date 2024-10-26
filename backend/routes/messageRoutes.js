const express = require("express");
const { sendMessage, deleteMessage, getMessage } = require("../controllers/messageController.js");
const { protectRoute } = require("../middleware/protectRoute.js");

const router = express.Router();

// Route for interacting with a message
router.route("/:messageID").get(getMessage)
router.route("/")
    .put(sendMessage)
    .delete(deleteMessage)

module.exports = router;
