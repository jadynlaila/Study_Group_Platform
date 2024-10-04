// Messages
// Time stamp
// User who sent it


const mongoose = require('mongoose');

const MessageSchema = new Schema ({
    //! cannot send message while empty
    //! required ?
    //! type can also be png
    //! character limit
    //! file size limit
    content: {
        type: String
    },
    //! date and time
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

