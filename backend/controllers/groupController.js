
// Requires //
const mongoose = require("mongoose")

// Global Constants //
const MAX_MESSAGE_LENGTH = 2000

const createGroup = asyncHandler((req, res) => {
    try {

    } catch (e) {

    }
})

const getGroup = asyncHandler((req, res) => {
    try {
        // Obtain the parameters (userID, groupID)

        // Verify that the parameters are not empty

        // Verify that the user and group exist

        // Obtain the group from Mongo

        // Check if we actually got a group back

        // Make sure the user is in the group

        // Send/Return the group object

    } catch (e) {

    }
})

const updateGroup = asyncHandler((req, res) => {
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

        // Verify that the required parameters are not empty

        // Verify that the user exists

        // Verify that the group exists

        // Check user permissions

        // Send data to Mongo
    } catch (e) {

    }
})

const deleteGroup = asyncHandler((req, res) => {
    req.status(501).json({ message: "Deleting a group has not been implemented yet." })

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

const joinGroup = asyncHandler((req, res) => {
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


const getMessages = asyncHandler((req, res) => {
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

const sendMessage = asyncHandler((req, res) => {
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

const deleteMessage = asyncHandler((req, res) => {
    req.status(501).json({ message: "Deleting a message has not been implemented yet." })
})