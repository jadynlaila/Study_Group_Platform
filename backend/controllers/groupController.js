const { response } = require("express")

// requires //
const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")
const Group = require('../models/GroupModel')
const Student = require('../models/StudentModel')

// Global Constants //
const MAX_MESSAGE_LENGTH = 2000

const createGroup = asyncHandler(async (request, result) => {
    try {
        // Deconstruct the JSON body into local vars
        const {
            name,
            description,
            courses,
            majors,
            memberLimit,
            ownerID,
            profilePictureID
        } = request.body

        console.log(`DEBUG createGroup body: ${JSON.stringify(request.body)}`)
        
        // Check that the required parameters are here
        if (!name) {
            return result.status(400).json({ error: "Required variable 'name' not provided" })
        }

        // Check that the owner was provided
        if (!ownerID) {
            return result.status(400).json({ error: "Required variable 'ownerID' not provided" })
        }

        // Check that the owner exists
        const searchedOwner = Student.findById(ownerID)
        if (!searchedOwner) {
            result.status(404).json({ error: `User with ID ${ownerID} was not found`})
        }

        // Create a new group object
        const newGroup = new Group({
            name,
            description,
            courses,
            majors,
            memberLimit,
            memberCount: 0,
            memberIDs: [],
            ownerID: new mongoose.Types.ObjectId(ownerID),
            administratorIDs: [],
            profilePictureID: profilePictureID ? new mongoose.Types.ObjectId(profilePictureID) : null,
            messageIDs: []
        });

        // Save the new group to MongoDB
        const savedGroup = await newGroup.save();

        // Return the saved group object
        return result.status(201).json(savedGroup);
    } catch (e) {
        return result.status(500).json({ error: e.message });
    }
})

const getGroup = asyncHandler(async (request, result) => {
    try {
        // Deconstruct the JSON body
        const {groupID} = request.body

        console.log(`value of groupID: ${groupID}`)
        
        // Verify that the parameters are not empty
        if (!groupID) {
            return result.status(400).json({ error: "Required variable 'groupID' not provided" })
        }

        // Obtain the user and group from Mongo
        const mongoGroup = await Group.findById(groupID)

        // Check if we actually got a user and group back
        if (!mongoGroup) {
            return result.status(404).json({ error: `Group with ID ${groupID} was not found` });
        }

        // Send/Return the group object
        return result.status(200).json(mongoGroup)
    
    } catch (e) {
        return result.status(500).json({ error: e })
    }
})

const updateGroup = asyncHandler(async (request, result) => {
    try {
        // Deconstruct the JSON body
        const {
            studentID,
            groupID,
            name,
            description,
            profilePictureID,
            courses,
            majors,
            memberLimit,
            memberCount,
            memberIDs,
            ownerID,
            administratorIDs,
            messageIDs,
            meetingIDs
        } = request.body

        // Verify that the group exists
        const mongoGroup = await Group.findById(groupID)
        if (!mongoGroup) {
            return result.status(404).json({ error: `Group with ID ${groupID} was not found` })
        }

        // Send data to Mongo
        const updatedGroup = await Group.findByIdAndUpdate(
            groupID,
            {
                name,
                description,
                profilePictureID,
                courses,
                majors,
                memberLimit,
                memberCount,
                memberIDs,
                ownerID,
                administratorIDs,
                messageIDs,
                meetingIDs
            },
            { new: true }   // return a copy of the updated group object
        );

        return result.status(200).json(updatedGroup);
    } catch (e) {
        return result.status(500).json({ error: e.message });
    }
})

const deleteGroup = asyncHandler(async (request, result) => {
    return request.status(501).json({ error: "Deleting a group has not been implemented yet." })

    try {
        // Obtain the parameters (studentID, groupID)

        // Verify that the parameters are not empty

        // Check that the user and group exist

        // Obtain the group from Mongo

        // Check the user's permissions

        // Delete the group in Mongo

        // Return a success code
        
    } catch (e) {
        return result.status(500).json({ error: e.message });
    }
})

const joinGroup = asyncHandler(async (request, result) => {
    try {
        // Deconstruct the JSON body
        const {
            studentID,
            groupID
        } = request.body

        // Verify that all parameters are not empty
        if (!studentID) {
            return response.status(400).json({ error: "Required variable 'studentID' not provided"})
        }

        if (!groupID) {
            return response.status(400).json({ error: "Required variable 'groupID' not provided" })
        }

        // Get the data from Mongo
        const searchedStudent = Student.findById(studentID)
        const searchedGroup = Group.findById(groupID)
        
        // Check if the query returned anything
        if (!searchedStudent) {
            return response.status(404).json({ error: `Student object with id ${studentID} not found`})
        }

        if (!searchedGroup) {
            return response.status(404).json({ error: `Group object with id ${groupID} not found`})
        }

        // Check if the user is already in the group
        if (
            searchedGroup.memberIDs.includes(studentID) ||
            searchedGroup.administratorIDs.includes(studentID) ||
            searchedGroup.ownerID === studentID
        ) {
            return response.status().json({ error: "Student is already a member of the group" });
        }

        // Link the group and user objects
        searchedGroup.memberIDs += studentID
        searchedStudent.groups += groupID

        // Save the data to mongo
        await searchedGroup.save();
        await searchedStudent.save();

        // Send back a response
        return response.status(201).json({ searchedGroup, searchedStudent })
    } catch (e) {
        return result.status(500).json({ error: e.message });
    }
})

const getMessages = asyncHandler(async (request, result) => {
    try {
        // Deconstruct the JSON body
        const groupID = request.body

        // Verify that the parameters are not empty
        if (!groupID) {
            return request.status(400).json({ error: "Required variable 'groupID' not provided" })
        }

        // Get the user and group from Mongo
        const searchedGroup = await Group.findById(groupID)
        if (!searchedGroup) {
            return request.status(403).json({ error: `Group with ID ${groupID} was not found` })
        }

        // Convert the message IDs into an array of Message objects
        const messages = await Promise.all(
            searchedGroup.messageIDs.map(async (messageID) => {
                const message = await Message.findById(messageID);
                return message;
            })
        );

        // Send/Return the messages
        result.status(200).json(messages)
    } catch (e) {
        return result.status(500).json({ error: e.message });
    }
})

module.exports = {
    createGroup,
    getGroup,
    updateGroup,
    deleteGroup,
    joinGroup,
    getMessages
}
