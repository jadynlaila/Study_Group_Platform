const asyncHandler = require("express-async-handler")
const Message = require('../models/MessageModel.js');

const group = require('../models/GroupModel.js');

const sendMessage = async (req, res) => {
    try{
        const {message} = req.body;
        const {groupID, senderID} = req.params;

        let groupChat = await group.findOne({
            participants: { $all: [senderID, groupID]},
        })

        // what if the group
         if (!groupChat){
             res.status(500).json({ error: "Group chat doesn't exist" });
        }

        // Create the new message
        const newMessage = new Message({
            content: messageContent,
            sender: senderID,
            group: groupID,
        });

        // Save the message to the database
        await newMessage.save();
        
        //append the newMessage to the group chat messages array
        groupChat.messages.push(newMessage._id);
        await groupChat.save();
        
        // Return the saved message in the response
        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteMessage = async (req,res) => {
    try{
        const{ id: messageID } = req.params;
        const senderID = req.student._id;

        // Find the message
        const message = await Message.findById(messageID);

        // Check if message exists
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        // Check if the user is the sender or an admin in the group
        isSender = message.author.toString() == senderID.toString()

        if(!isSender){
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
        res.status(200).json({ message: 'Message deleted successfully' });

    }catch (error) {
        console.error('Error in deleteMessage controller:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {sendMessage}

// test case print message