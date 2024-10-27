const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const Group = require('../models/GroupModel');
const Student = require('../models/StudentModel');

const app = express();

describe('Group Controller', () => {
    beforeAll(async () => {
        const url = process.env.MONGO_URI;
        await mongoose.connect(url);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    const serverAddress = `http://localhost:${process.env.PORT}`
    const studentID = "6715f0b32d87f2dadfb736fa";

    test('should create a group', async () => {
        // Send the post request
        const response = await request(`${serverAddress}/api/group`).put('/').send({
            name: "JEST Test group",
            description: "This is a test",
            courses: "CS386",
            majors: "Computer Science",
            ownerID: studentID,
            profilePictureID: null
        });

        const { _id, group } = response.body;

        expect(response.status).toBe(201)
        expect(group.name).toBe("JEST Test group")

        // Remove the created group
        await Group.findByIdAndDelete(_id)
    });
    
    test('should get a group', async () => {
        // Create the group first
        // Send the post request
        const createResponse = await request(`${serverAddress}/api/group`).put('/').send({
            name: "JEST Test Group",
            description: "This is a test",
            courses: "CS386",
            majors: "Computer Science",
            ownerID: studentID,
            profilePictureID: null
        });
        
        // Deconstruct the body of the response
        const { groupID, group } = createResponse.body;
        
        // TEST: Make sure the group was created
        expect(createResponse.status).toBe(201)
        
        // Attempt to grab the newly created group
        const getResponse = await request(`${serverAddress}/api/group`).get(`/`).send({ groupID })
        
        // TEST: Make sure that we got the group back
        expect(getResponse.statusCode).toBe(200);
        // TEST: Make sure the group's name is the same as the one we created
        expect(getResponse.body.name).toBe('JEST Test Group');
        
        await Group.findByIdAndDelete(groupID)
    });
    
    test('should update a group', async () => {
        const name = "JEST Test Group"
        const description = "This is a test"
        const courses = "CS386"
        const updatedCourses = "CS300"
        const majors = "Computer Science"
        const ownerID = studentID
        const profilePictureID = null

        // Create the group first
        // Send the put request
        const createResponse = await request(`${serverAddress}/api/group`).put('/').send({
            name, description, courses, majors, memberLimit: 6, ownerID, profilePictureID
        });
        
        // Deconstruct the body of the response
        const { groupID, group } = createResponse.body;
        
        // TEST: Make sure the group was created
        expect(createResponse.status).toBe(201)

        // Send an updated group
        // Send the post request
        const updateResponse = await request(`${serverAddress}/api/group`).post('/').send({
            groupID,
            courses: updatedCourses,
        })

        // TEST: make sure we get a good status code
        expect(updateResponse.statusCode).toBe(200)

        // Instead of using the response object, obtain the updated object from Mongo
        let searchedGroup = await Group.findById(groupID)

        console.log(`Old group: ${JSON.stringify(group)}`)
        console.log(`Updated group: ${searchedGroup}`)

        // TEST: make sure the group was updated
        expect(searchedGroup.courses).toBe("CS300")

        await Group.findByIdAndDelete(groupID)
    });

    test('should join a group', async () => {
        // Make sure there are no preexisting users
        const searchedStudent = await Student.findOne({email: "testuser@example.com"})
        if (searchedStudent) {
            // console.log(JSON.stringify(searchedStudent))
            console.log(`FOUND PREEXISTING USER, DELETING NOW: ${searchedStudent._id}`)
            await Student.findByIdAndDelete(searchedStudent._id)
        }

        // Create a sample user
        const newStudent = new Student({
            firstName: "Test",
            lastName: "User",
            school: "Northern Arizona University",
            displayName: "TEST USER (Join Group)",
            username: "testuser_joingroup",
            email: "testuser@example.com",
            password: "password123",
            groups: [],
            profilePicURL: null
        });
        const savedStudent = await newStudent.save();

        console.log(`Student ID: ${savedStudent._id}`)

        // Create the group
        // Send the post request
        const response = await request(`${serverAddress}/api/group`).put('/').send({
            name: "JEST Test group",
            description: "This is a test",
            courses: "CS386",
            majors: "Computer Science",
            ownerID: studentID,
            profilePictureID: null
        });

        const { groupID, group } = response.body;

        console.log(`Target group ID: ${groupID}`)

        expect(response.status).toBe(201)
        expect(group.name).toBe("JEST Test group")

        // Have the student join the group
        const joinResponse = await request(`${serverAddress}/api/group`).put(`/join/${groupID}`).send({
            studentID: savedStudent._id
        })

        const { group: joinedGroup, student: joinedStudent } = joinResponse.body;

        // Print the error if it did error out
        if (joinResponse.statusCode != 201) {
            console.debug(JSON.stringify(joinResponse.body))
        }

        console.debug(JSON.stringify(joinResponse.body))

        // TEST: Make sure the status code is correct
        expect(joinResponse.statusCode).toBe(201)
        
        // TEST: Make sure the student has the correct groupID
        expect(joinedStudent.groups).toContain(joinedGroup._id);

        // TEST: Make sure the group contains the studentID
        expect(joinedGroup.memberIDs).toContain(joinedStudent._id);

        // Remove the created group and student
        await Student.findByIdAndDelete(joinedStudent._id)
        await Group.findByIdAndDelete(joinedGroup._id)
    });

    test('should get messages of a group', async () => {
        const testMessage = "Hello world"

        // Create a mock group
        const createGroupResponse = await request(`${serverAddress}/api/group`).put('/').send({
            name: "JEST Test group",
            description: "This is a test",
            courses: "CS386",
            majors: "Computer Science",
            ownerID: studentID,
            profilePictureID: null
        });

        const { groupID, group } = createGroupResponse.body;

        console.debug(`groupID: ${groupID}`)

        expect(createGroupResponse.status).toBe(201)
        expect(group.name).toBe("JEST Test group")

        // Create the mock student
        // Create a sample user
        const newStudent = new Student({
            firstName: "Test",
            lastName: "User",
            school: "Northern Arizona University",
            displayName: "TEST USER (Join Group)",
            username: "testuser_joingroup",
            email: "testuser@example.com",
            password: "password123",
            groups: [],
            profilePicURL: null
        });
        const savedStudent = await newStudent.save();

        console.debug(`Student ID: ${savedStudent._id}`)

        // Create/Send the test message
        const sendMessageResponse = await request(`${serverAddress}/api/messages`).put('/').send({
            groupID,
            studentID: savedStudent._id,
            message: testMessage
        })

        if (sendMessageResponse.statusCode != 201)
            console.debug(sendMessageResponse.body)

        // TEST: Check if the message was sent successfully
        expect(sendMessageResponse.statusCode).toBe(201)

        // Check if the message ID was added to the group
        const messagesResponse = await request(`${serverAddress}/api/group`).get(`/messages/${groupID}`)
        const messages = messagesResponse.body

        console.debug(JSON.stringify(messagesResponse.body))
        console.debug(`Data type of messages: ${typeof messages}`);

        expect(messages[0].content).toBe(testMessage)

        // Remove the created group and student
        await Group.findByIdAndDelete(groupID)
        await Student.findByIdAndDelete(savedStudent._id)
    });
});
