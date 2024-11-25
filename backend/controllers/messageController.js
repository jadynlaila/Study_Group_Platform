const asyncHandler = require("express-async-handler")
const Message = require('../models/MessageModel.js');
const Group = require('../models/GroupModel.js');

const sendMessage = asyncHandler(async (req, res) => {
    try {
        const { 
            groupID, 
            studentID, 
            message 
        } = req.body;

        console.debug('Attempting to send a message')
        console.debug(`groupID: ${groupID}, studentID: ${studentID}, message: ${message}`)

        // make sure the variables are populated
        if (!groupID) {
            console.error('Group ID was not provided')
            return res.status(400).json({ error: "Group ID is required" });
        }
        
        if (!studentID) {
            console.error('Student ID was not provided')
            return res.status(400).json({ error: "Student ID is required" });
        }
        
        if (!message) {
            console.error('Message content was not provided')
            return res.status(400).json({ error: "Message content is required" });
        }
        
        // what if the group doesn't exist
        let groupChat = await Group.findById(groupID)
        if (!groupChat){
            console.error(`Group chat with id ${groupID} not found`)
            return res.status(404).json({ error: "Group chat doesn't exist" });
        }

        // Create the new message
        const newMessage = new Message({
            content: message,
            author: studentID,
            groupID: groupID,
        });

        // Save the message to the database
        await newMessage.save();
        
        //append the newMessage to the group chat messages array
        console.debug(`Attempting to push message id ${newMessage._id}`)
        groupChat.messageIDs.push(newMessage._id);
        await groupChat.save();
        
        // Return the saved message in the response
        console.debug('Message sent!')
        return res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({ error });
    }
});

const deleteMessage = asyncHandler(async (req,res) => {
    try{
        const { messageID, senderID } = req.body;
        console.debug(`Attempting to delete message with id ${messageID} as user with id ${senderID}`);

        // Find the message
        const message = await Message.findById(messageID);

        // Check if message exists
        if (!message) {
            console.error(`Message with id ${messageID} not found`);
            return res.status(404).json({ error: 'Message not found' });
        }

        // Find the group associated with the message
        const group = await Group.findById(message.groupID);  
        if (!group) {
            console.warn(`Group with id ${message.groupID} not found. This isn't critical, but you should know anyways.`);
            // return res.status(404).json({ error: 'Group not found' });
        }

        // Check if the user is the sender or an admin in the group
        isSender = message.author.toString() == senderID.toString()

        if(!isSender){
            console.error(`User with id ${senderID} tried and failed to delete message with id ${messageID}`);
            return res.status(403).json({ error: 'You do not have permission to delete this message' });
        }

        // remove the message from the group messeges array
        await Group.updateOne(
            { _id: message.group },
            { $pull: { messages: messageID } }
        );

        // Delete the message
        await message.remove();

        // Send success response
        console.debug(`Message with id ${messageID} deleted successfully`);
        res.status(200).json({ message: 'Message deleted successfully' });

    } catch (error) {
        console.error('Error in deleteMessage controller:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const getMessage = asyncHandler(async (req,res) => {
    try {
        // Get the message ID from the request parameters
        const { messageID } = req.params;
        console.debug(`Attempting to find message with id ${messageID}`);

        // Find the message in the database
        const message = await Message.findById(messageID).populate('author', 'username');

        // what if message doesn't exsist
        if (!message) {
            console.error(`Message with id ${messageID} not found`);
            return res.status(404).json({ error: `Message  with id ${messageID} not found` });
        }

        // Respond with the found message
        console.debug(`Message with id ${messageID} found successfully`);
        res.status(200).json(message);
    } catch (e) {
        console.error('Error in getMessage controller:', e.message);
        res.status(500).json({ error: e });
    }
});

module.exports = {sendMessage, deleteMessage, getMessage}

// test case print message