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
    if (!meeting.name) {
        return { valid: false, message: "Meeting must have a name" }
    }

    // ensure that the meeting start date is before the end date
    if (meeting.start >= meeting.end) {
        return { valid: false, message: "Meeting start date must be before the end date" }
    }

    // ensure that the meeting creator is a valid user
    const creator = await Student.findById(meeting.creatorID)
    if (!creator) {
        return { valid: false, message: "Meeting creator is not a valid user" }
    }

    return { valid: true, message: null }
}

const getMeetings = asyncHandler(async (request, result) => {
    try {
        // Deconstruct the JSON body
        const groupID = request.params.groupID

        console.debug(`\n\nGetting meetings for group ${groupID}`)

        // Verify that the parameters are not empty
        if (!groupID) {
            return request.status(400).json({ error: "Required variable 'groupID' not provided" })
        }

        console.debug("Required variables found")

        // Get the user and group from Mongo
        const searchedGroup = await Group.findById(groupID)
        if (!searchedGroup) {
            return request.status(403).json({ error: `Group with ID ${groupID} was not found` })
        }

        console.debug(`Group ${groupID} found: ${searchedGroup.name}`)

        // Convert the message IDs into an array of Message objects
        const meetings = await Promise.all(
            searchedGroup.meetingIDs.map(async (meetingID) => {
                const meeting = await Meeting.findById(meetingID);
                return meeting;
            })
        );

        console.debug("Returning meetings...")

        // Send/Return the meetings
        result.status(200).json(meetings)
        
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
            return request.status(400).json({ error: "Required variable 'meetingID' not provided" });
        }

        console.debug("Required variables found")

        // Get the meeting from Mongo
        const searchedMeeting = await Meeting.findById(meetingID)
        if (!searchedMeeting) {
            return request.status(403).json({ error: `Meeting with ID ${meetingID} was not found` })
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

const createMeeting = asyncHandler(async (request, result) => {
    try {
        // Deconstruct the JSON body
        const { name, description, start, end, creatorID, guestIDs, location } = request.body

        console.debug(`\n\nCreating meeting ${name}`)

        // Verify that the parameters are not empty
        if (!name) {
            return request.status(400).json({ error: "Required variable 'name' not provided" });
        }
        if (!start) {
            return request.status(400).json({ error: "Required variable 'start' not provided" });
        }
        if (!end) {
            return request.status(400).json({ error: "Required variable 'end' not provided" });
        }
        if (!creatorID) {
            return request.status(400).json({ error: "Required variable 'creatorID' not provided" });
        }

        console.debug("Required variables found")
        console.debug(request.body)

        // Create the meeting
        const newMeeting = new Meeting({
            name,
            description,
            start,
            end,
            creatorID,
            guestIDs,
            location
        })

        // Validate the meeting
        const {isValid, message} = await validateMeeting(newMeeting)
        if (!isValid) {
            return request.status(403).json({ error: message })
        }

        // Save the meeting to Mongo
        const savedMeeting = await newMeeting.save()

        console.debug(`Meeting ${name} created with an ID of ${savedMeeting._id}`)

        // Send/Return the meeting
        result.status(201).json(savedMeeting)
    } catch (error) {
        return result.status(500).json({ error: error.message });
    }
})

const updateMeeting = asyncHandler(async (request, result) => {
    try {
        const meetingID = request.params.meetingID

        console.debug(`\n\nUpdating meeting ${meetingID}`)

        // Verify that the parameters are not empty
        if (!meetingID) {
            return request.status(400).json({ error: "Required variable 'meetingID' not provided" });
        }

        console.debug("Required variables found")
        console.debug(request.body)

        // Get the meeting from Mongo
        const searchedMeeting = await Meeting.findById(meetingID)
        if (!searchedMeeting) {
            return request.status(403).json({ error: `Meeting with ID ${meetingID} was not found` })
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

        // Validate the meeting
        const {isValid, message} = await validateMeeting(searchedMeeting)
        if (!isValid) {
            return request.status(403).json({ error: message })
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
        const meetingID = request.params.meetingID

        console.debug(`\n\nDeleting meeting ${meetingID}`)

        // Verify that the parameters are not empty
        if (!meetingID) {
            return request.status(400).json({ error: "Required variable 'meetingID' not provided" });
        }

        console.debug("Required variables found")

        // Get the meeting from Mongo
        const searchedMeeting = await Meeting.findById(meetingID)
        if (!searchedMeeting) {
            return request.status(403).json({ error: `Meeting with ID ${meetingID} was not found` })
        }

        // remove the meeting from the group
        const response = axios.put(`${localServerAddress}/api/groups/${searchedMeeting.groupID}`, { 
            meetingIDs: searchedMeeting.meetingIDs.filter(id => id !== meetingID) 
        })

        // Delete the meeting from Mongo
        await searchedMeeting.deleteOne()

        console.debug(`Meeting ${meetingID} deleted`)

        // Send/Return the meeting
        result.status(200).json({ message: `Meeting ${meetingID} deleted` })
    } catch (error) {
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