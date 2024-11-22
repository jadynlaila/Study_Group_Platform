const bcrypt = require ("bcrypt");
const generateTokenSetCookie = require("../config/generateToken");
const Student = require('../models/StudentModel');
const asyncHandler = require("express-async-handler")

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
        major,
        groups,
        profilePicURL
    } = req.body

    // can use this if we install isEmail validator
    //if (!isEmail(email)) return res.status(401).send("Invalid");
    // if (password.length < 6) {
    //     return res.status(401).send("Password must be at least 6 characters")
    // }
    if (!firstName || !lastName || !school || !username || !email || !password || !major) {
        return res.status(400).json({error: "Student has not entered all required fields"})
    }

    try{
        let studentExists = await Student.findOne({email: email.toLowerCase()});
        if (studentExists) return res.status(401).send("Email already in use")

        studentExists = await Student.findOne({username: username.toLowerCase()})
        if (studentExists) return res.status(401).send("Username taken")
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const defaultProfilePic = `https://avatar.iran.liara.run/username?username=${firstName+lastName}`
        
        let newStudent = new Student({
            firstName,
            lastName,
            school,
            displayName,
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword,
            major,
            groups,
            //https://www.youtube.com/watch?v=HwCqsOis894 for pfp
            profilePicURL: profilePicURL != null ? profilePicURL : defaultProfilePic
        })


        if(newStudent){
            generateTokenSetCookie(newStudent._id, res);
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
                major: major,
                groups: newStudent.groups,
                profilePicURL: newStudent.profilePicURL,
            })
        } else { 
            res.status(400).json({error: "Invalid user data"})
        }
    } catch (err) {
        console.log("Error in newStudent function", err);
        return res.status(500).send("Error creating student")
    }

})

const login = async(req, res) => {
    try{
        let {username, password} = req.body; 
        username = username.toLowerCase();
        const student = await Student.findOne({ username });
        const passwordCorrect = await bcrypt.compare(password, student?.password || "")

        if (!student ) { 
            return res.status(400).json({error: "Invalid username"})
        }
        if (!passwordCorrect) {
            return res.status(400).json({error: "Invalid password"})
        }

        generateTokenSetCookie(student._id, res); 

        res.status(200).json({
            _id: student._id,
            username: student.username
        })
    } catch(err){
        console.log("Error in login", err.message);
        res.status(500).json({error: "Internal server error"})
    }
}

module.exports = {
    createStudent, 
    login
}