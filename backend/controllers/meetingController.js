const { response } = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const asyncHandler = require('express-async-handler');
const Meeting = require('../models/MeetingModel');
const Group = require('../models/GroupModel');
const Student = require('../models/StudentModel');

const localServerAddress = `http://127.0.0.1:${process.env.EXPRESS_PORT}`

async function validateMeeting(meeting) {
    // ensure that the meeting has a name
    console.debug(`Validating meeting name '${meeting.name}'`)
    if (!meeting.name) {
        return { valid: false, message: "Meeting must have a name" }
    }

    // ensure that the meeting start date is before the end date
    console.debug(`Validating meeting start date '${meeting.start}' and end date '${meeting.end}'`);
    if (meeting.start >= meeting.end) {
        return { valid: false, message: "Meeting start date must be before the end date" }
    }

    // ensure that the frequency is valid
    console.debug(`Validating meeting frequency '${meeting.frequency}'`);
    if (meeting.frequency && !['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'].includes(meeting.frequency)) {
        return { valid: false, message: "Meeting frequency must be null, DAILY, WEEKLY, MONTHLY, or YEARLY" }
    }

    // ensure that frequency is not null if until, count, interval, or byday are provided
    console.debug(`Validating meeting frequency '${meeting.frequency}' with until '${meeting.until}', count '${meeting.count}', interval '${meeting.interval}', and byday '${meeting.byday}'`);
    if (!meeting.frequency && (meeting.until || meeting.count || meeting.interval || meeting.byday)) {
        return { valid: false, message: "Meeting frequency must be provided if until, count, interval, or byday are provided" }
    }

    // ensure that the until date is after the start date
    console.debug(`Validating meeting until date '${meeting.until}' and start date '${meeting.start}'`);
    if (meeting.until && meeting.until <= meeting.start) {
        return { valid: false, message: "Meeting until date must be after the start date" }
    }

    // ensure that the byday is valid
    console.debug(`Validating meeting byday '${meeting.byday}'`);
    if (meeting.byday && !['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].includes(meeting.byday)) {
        return { valid: false, message: "Meeting byday must be null, SU, MO, TU, WE, TH, FR, or SA" }
    }

    // ensure that the interval is valid
    console.debug(`Validating meeting interval '${meeting.interval}'`);
    if (meeting.interval && meeting.interval < 1) {
        return { valid: false, message: "Meeting interval must be null or greater than 0" }
    }

    // ensure that the count is valid
    console.debug(`Validating meeting count '${meeting.count}'`);
    if (meeting.count && meeting.count < 1) {
        return { valid: false, message: "Meeting count must be null or greater than 0" }
    }

    // ensure that the meeting creator is a valid user
    console.debug(`Validating meeting creator '${meeting.creatorID}'`);
    const creator = await Student.findById(meeting.creatorID)
    if (!creator) {
        return { valid: false, message: "Meeting creator is not a valid user" }
    }

    console.debug(`Meeting validation passed`);
    return { valid: true, message: null }
}

const getMeetings = asyncHandler(async (request, result) => {
    try {
        // Deconstruct the JSON body
        const groupID = request.params.groupID

        console.debug(`\n\nGetting meetings for group ${groupID}`)

        // Verify that the parameters are not empty
        if (!groupID) {
            console.error("Required variable 'groupID' not provided")
            return result.status(400).json({ error: "Required variable 'groupID' not provided" })
        }

        console.debug("Required variables found")

        // Get the user and group from Mongo
        const group = await Group.findById(groupID)
        if (!group) {
            return result.status(403).json({ error: `Group with ID ${groupID} was not found` })
        }

        console.debug(`Group ${groupID} found: ${group.name}`)

        // Convert the message IDs into an array of Message objects
        const meetings = await Promise.all(
            group.meetingIDs.map(async (messageID) => await Meeting.findById(messageID))
        );

        console.debug(`Meeting IDs: ${group.meetingIDs}`)
        console.debug(`Meetings: ${meetings}`)

        console.debug("Returning meetings...")

        // Send/Return the meetings
        return result.status(200).json(meetings);
        
    } catch (error) {
        return result.status(500).json({ error: error.message });
    }
})

const getOneMeeting = asyncHandler(async (request, result) => {
    try {
        const meetingID = request.params.meetingID

        console.debug(`\n\nGetting meeting ${meetingID}`)

        // Verify that the parameters are not empty
        if (!meetingID) {
            return result.status(400).json({ error: "Required variable 'meetingID' not provided" });
        }

        console.debug("Required variables found")

        // Get the meeting from Mongo
        const searchedMeeting = await Meeting.findById(meetingID)
        if (!searchedMeeting) {
            return result.status(403).json({ error: `Meeting with ID ${meetingID} was not found` })
        }

        console.debug(`Meeting ${meetingID} found`)

        // Send/Return the meeting
        result.status(200).json(searchedMeeting)
    } catch (error) {
        return result.status(500).json({ error: error.message });
    }
})

const getAllMeetings = asyncHandler(async (request, result) => {
    try {
        console.debug(`\n\nGetting all meetings`)

        // Get all meetings from Mongo
        const meetings = await Meeting.find()

        console.debug("Returning meetings...")

        // Send/Return the meetings
        result.status(200).json(meetings)
        
    } catch (error) {
        return result.status(500).json({ error: error.message });
    }
})

const createMeeting = asyncHandler(async (request, response) => {
    try {
        // Deconstruct the JSON body
        let { name, description, start, end, creatorID, guestIDs, location } = request.body
        const groupID = request.params.groupID;

        console.debug(`\n\nCreating meeting ${name}`)

        // Verify that the parameters are not empty
        if (!name) {
            console.error("Required variable 'name' not provided")
            return response.status(400).json({ error: "Required variable 'name' not provided" });
        }
        if (!start) {
            console.error("Required variable 'start' not provided")
            return response.status(400).json({ error: "Required variable 'start' not provided" });
        }
        if (!end) {
            console.error("Required variable 'end' not provided")
            return response.status(400).json({ error: "Required variable 'end' not provided" });
        }
        if (!creatorID) {
            console.error("Required variable 'creatorID' not provided")
            return response.status(400).json({ error: "Required variable 'creatorID' not provided" });
        }

        console.debug("Required variables found")
        console.debug(request.body)

        // Convert the start and end dates to Date objects
        console.debug(`Converting start date '${start}' and end date '${end}' to Date objects`)
        start = new Date(start);
        end = new Date(end);
        console.debug(`Start date: ${start}`)
        console.debug(`End date: ${end}`)

        // Test if the start and end dates are valid
        if (isNaN(start.getTime())) {
            console.error(`Invalid start date: ${start}`)
            return response.status(400).json({ error: "Invalid start date" });
        }
        if (isNaN(end.getTime())) {
            console.error(`Invalid end date: ${end}`)
            return response.status(400).json({ error: "Invalid end date" });
        }

        // Create the meeting
        const newMeeting = new Meeting({
            name,
            description: description || null,
            start,
            end,
            creatorID,
            guestIDs: guestIDs || [],
            location: location || null,
            frequency: request.body.frequency || null,
            until: request.body.until || null,
            count: request.body.count || null,
            interval: request.body.interval || null,
            byday: request.body.byday || null
        })
        
        // Get the group from Mongo
        let groupChat = await Group.findById(groupID)
        if (!groupChat){
            console.error(`Group chat with id ${groupID} not found`)
            return response.status(404).json({ error: "Group chat doesn't exist" });
        }

        // Validate the meeting
        const {valid: isValid, message} = await validateMeeting(newMeeting)
        if (!isValid) {
            console.error(`Meeting validation failed: ${message}`)
            return response.status(403).json({ error: message })
        }

        // Save the meeting to the database
        await newMeeting.save();
        
        //append the newMeeting to the group chat meetings array
        console.debug(`Attempting to push message id ${newMeeting._id}`)
        groupChat.meetingIDs.push(newMeeting._id);
        await groupChat.save();
        
        // Return the saved meeting in the response
        console.debug('Meeting created!')
        return response.status(201).json(newMeeting);
    } catch (error) {
        console.error(`Failed to create meeting: ${error.message}`);
        return response.status(500).json({ error: error.message });
    }
})

const updateMeeting = asyncHandler(async (request, result) => {
    try {
        const meetingID = request.params.meetingID

        console.debug(`\n\nUpdating meeting ${meetingID}`)

        // Verify that the parameters are not empty
        if (!meetingID) {
            return result.status(400).json({ error: "Required variable 'meetingID' not provided" });
        }

        console.debug("Required variables found")
        console.debug(request.body)

        // Get the meeting from Mongo
        const searchedMeeting = await Meeting.findById(meetingID)
        if (!searchedMeeting) {
            return result.status(403).json({ error: `Meeting with ID ${meetingID} was not found` })
        }

        // Update the memory instance of meeting for validation purposes
        // These will NOT be saved to the database
        if (request.body.name) {
            searchedMeeting.name = request.body.name
        }
        if (request.body.description) {
            searchedMeeting.description = request.body.description
        }
        if (request.body.start) {
            searchedMeeting.start = request.body.start
        }
        if (request.body.end) {
            searchedMeeting.end = request.body.end
        }
        if (request.body.creatorID) {
            searchedMeeting.creatorID = request.body.creatorID
        }
        if (request.body.guestIDs) {
            searchedMeeting.guestIDs = request.body.guestIDs
        }
        if (request.body.location) {
            searchedMeeting.location = request.body.location
        }
        if (request.body.frequency) {
            searchedMeeting.frequency = request.body.frequency
        }

        // Validate the meeting
        const {isValid, message} = await validateMeeting(searchedMeeting)
        if (!isValid) {
            return result.status(403).json({ error: message })
        }

        // Save the meeting to Mongo
        const savedMeeting = await searchedMeeting.findByIdAndUpdate(meetingID, request.body, { new: true })

        console.debug(`Meeting ${meetingID} updated`)

        // Send/Return the meeting
        result.status(200).json(savedMeeting)
    } catch (error) {
        return result.status(500).json({ error: error.message });
    }
})

const deleteMeeting = asyncHandler(async (request, result) => {
    try {
        const meetingID = request.params.meetingID;
        const { groupID } = request.body;

        console.debug(`\n\nDeleting meeting ${meetingID}`)
        console.debug(request.body); // <-- please work or not, either works lmao

        // Verify that the parameters are not empty
        if (!meetingID) {
            console.error("Required variable 'meetingID' not provided")
            return result.status(400).json({ error: "Required variable 'meetingID' not provided" });
        }
        if (!groupID) {
            console.error("Required variable 'groupID' not provided");
            return result.status(400).json({ error: "Required variable 'groupID' not provided" });
        }

        console.debug("Required variables found")

        // Get the meeting from Mongo
        console.debug(`Searching for meeting ${meetingID}`)
        let meeting = await Meeting.findById(meetingID);
        if (!meeting) {
            console.error(`Meeting ${meetingID} not found`);
            return result.status(404).json({ error: `Meeting ${meetingID} not found` });
        }
        
        // Get the group from Mongo
        console.debug(`Searching for group ${groupID}`)
        let group = await Group.findById(groupID);
        if (!group) {
            console.error(`Group ${groupID} not found`);
            return result.status(404).json({ error: `Group ${groupID} not found` });
        }

        // Perform the delete
        console.debug(`Deleting meeting ${meetingID} and removing from group ${groupID}`);
        meeting.deleteOne();
        console.debug(`Before deletion: ${group.meetingIDs}`)
        group.meetingIDs = group.meetingIDs.filter((id) => id.toString() !== meetingID.toString());
        console.debug(`After deletion: ${group.meetingIDs}`)
        group.save();

        // Send/Return the meeting
        console.debug(`Meeting ${meetingID} deleted`)
        result.status(200).json(meeting)  // will this return the deleted meeting?
        
    } catch (error) {
        console.error(`Failed to delete meeting: ${error.message}`);
        return result.status(500).json({ error: error.message });
    }
})

module.exports = {
    getMeetings,
    getOneMeeting,
    getAllMeetings,
    createMeeting,
    updateMeeting,
    deleteMeeting
}