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

function scrubPrivateStudentInfo(studentObject) {
    console.debug(`Scrubbing data for ${studentObject.username}`)

    return {
        _id: studentObject._id,
        firstName: studentObject.firstName,
        lastName: studentObject.lastName,
        username: studentObject.username,
        school: studentObject.school,
        displayName: studentObject.displayName,
        groups: studentObject.groups,
        profilePicURL: studentObject.profilePicURL
    }
}

// @desc    Get one student
// @route   GET /api/students/<studentID>
// @access  Private
const getOneStudent = asyncHandler(async (req, res) => {
    try {
        const studentID = req.params.id     // can be either id or username

        console.debug(`Attempting to get student with ID ${studentID}`)

        // validate if studentID is a valid ObjectId
        let searchedStudent = null;
        if (mongoose.Types.ObjectId.isValid(studentID)) {
            // search by object id first
            searchedStudent = await Student.findById(studentID)
        }

        if (!searchedStudent) {
            // try searching by username if input isn't an object ID
            searchedStudent = await Student.findOne({ username: studentID })

            if (!searchedStudent) {
                return res.status(404).json({ error: `Failed to find student with id/username '${studentID}'` })
            }
        }

        // return neutered info (remove private info)
        return res.status(200).json(scrubPrivateStudentInfo(searchedStudent))
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

// @desc    Get Students
// @route   GET /api/Students
// @access  Private
const getStudents = asyncHandler(async (req, res) => {
    try{
        const students = await Student.find()

        // scrub private user info
        const scrubbedStudents = students.map(student => scrubPrivateStudentInfo(student));

        res.status(200).json({ students: scrubbedStudents });
    }catch(err){
        console.log("Error in getStudents function", err);
        return res.status(500).json({ message: err.message });
    }
})

// @desc    Set Student
// @route   POST /api/goals
// @access  Private
const createStudent = asyncHandler(async (req, res) => {
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

// @desc    Update Student
// @route   PUT /api/goals
// @access  Private
const updateStudent = asyncHandler(async (req, res) => {
    try{
        console.debug(`GOT STUDENT ID ${req.params.id}`)

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send('Invalid student ID');
        }

        const student = await Student.findById(req.params.id)

        if (!student){
            return res.status(400).send(`Student '${req.params.id}' not found`);
        }

        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true})

        res.status(200).json(updatedStudent)
    }catch(err){ 
        console.error("Error in updateStudent function", err);
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
    getOneStudent,
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    removeGroup
}