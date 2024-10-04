// Messages
// Time stamp
// User who sent it


const mongoose = require('mongoose');

const MessageSchema = new Schema ({
    //! keep in mind:
    //! messages cannot be sent while empty
    //! and we need a character limit
    //! this will need to be addressed in the 'send message' function
    content: {
        type: String
    },
    time: {
        type: Date,
        value: Date,
        required: [true, 'message needs date']
    },
    author: {
        type: Schema.Types.ObjectId, 
        ref: "Student"
    }
})

module.exports = mongoose.model("Message", MessageSchema)