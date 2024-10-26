// Study Groups
// Id
// Name
// Description
// members
// group owner
// Thread of messages

const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must enter a group name'],
        pattern: /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/
    },
    description: {
        type: String,
    },
    courses: {
        type: String
    },
    majors: {
        type: String
    },
    memberLimit: {
        type: Number
    },
    memberCount: {
        type: Number,
        default: 0
    },
    memberIDs: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Student"
    }],
    ownerID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Student",
        required: [true, 'You must provide the group owner']
    },
    administratorIDs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }],
    profilePictureID: {
        type: mongoose.Schema.Types.ObjectId
    },
    messageIDs: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Message"
    }]
})

module.exports = mongoose.model("Group", GroupSchema);
