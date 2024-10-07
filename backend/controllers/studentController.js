const asyncHandler = require("express-async-handler")
const Student = require('../models/StudentModel');

// @desc    Get Students
// @route   GET /api/Students
// @access  Private
const getStudents = asyncHandler(async (req, res) => {
    const students = await Student.find()
    res.status(200).json({ students });
})

// @desc    Set Student
// @route   POST /api/goals
// @access  Private
const setStudent = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400)
        throw new Error("u suck lol")
    }
    const student = await Student.create({
        name: req.body.name
    })
    res.status(200).json(student)
})

// @desc    Update Student
// @route   PUT /api/goals
// @access  Private
const updateStudent = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id)

    if (!student){
        res.status(400);
        throw new Error('Student not found');
    }

    const updatedStudent = await student.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedStudent)
})

// @desc    Delete Goals
// @route   DELETE /api/goals
// @access  Private
const deleteStudent = asyncHandler(async (req, res) => {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedStudent)
})

module.exports = {
    getStudents,
    setStudent,
    updateStudent,
    deleteStudent
}