// Messages
// Time stamp
// User who sent it


const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema ({
    //! keep in mind:
    //! messages cannot be sent while empty
    //! and we need a character limit
    //! this will need to be addressed in the 'send message' function
    content: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId, 
        ref: "Student"
    },

    groupID: {
        type: Schema.Types.ObjectId, 
        ref: "Group"
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("Message", MessageSchema)