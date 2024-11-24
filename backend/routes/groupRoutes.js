const express = require("express")
const router = express.Router()
const {protectRoute} = require("../middleware/protectRoute")
const {
    createGroup,
    getAllGroups,
    getGroup,
    searchGroups,
    updateGroup,
    deleteGroup,
    joinGroup,
    getStudentsFromGroup,
    getMessages,
    leaveGroup
} = require("../controllers/groupController")

const {
    getMeetings,
    createMeeting
} = require("../controllers/meetingController")

// localhost:5678/api/group/
router.route("/")
    .get(protectRoute, getAllGroups)
    .post(protectRoute, createGroup)

// localhost:5678/api/group/search
router.route("/search/:query")
    .get(protectRoute, searchGroups)
    
// localhost:5678/api/group/<groupID>
router.route("/:groupID")
    .get(protectRoute, getGroup)
    .put(protectRoute, updateGroup)
    .delete(protectRoute, deleteGroup)

// localhost:5678/api/group/<groupID>/students
router.route("/:groupID/students")
    .get(protectRoute, getStudentsFromGroup)

// localhost:5678/api/group/<groupID>/messages
router.route("/:groupID/messages")
    .get(protectRoute, getMessages)

// localhost:5678/api/group/<groupID>/meetings
router.route("/:groupID/meetings")
    .get(protectRoute, getMeetings)
    .put(protectRoute, createMeeting)

// localhost:5678/api/group/join/<groupID>
router.route("/join/:groupID")
    .put(protectRoute, joinGroup)

// localhost:5678/api/group/leave/<groupID>
router.route("/leave/:groupID")
    .put(protectRoute, leaveGroup)

module.exports = router
