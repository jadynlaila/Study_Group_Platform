const { response } = require("express")
const axios = require('axios')

// requires //
const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")
const Group = require('../models/GroupModel')
const Student = require('../models/StudentModel')
const Message = require('../models/MessageModel')

const localServerAddress = `http://127.0.0.1:${process.env.EXPRESS_PORT}`

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
        const searchedOwner = await Student.findById(ownerID)
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
            memberCount: 1,     // set to 1 because owner is in group
            memberIDs: [],
            ownerID,
            administratorIDs: [],
            profilePictureID: profilePictureID,
            messageIDs: [],
            meetingIDs: []
        });

        // Save the new group to MongoDB
        const savedGroup = await newGroup.save();
        console.debug(`Saved the new group with an ID of ${savedGroup._id}`)

        // Update the student object to be a member of this group
        const searchedStudent = await Student.findById(ownerID)
        const response = await axios.put(`${localServerAddress}/api/student/${ownerID}`, {
            groups: [...searchedStudent.groups, savedGroup._id]
        })

        if (response.status != 200) {
            return result.status(response.status).json(response.data)
        }

        // Return the saved group object
        return result.status(201).json({groupID: savedGroup._id, group: savedGroup});
    } catch (error) {
        console.debug(`Exception occurred: ${error}`)
        return result.status(500).json({ error });
    }
})

const getAllGroups = asyncHandler(async (request, result) => {
    try {
        console.debug('Sending all existing groups')

        const groups = await Group.find()

        console.debug(`Number of groups found: ${groups.length}`)

        return result.status(200).json(groups)
    } catch (error) {
        return result.status(500).json({ error })
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
    
    } catch (error) {
        return result.status(500).json({ error })
    }
})

const searchGroups = asyncHandler(async (request, result) => {
    try {
        const { name, description, courses, majors, maxResults } = request.body

        console.debug(`\n\nSearching for groups with name: ${name}, courses: ${courses}, majors: ${majors}`)

        // search for groups with the given parameters
        const groups = await Group.find({
            name: { $regex: name, $options: 'i' },
            description: { $regex: description, $options: 'i' },
            courses: { $in: courses },
            majors: { $in: majors },
        }).limit(maxResults)

        console.debug(`Found ${groups.length} groups`)

        // return different result if nothing found
        if (groups.length == 0) {
            return result.status(404).json({ error: "No groups found" })
        }

        return result.status(200).json(groups)
    } catch (e) {
        console.error(e)
        return result.status(500).json({ error: e })
    }
})

const updateGroup = asyncHandler(async (request, result) => {
    try {
        const groupID = request.params.groupID

        console.debug(`Updating group '${groupID}'`)
        console.debug(request.body)

        if (!mongoose.Types.ObjectId.isValid(groupID)) {
            return response.status(400).send('Invalid group ID')
        }

        console.debug(`Attempting to update group ${groupID}`)
        console.debug(request.body)

        const group = await Group.findById(groupID)

        if (!group) {
            return result.status(400).send(`Group '${groupID}' not found`)
        }

        // Send data to Mongo
        const updatedGroup = await Group.findByIdAndUpdate(
            groupID,
            request.body,
            { new: true }   // return a copy of the updated group object
        );

        console.debug(`DB update sent for group ${groupID}`)

        return result.status(200).json({ group: updatedGroup });
    
    } catch (error) {
        console.error(error)
        return result.status(500).json({ error });
    }
})

const deleteGroup = asyncHandler(async (request, result) => {
    try {
        // Obtain the parameters groupID
        const groupID = request.params.groupID

        console.debug(`\n\nDeleting group ${groupID}`)

        // Obtain the group from Mongo
        const searchedGroup = await Group.findById(groupID)

        if (!searchedGroup) {
            return result.status(404).json({ error: `Group with ID ${groupID} was not found` })
        }

        console.debug(`Found group ${groupID}: ${searchedGroup.name}`)
        
        // Delete the group from all students
        console.debug("Removing group from all students...")
        const allStudentIDs = [...searchedGroup.memberIDs, ...searchedGroup.administratorIDs, searchedGroup.ownerID];
        for (const studentID of allStudentIDs) {
            console.debug(`Removing group ${groupID} from student ${studentID}`)

            const student = await Student.findById(studentID);
            if (!student) {
                console.warn(`Failed to FIND student ${studentID}. This may be a problem in the future.`);
                continue;
            }

            // send the update to the student object
            const response = await axios.put(`${localServerAddress}/api/student/${studentID}`, {
                groups: student.groups.filter(group => group != groupID)
            });

            // check the response
            if (response.status != 200) {
                console.error(`Failed to UPDATE student ${studentID}. This may be a problem in the future.`);
            }

            console.debug(`Removed group ${groupID} from student ${studentID}`);
        }

        // Delete the group in Mongo
        await Group.findByIdAndDelete(groupID);
        console.debug(`Deleted group ${groupID}`)

        // Return a success code
        return result.status(200).json({ success: true });
        
    } catch (error) {
        console.error(error)
        return result.status(500).json({ error });
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
    } catch (error) {
        console.error(error)
        return result.status(500).json(error);
    }
})

