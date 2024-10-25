const express = require("express")
const router = express.Router()
const { 
    createGroup, 
    getGroup,
    updateGroup, 
    deleteGroup, 
    joinGroup,
    getMessages,
    sendMessage,
    deleteMessage
} = require("../controllers/groupController")

router.route("/:studentID/:groupID").get(getGroup).post(updateGroup)
