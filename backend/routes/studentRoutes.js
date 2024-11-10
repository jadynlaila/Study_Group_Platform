const express = require("express")
const router = express.Router()
const { getStudents, setStudent,login, logout, updateStudent, deleteStudent, removeGroup } = require("../controllers/studentController")

router.route("/").get(getStudents).post(setStudent)
router.route("/:id").put(updateStudent).delete(deleteStudent)
router.route("/:studentId/:groupId").put(removeGroup)
router.route("/login").post(login)
router.route("/logout").post(logout)


module.exports = router