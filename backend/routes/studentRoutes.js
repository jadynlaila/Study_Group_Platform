const express = require("express")
const router = express.Router()
const { getStudents, setStudent, updateStudent, deleteStudent } = require("../controllers/studentController")

router.route("/").get(getStudents).post(setStudent)
router.route("/:id").put(updateStudent).delete(deleteStudent)

module.exports = router