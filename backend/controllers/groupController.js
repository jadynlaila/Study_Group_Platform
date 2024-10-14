
// Requires //
const mongoose = require("mongoose")

// Global Variables //


// Classes //
class Group {
    constructor(name, description, courses, majors,
        memberLimit, memberCount, ownerID, 
        memberIDs, administratorIDs, profilePictureID, messageIDs) {

        // set the class attributes
        this.name = name;
        this.description = description;
        this.courses = courses;
        this.majors = majors;
        this.memberLimit = memberLimit;
        this.memberCount = memberCount;
        this.ownerID = ownerID;
        this.memberIDs = memberIDs;
        this.administratorIDs = administratorIDs;
        this.profilePictureID = profilePictureID;
        this.messageIDs = messageIDs;
    }

    // Getters //


    // Setters //

    set name(value) {
        if (!value.isWellFormed()) {
            throw new Error("Name contains invalid characters");
        }
        this.name = value;
    }

    set description(value) {
        if (!value.isWellFormed()) {
            throw new Error("Description contains invalid characters");
        }
        this.description = value;
    }

    set memberCount(value) {
        if (value > this.memberLimit) {
            throw new Error(`Member count ${value} is bigger than the current limit of ${this.memberLimit}`);
        }
        this.memberCount = value;
    }

    set ownerID(value) {
        if (!userIsReal(value)) {
            throw new Error(`User "${value}" could not be found!`);
        }
        this.ownerID = value;
    }

    join(userID) {

    }

    delete() {

    }

    //* REQUIRES completion of Message class
    sendMessage(message) {
        console.warn("Function 'sendMessage' was called but the Message class isn't ready yet.")
        
        
        
        this.messageIDs.push(message.id)

        this.save()
    }
    
    //* REQUIRES completion of Message class
    deleteMessage(messageID) {
        console.warn("Function 'sendMessage' was called but the Message class isn't ready yet.")
        
        mongoose.delete(messageID)
        this.messageIDs.find((currentID) => currentID === messageID)

        this.save()
    }

    save() {
        // check if currententry already exists
    }
}


//! This should NOT be here, but in the User class instead
function findUserFromID(userID) {
    return mongoose.findById(userID);
}


//! This should NOT be here, but in the User class instead
function findUserFromUsername(username) {
    return mongoose.findOne({ username: `${username}` });
}


//! This should NOT be here, but in the User class instead
function userIsReal(userID) {
    if (!findUserFromID(userID)) {
        return false;
    }
    return true;
}