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

// For creating a new meeting and getting all group meetings,
// check the groupRoutes.js file (because the routes make more sense)

// localhost:6789/api/meetings/<meetingID>
router.route("/:meetingID")
    .get(getMeetings)
    .put(updateMeeting)
    .delete(deleteMeeting)

module.exports = router