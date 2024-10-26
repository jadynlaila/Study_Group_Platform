const asyncHandler = require("express-async-handler")
const message = require('../models/MessageModel.js');

const group = require('../models/GroupModel.js');

const sendMessage = async (req, res) => {
    try{
        const {message} = req.body;
        const {id: groupID} = req.params;
        const senderID = req.student._id;

        let groupChat = await group.findOne({
            participants: { $all: [senderID, groupID]},
        })

        // what if the group
         if (!groupChat){
             res.status(500).json({ error: "Group chat doesn't exist" });
        }
           
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {sendMessage}