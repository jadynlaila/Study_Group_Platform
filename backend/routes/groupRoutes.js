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

// localhost:5678/api/group/
router.route("/")
    .get(getAllGroups)
    .post(createGroup)
    .delete(deleteGroup)

// localhost:5678/api/group/<groupID>
router.route("/:groupID")
    .get(getGroup)
    .put(updateGroup)

// localhost:5678/api/group/<groupID>/students
router.route("/:groupID/students")
    .get(getStudentsFromGroup)

// localhost:5678/api/group/messages/<groupID>
router.route("/messages/:groupID")
    .get(getMessages)

// localhost:5678/api/group/join/<groupID>
router.route("/join/:groupID")
    .put(joinGroup)

router.route("/leave/:groupID")
    .put(leaveGroup)

module.exports = router
