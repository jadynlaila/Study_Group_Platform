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
    //! xharacter limits
    //!
    
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
    //!
    school: {

    },
    //! regex for letters and numbers only
    displayName: {
        type:String
    },
    username: {

    },
    //! needs pattern
    email: {
        type: String,
        required: [true, 'User must enter an email'],
        unique: true,
    },
    //! update this password with a pattern 
    //! message that tells them what they need for the password
    password: {
        type: String,
        required: [true, "You must provide a password"]
    },
    groups: [{
        type: Schema.Types.ObjectId, 
        ref: "Group"
    }],
    profilePicURL: {  },
})

module.exports = mongoose.model("Student", StudentSchema);
