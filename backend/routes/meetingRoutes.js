const express = require("express")
const router = express.Router()
const {
    createMeeting,
    getMeetings,
    updateMeeting,
    deleteMeeting,
    getAllMeetings
} = require("../controllers/meetingController")

// localhost:6789/api/meetings/
router.route("/")
    .get(getAllMeetings)

// localhost:6789/api/meetings/<groupID>
router.route("/:groupID")
    .get(getMeetings)
    .post(createMeeting)

// localhost:6789/api/meetings/<meetingID>
router.route("/:meetingID")
    .get(getMeetings)
    .put(updateMeeting)
    .delete(deleteMeeting)

module.exports = router