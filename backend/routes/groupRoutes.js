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

router.route("/:groupID/:studentID")
    .get(getGroup)
    .post(updateGroup)
    .put(createGroup)
    .delete(deleteGroup)

router.route("/messages/:groupID/:studentID")
    .get(getMessages)

router.route("/join/:groupID/:studentID")
    .put(joinGroup)

module.exports = router
