const express = require("express")
const router = express.Router()
const {
    createGroup,
    getAllGroups,
    getGroup,
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
    .get(getAllGroups)
    .post(createGroup)
    
// localhost:5678/api/group/<groupID>
router.route("/:groupID")
.get(getGroup)
.put(updateGroup)
.delete(deleteGroup)

// localhost:5678/api/group/<groupID>/students
router.route("/:groupID/students")
    .get(getStudentsFromGroup)

// localhost:5678/api/group/messages/<groupID>
router.route("/:groupID/messages")
    .get(getMessages)

router.route("/:groupID/meetings")
    .get(getMeetings)
    .put(createMeeting)

// localhost:5678/api/group/join/<groupID>
router.route("/join/:groupID")
    .put(joinGroup)

router.route("/leave/:groupID")
    .put(leaveGroup)

module.exports = router
