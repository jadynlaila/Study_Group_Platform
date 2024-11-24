const express = require("express");
const { sendMessage, deleteMessage, getMessage } = require("../controllers/messageController.js");
const {protectRoute} = require("../middleware/protectRoute")

const router = express.Router();

// Route for interacting with a message
router.route("/:messageID")
    .get(protectRoute, getMessage)

router.route("/")
    .post(protectRoute, sendMessage)
    .delete(protectRoute, deleteMessage)

module.exports = router;
