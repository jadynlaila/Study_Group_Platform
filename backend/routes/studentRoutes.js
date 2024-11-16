const express = require("express")
const router = express.Router()
const { getStudents, createStudent, updateStudent, deleteStudent, removeGroup, getOneStudent } = require("../controllers/studentController")

router.route("/")
    .get(getStudents)
    .post(createStudent)

router.route("/:id")
    .get(getOneStudent)
    .put(updateStudent)
    .delete(deleteStudent)

router.route("/:studentId/:groupId").put(removeGroup)

module.exports = router