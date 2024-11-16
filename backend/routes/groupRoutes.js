const express = require("express")
const router = express.Router()
const {
    createGroup,
    getAllGroups,
    getGroup,
    updateGroup,
    deleteGroup,
    joinGroup,
    getMessages
} = require("../controllers/groupController")

// localhost:5678/api/group/
router.route("/")
.post(createGroup)
.put(updateGroup)
.delete(deleteGroup)

router.route("/").get(getAllGroups)
router.route("/:groupID").get(getGroup)

// localhost:5678/api/group/messages/<groupID>
router.route("/messages/:groupID")
    .get(getMessages)

// localhost:5678/api/group/join/<groupID>
router.route("/join/:groupID")
    .put(joinGroup)

module.exports = router
