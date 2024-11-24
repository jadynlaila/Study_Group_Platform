const express = require("express")
const router = express.Router()
const {protectRoute} = require("../middleware/protectRoute")
const { getStudents, createStudent, login, logout, updateStudent, deleteStudent, removeGroup, getOneStudent } = require("../controllers/studentController")

router.route("/")
    .get(protectRoute, getStudents)
    .post(createStudent)

router.route("/:id")
    .get(getOneStudent)
    .put(protectRoute, updateStudent)
    .delete(protectRoute, deleteStudent)

router.route("/:studentId/:groupId").put(protectRoute, removeGroup)

router.route("/login").post(login)
router.route("/logout").post(logout)


module.exports = router