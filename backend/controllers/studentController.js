const asyncHandler = require("express-async-handler")
const Student = require('../models/StudentModel');
const StudentModel = require("../models/StudentModel");

//! add profile picture
//! get picture
//! update picture
//! delete picture
//! get groups
//! add group
//! leave group
//! check if username is available
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
    console.log(req.body)
    const {
        firstName,
        lastName,
        school,
        displayName,
        username,
        email,
        password,
        groups,
        profilePicURL
    } = req.body

    // can use this if we install isEmail validator
    //if (!isEmail(email)) return res.status(401).send("Invalid");
    if (password.length < 6) {
        return res.status(401).send("Password must be at least 6 characters")
    }

    try{
        let student;
        student = await StudentModel.findOne({email: email.toLowerCase()});
        if (student) return res.status(401).send("Email already in use")
        student = await StudentModel.FindOne({username: username.toLowerCase()})
        if (student) return res.status(401).send("Username taken")

        student = new StudentModel({
            firstName,
            lastName,
            school,
            displayName,
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password,
            groups,
            profilePicURL
        })

        //! need to encrypt password
        student = await student.save();
    } catch (err) {
        console.log(err);
        return res.status(500).send("Error creating student")
    }

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