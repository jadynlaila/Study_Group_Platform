const express = require("express")
const router = express.Router()
const {
    createGroup,
    getGroup,
    updateGroup,
    deleteGroup,
    joinGroup,
    getMessages
} = require("../controllers/groupController")

// localhost:5678/api/group/
router.route("/")
.get(getGroup)
.post(updateGroup)
.put(createGroup)
.delete(deleteGroup)

// localhost:5678/api/group/messages/<groupID>
router.route("/messages/:groupID")
    .get(getMessages)

// localhost:5678/api/group/join/<groupID>
router.route("/join/:groupID")
    .put(joinGroup)

module.exports = router
