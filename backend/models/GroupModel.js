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
        required: [true, 'must enter a group name'],
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
    members: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Student"
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Student"
    },
    administrators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Message"
    }]
})

module.exports = mongoose.model("Group", GroupSchema);
