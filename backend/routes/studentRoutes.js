const express = require("express")
const router = express.Router()
const { getStudents, createStudent, login, logout, updateStudent, deleteStudent, removeGroup, getOneStudent } = require("../controllers/studentController")

router.route("/")
    .get(getStudents)
    .post(createStudent)

router.route("/:id")
    .get(getOneStudent)
    .put(updateStudent)
    .delete(deleteStudent)

router.route("/:studentId/:groupId").put(removeGroup)

router.route("/login").post(login)
router.route("/logout").post(logout)


module.exports = router