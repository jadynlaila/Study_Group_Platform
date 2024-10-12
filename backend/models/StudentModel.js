// User Information
// uid
// username
// encrypted password (transmitted as a hash)
// active session tokens
// name
// university
// profile picture path
// email
// display name
// phone number
// registered study groups

const mongoose = require("mongoose");
const StudentSchema = mongoose.Schema({
    firstName: {
        type:String,
        required:[true, 'User must enter a first name'],
        pattern: /[a-zA-Z]+/g
    },
    lastName: {
        type:String,
        required:[true, 'User must enter a last name'],
        pattern: /[a-zA-Z]+/g
    },
    school: {
        type: String,
        required: [true, 'Student must enter a school']
    },
    displayName: {
        type:String,
        pattern: /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
    },
    username: {
        type: String,
        required: [true, "Student must create a username"],
        pattern: /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
    },
    email: {
        type: String,
        required: [true, 'Student must enter an email'],
        unique: true,
        pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    },
    //! message that tells them what they need for the password
    password: {
        type: String,
        required: [true, "You must provide a password"],
        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    },
    groups: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Group"
    }],
    //! default pfp?
    profilePicURL: {  },
})

module.exports = mongoose.model("Student", StudentSchema);
