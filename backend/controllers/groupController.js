const { response } = require("express")

// requires //
const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")
const Group = require('../models/GroupModel')
const Student = require('../models/StudentModel')
const Message = require('../models/MessageModel')

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

        console.debug("\n\nCreating a new group")
        console.debug(`name: ${name}, description: ${description}, courses: ${courses}, majors: ${majors}, memberLimit: ${memberLimit}, ownerID: ${ownerID}, profilePictureID: ${profilePictureID}`)
        
        // Check that the required parameters are here
        if (!name) {
            console.debug("Failed to provide variable 'name'")
            return result.status(400).json({ error: "Required variable 'name' not provided" })
        }
        
        // Check that the owner was provided
        if (!ownerID) {
            console.debug("Failed to provide variable 'ownerID'")
            return result.status(400).json({ error: "Required variable 'ownerID' not provided" })
        }

        console.debug("Required variables passed")

        // Check that the owner exists
        const searchedOwner = Student.findById(ownerID)
        if (!searchedOwner) {
            console.debug(`Unable to find student object ${ownerID}`)
            result.status(404).json({ error: `User with ID ${ownerID} was not found`})
        }

        console.debug(`Found user with ID ${ownerID}: ${searchedOwner.username}`)

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

        console.debug(`Saved the new group with an ID of ${savedGroup._id}`)

        // Return the saved group object
        return result.status(201).json({groupID: savedGroup._id, group: savedGroup});
    } catch (e) {
        console.debug(`Exception occurred: ${e}`)
        return result.status(500).json({ error: e.message });
    }
})

const getGroup = asyncHandler(async (request, result) => {
    try {
        // Deconstruct the JSON body
        const groupID = request.params.groupID

        console.debug(`\n\nGot a GET request for group ${groupID}`)
        
        // Verify that the parameters are not empty
        if (!groupID) {
            console.debug("Failed to provide variable 'ownerID'")
            return result.status(400).json({ error: "Required variable 'groupID' not provided" })
        }

        console.debug("Required variables found")

        // Obtain the user and group from Mongo
        const searchedGroup = await Group.findById(groupID)

        // Check if we actually got a user and group back
        if (!searchedGroup) {
            console.debug(`Group ${groupID} not found`)
            return result.status(404).json({ error: `Group with ID ${groupID} was not found` });
        }

        console.debug(`Found the group ${groupID}: ${searchedGroup.name}`)

        // Send/Return the group object
        return result.status(200).json(searchedGroup)
    
    } catch (e) {
        return result.status(500).json({ error: e })
    }
})

const updateGroup = asyncHandler(async (request, result) => {
    try {
        // Deconstruct the JSON body
        const {
            groupID,
            name,
            description,
            courses,
            majors,
            memberLimit,
            profilePictureID
        } = request.body

        // Verify that the parameters are not empty
        if (!groupID) {
            console.debug("Failed to provide variable 'groupID'")
            return result.status(400).json({ error: "Required variable 'groupID' not provided" })
        }
        
        console.debug(`\n\nUpdating group ${groupID}`)
        console.debug(`name: ${name}, description: ${description}, courses: ${courses}, majors: ${majors}, memberLimit: ${memberLimit}, profilePictureID: ${profilePictureID}`)

        // Verify that the group exists
        const mongoGroup = await Group.findById(groupID)
        if (!mongoGroup) {
            console.debug(`Failed to find group ${groupID}`)
            return result.status(404).json({ error: `Group with ID ${groupID} was not found` })
        }

        console.debug(`Group ${groupID} was found: ${mongoGroup.name}`)

        // Send data to Mongo
        const updatedGroup = await Group.findByIdAndUpdate(
            groupID,
            {
                name: name || mongoGroup.name,
                description: description || mongoGroup.description,
                profilePictureID: profilePictureID || mongoGroup.profilePictureID,
                courses: courses || mongoGroup.courses,
                majors: majors || mongoGroup.majors,
                memberLimit: memberLimit || mongoGroup.memberLimit,
                memberCount: mongoGroup.memberCount,
                memberIDs: mongoGroup.memberIDs,
                ownerID: mongoGroup.ownerID,
                administratorIDs: mongoGroup.administratorIDs,
                messageIDs: mongoGroup.messageIDs,
                meetingIDs: mongoGroup.meetingIDs
            },
            { new: true }   // return a copy of the updated group object
        );

        console.debug("DB update sent")

        return result.status(200).json({ groupID: updatedGroup._id, group: updatedGroup });
    } catch (e) {
        return result.status(500).json({ error: e.message });
    }
})

const deleteGroup = asyncHandler(async (request, result) => {
    console.debug("lah dee dah someone tried deleting a group")
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
        const { studentID } = request.body
        const groupID = request.params.groupID

        console.debug(`\n\nGroup join request from ${studentID} into ${groupID}`)

        // Verify that all parameters are not empty
        if (!studentID) {
            return result.status(400).json({ error: "Required variable 'studentID' not provided"})
        }

        if (!groupID) {
            return result.status(400).json({ error: "Required variable 'groupID' not provided" })
        }

        console.debug("Required parameters found")

        // Get the data from Mongo
        const searchedStudent = await Student.findById(studentID)
        const searchedGroup = await Group.findById(groupID)
        
        // Check if the query returned anything
        if (!searchedStudent) {
            console.debug(`Failed to find student ${studentID}`)
            return result.status(404).json({ error: `Student object with id ${studentID} not found`})
        }
        
        if (!searchedGroup) {
            console.debug(`Failed to find group ${groupID}`)
            return result.status(404).json({ error: `Group object with id ${groupID} not found`})
        }

        console.debug(`Found user ${searchedStudent.username} and group ${searchedGroup.name}`)
        
        // Check if the user is already in the group
        if (
            searchedGroup.memberIDs.includes(studentID) ||
            searchedGroup.administratorIDs.includes(studentID) ||
            searchedGroup.ownerID.equals(studentID)
        ) {
            console.debug("Student is already a member of the group")
            return result.status(409).json({ error: "Student is already a member of the group" });
        }

        console.debug(`${searchedStudent.username} is not already a member of the group. Proceeding to perform join operations...`)

        // Link the group and user objects
        searchedGroup.memberIDs += studentID
        searchedStudent.groups += groupID

        // Save the data to mongo
        await searchedGroup.save();
        await searchedStudent.save();

        console.debug(`${searchedStudent.username} has been added to group ${searchedGroup.name}`)

        // Send back a response
        return result.status(201).json({ group: searchedGroup, student: searchedStudent })
    } catch (e) {
        return result.status(500).json({ error: e.message });
    }
})

const getMessages = asyncHandler(async (request, result) => {
    try {
        // Deconstruct the JSON body
        const groupID = request.params.groupID

        console.debug(`\n\nGetting messages for group ${groupID}`)

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
        const messages = await Promise.all(
            searchedGroup.messageIDs.map(async (messageID) => {
                const message = await Message.findById(messageID);
                return message;
            })
        );

        console.debug("Returning messages...")

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
