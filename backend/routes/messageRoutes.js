const express = require("express");
const { sendMessage } = require("../controllers/messageController.js");
const { protectRoute } = require("../middleware/protectRoute.js");

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage)

module.exports = router;