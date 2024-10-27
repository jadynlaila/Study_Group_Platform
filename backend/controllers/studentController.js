const asyncHandler = require("express-async-handler")
const Student = require('../models/StudentModel');
const mongoose = require("mongoose")
const generateToken = require("../config/generateToken");
const Group = require("../models/GroupModel");

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
    try{
        const students = await Student.find()
        res.status(200).json({ students });
    }catch(err){
        console.log("Error in getStudents function", err);
        return res.status(500).json({ message: err.message });
    }
})

const getStudentsInGroup = asyncHandler(async (req, res) => {
    //TODO
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
    // if (password.length < 6) {
    //     return res.status(401).send("Password must be at least 6 characters")
    // }
    if (!firstName || !lastName || !school || !username || !email || !password ) {
        return res.status(400).json({error: "Student has not entered all required fields"})
    }

    try{
        let studentExists = await Student.findOne({email: email.toLowerCase()});
        if (studentExists) return res.status(401).send("Email already in use")

        studentExists = await Student.findOne({username: username.toLowerCase()})
        if (studentExists) return res.status(401).send("Username taken")
        
        const defaultProfilePic = `https://avatar.iran.liara.run/username?username=${firstName+lastName}`
        
        let newStudent = new Student({
            firstName,
            lastName,
            school,
            displayName,
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password,
            groups,
            //https://www.youtube.com/watch?v=HwCqsOis894 for pfp
            profilePicURL: profilePicURL != null ? profilePicURL : defaultProfilePic
        })

        //! need to hash password
        newStudent = await newStudent.save();

        res.status(201).json({
            _id: newStudent._id,
            firstName: newStudent.firstName,
            lastName: newStudent.lastName,
            school: newStudent.school,
            displayName: newStudent.displayName,
            username: newStudent.username,
            email: newStudent.email,
            password: newStudent.password,
            groups: newStudent.groups,
            profilePicURL: newStudent.profilePicURL,
            // token: generateToken(newStudent._id)
        })
    } catch (err) {
        console.log("Error in newStudent function", err);
        return res.status(500).send("Error creating student")
    }

})

// can be done in updateStudent
//! should it be done here separately though?
// const addGroup = asyncHandler(async ( req, res ) =>  {
//     try{ 
//         const student = await Student.findById(req.params.id)
//         if (!student){
//             res.status(400).json({error: "Student not found"})
//         }
        
//         let updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {new: false})

//         res.status(200)
//     }catch (err){
//         console.log("Error in addGroup function", err);
//         return res.status(500).send("Error adding group")
//     }
// })

// @desc    Update Student
// @route   PUT /api/goals
// @access  Private
const updateStudent = asyncHandler(async (req, res) => {
    try{
        const student = await Student.findById(req.params.id)

        if (!student){
            return res.status(400).send('Student not found');
        }

    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedStudent)
    }catch(err){ 
        console.log("Error in updateStudent function", err);
        return res.status(500).send(err.message);
    }
})

//! add group specific function

const removeGroup = asyncHandler(async (req, res) => {
    try{
        const {studentId, groupId} = req.params;
        
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(400).send("Group not found");
        }

        const student = await Student.findByIdAndUpdate(
            studentId,
            { $pull: {groups: groupId}},
            {new: true}
        )
        if (!student){
            return res.status(400).send('Student not found');
        }
        res.status(200).json(student)
    }catch (err) {
        console.log("Error in removeGroup function", err)
        return res.status(500).send("Error removing group")
    }
})

// @desc    Delete Goals
// @route   DELETE /api/goals
// @access  Private
const deleteStudent = asyncHandler(async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(400).send('Student not found'); // Handle not found case
        }
        res.status(200).json(deletedStudent);
    } catch (err) {
        console.log("Error in deleteStudent function", err);
        return res.status(500).json({ message: err.message });
    }
});

module.exports = {
    getStudents,
    setStudent,
    updateStudent,
    deleteStudent,
    removeGroup
}