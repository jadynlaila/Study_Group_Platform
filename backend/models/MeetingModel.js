const mongoose = require('mongoose');
const { Schema } = mongoose;

const MeetingSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'You must enter a meeting name'],
        pattern: /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/
    },
    description: {
        type: String
    },
    start: {
        type: Date,
        required: [true, 'You must provide a start date']
    },
    end: {
        type: Date,
        required: [true, 'You must provide an end date']
    },
    creatorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: [true, 'You must provide the meeting creator']
    },
    guestIDs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }],
    location: {
        type: String
    },
    frequency: {
        type: String,
        enum: ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']
    },
    until: {
        type: Date
    },
    count: {
        type: Number
    },
    interval: {
        type: Number
    },
    byday: {
        type: String,
        enum: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']
    },
})

module.exports = mongoose.model("Meeting", MeetingSchema);