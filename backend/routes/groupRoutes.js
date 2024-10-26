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

router.route("/:studentID/:groupID")
    .get(getGroup)
    .post(updateGroup)
    .put(createGroup)
    .delete(deleteGroup)

router.route("/messages/:studentID/:groupID")
    .get(getMessages)

router.route("/join/:studentID/:groupID")
    .put(joinGroup)

module.exports = router
