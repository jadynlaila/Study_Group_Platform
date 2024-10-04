// Study Groups
// Id
// Name
// Description
// members
// group owner
// Thread of messages

const mongoose = require('mongoose');

const GroupSchema = new Schema({
    //!change pattern
    name: {
        type: String,
        required: [true, 'must enter a group name'],
        pattern: /[a-zA-Z]+/g
    },
    description: {
        type: String,
    },
    //! pattern?
    courses: {
        type: String
    },
    majors: {
        type: String
    },
    memberLimit: [
        //!
    ],
    memberCount: {
       //! 
    },
    members: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Student"
    }],
    owner: {
        type: Schema.Types.ObjectId, 
        ref: "Student"
    },
    administrators: [{
        type: Schema.Types.ObjectId,
        ref: "Student"
    }],
    messages: [{
        type: Schema.Types.ObjectId, 
        ref: "Message"
    }]
})

module.exports = mongoose.model("Group", GroupSchema);