const leaveGroup = asyncHandler(async (request, result) => {
    try {
        const groupID = request.params.groupID
        const {studentID} = request.body

        // get the student
        const student = await Student.findById(studentID)
        if (!student) {
            console.warn(`Failed to find student ${studentID}`)
            return result.status(400).json({ error: `Failed to find student ${studentID}` })
        }

        // get the group
        const group = await Group.findById(groupID)
        if (!group) {
            console.warn(`Failed to find group ${groupID}`)
            return result.status(400).json({ error: `Failed to find group ${groupID}` })
        }

        // check if the student is the owner
        if (group.ownerID.equals(studentID)) {
            console.warn(`Student ${studentID} is the owner of group ${groupID}. An owner cannot leave their own group.`)
            return result.status(409).json({ error: `Student ${studentID} is the owner of group ${groupID}. An owner cannot leave their own group.` })
        }

        // check if the student is in the group
        if (!group.memberIDs.includes(studentID)) {
            console.warn(`Student ${studentID} is not in group ${groupID}`)
            return result.status(400).json({ error: `Student ${studentID} is not in group ${groupID}` })
        }

        // check if student is in admin ids
        if (group.administratorIDs.includes(studentID)) {
            console.warn(`Student ${studentID} is an admin of group ${groupID}`)
            return result.status(400).json({ error: `Student ${studentID} is an admin of group ${groupID}` })
        }

        // remove the group from the student object via the APIs
        const studentResponse = await axios.put(`${localServerAddress}/api/student/${studentID}`, {
            groups: student.groups.filter(group => group != groupID)
        })

        // remove the student from the group object via the APIs
        const groupResponse = await axios.put(`${localServerAddress}/api/group/${groupID}`, {
            memberIDs: group.memberIDs.filter(member => member != studentID)
        })

        // check the responses
        if (studentResponse.status != 200) {
            console.error(`Failed to update student ${studentID}`)
            return result.status(studentResponse.status).json(studentResponse.data)
        }
        if (groupResponse.status != 200) {
            console.error(`Failed to update group ${groupID}`)
            return result.status(groupResponse.status).json(groupResponse.data)
        }

        // return success
        return result.status(200).json({ success: true })

    } catch (error) {
        console.error(error)
        return result.status(500).send(error)
    }
})

const getStudentsFromGroup = asyncHandler(async (request, result) => {
    try {
        const groupID = request.params.groupID

        console.debug(`Getting students for group '${groupID}'`)

        if (!groupID) {
            // frankly, this code should never run, but i'm just being exhaustive here just in case
            return result.status(400).json({ error: "Parameter 'groupID' is required" })
        }

        // use the existing API to get the group
        const response = await axios.get(`${localServerAddress}/api/group/${groupID}`)
        const searchedGroup = response.data

        if (response.status != 200) {
            return result.status(response.status).json(response.body)
        }

        // get all the students, place in array
        let allStudents = []

        // add the owner
        const owner = await Student.findById(searchedGroup.ownerID)
        if (owner) {
            allStudents.push(owner)
        }

        // iter through the administrators
        for (const adminID of searchedGroup.administratorIDs) {
            const student = await Student.findById(adminID)
            if (student) {
                allStudents.push(student)
            }
        }

        // iter through regular members
        for (const memberID of searchedGroup.memberIDs) {
            const student = await Student.findById(memberID)
            if (student) {
                allStudents.push(student)
            }
        }

        return result.status(200).json(allStudents);
    } catch (error) {
        console.debug(`Error: ${error}`)
        return result.status(500).json(error)
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
    } catch (error) {
        return result.status(500).json({ error });
    }
})

module.exports = {
    createGroup,
    getAllGroups,
    getGroup,
    searchGroups,
    updateGroup,
    deleteGroup,
    joinGroup,
    leaveGroup,
    getStudentsFromGroup,
    getMessages
}
