
// Requires //
const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")
const Group = require('../models/GroupModel')
const Student = require('../models/StudentModel')

// Global Constants //
const MAX_MESSAGE_LENGTH = 2000

const createGroup = asyncHandler((req, res) => {
    try {

    } catch (e) {

    }
})

const getGroup = asyncHandler(async (req, res) => {
    try {
        // Obtain the parameters (userID, groupID)
        console.log(req.body)
        const {
            userID,
            groupID
        } = req.body

        // Verify that the parameters are not empty
        if (!userID) {
            return req.status(400).json({ error: "Required parameter 'userID' not provided" })
        }
        if (!groupID) {
            return req.status(400).json({ error: "Required parameter 'groupID' not provided" })
        }
        
        // Obtain the user and group from Mongo
        const resultUser = await Student.findById(userID)
        const resultGroup = await Group.findById(groupID)
        
        // Check if we actually got a user and group back
        if (!resultUser?.username) {
            return req.status(403).json({ error: `Student with ID ${userID} was not found` })
        }
        if (!resultGroup?.name) {
            return req.status(403).json({ error: `Student with ID ${userID} was not found` })
        }

        // Make sure the user is in the group
        if (!resultGroup.memberIDs.includes(resultUser._id)) {
            return req.status(403).json({ error: "User is not a member of the group" })
        }

        // Send/Return the group object
        res.status(200).json(resultGroup)
    
    } catch (e) {
        return req.status(500).json({ error: e })
    }
})

const updateGroup = asyncHandler(async (req, res) => {
    try {
        // Obtain the parameters 
        /* 
            Required:
                userID groupID
            Optional: 
                name description profilePictureID courses
                majors memberLimit memberCount memberIDs
                ownerID administratorIDs messageIDs meetingIDs
        */
        const {
            userID,
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
        } = req.body

        // Verify that the required parameters are not empty
        if (!userID) {
            
        }

        // Verify that the user exists

        // Verify that the group exists

        // Check user permissions

        // Send data to Mongo
    } catch (e) {

    }
})

const deleteGroup = asyncHandler(async (req, res) => {
    req.status(501).json({ error: "Deleting a group has not been implemented yet." })

    try {
        // Obtain the parameters (userID, groupID)

        // Verify that the parameters are not empty

        // Check that the user and group exist

        // Obtain the group from Mongo

        // Check the user's permissions

        // Delete the group in Mongo

        // Return a success code
    } catch (e) {

    }
})

const joinGroup = asyncHandler(async (req, res) => {
    try {
        // Obtain the parameters (userID, groupID)

        // Verify that all parameters are not empty

        // Check if the user exists

        // Check if the group exists

        // Check if the user is already in the group

        // Send the data to Mongo

        // Obtain the new group data from Mongo

        // Verify that the user is in the group

        // Send back a status code
    } catch (e) {

    }
})


const getMessages = asyncHandler(async (req, res) => {
    try {
        // Obtain the parameters (userID, groupID)

        // Verify that the parameters are not empty

        // Check if the group exists
        // *(Does this need to happen here? Mongo probably will just send back an empty object.)*

        // Get the group from Mongo

        // Check if the grabbed group is valid

        // Check if the user is in the group

        // Send/Return the messages

    } catch (e) {

    }
})

const sendMessage = asyncHandler(async (req, res) => {
    try {
        // Obtain the parameters (groupID, message)
        const groupID = 0
        const message = ""

        // Verify that the parameters are not empty

        // Make sure the group exists
        // *This is necessary here as we don't want to create a group from a message*

        // Make sure the message length is valid
        if (message.length >= MAX_MESSAGE_LENGTH) {
            throw new Error(`Message length of ${message.length} is longer than the limit of ${MAX_MESSAGE_LENGTH}.`)
        }

        // Send the data to Mongo

        // *I'm going to ignore verifying that the message was sent.*

    } catch (e) {

    }
})

const deleteMessage = asyncHandler(async (req, res) => {
    req.status(501).json({ error: "Deleting a message has not been implemented yet." })
})
