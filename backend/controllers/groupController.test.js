const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const Group = require('../models/GroupModel');
const Student = require('../models/StudentModel');
const errorHandler = require("../middleware/errorMiddleware");
const connectDB = require("../config/db");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/group", require("../routes/groupRoutes"));
app.use("/api/student", require("../routes/studentRoutes"));
app.use("/api/messages", require("../routes/messageRoutes"));
app.use("/api/meeting", require("../routes/meetingRoutes"));
// app.use(errorHandler);

describe('Group Controller', () => {
    const serverAddress = `http://localhost:${process.env.EXPRESS_PORT}`
    let testGroupID = null;
    let testStudentID = null;
    let testMessageID = null;
    let server = null;

    beforeAll(async () => {
        await connectDB();

        server = app.listen(process.env.EXPRESS_PORT, () => {
            console.log(`Server started on port ${process.env.EXPRESS_PORT}`);
        });

        console.debug(`Using server address: ${serverAddress}`);

        // Create the test user using the API
        const studentResponse = await request(`${serverAddress}/api/student`).post('/').send({
            firstName: "Test",
            lastName: "User",
            school: "Northern Arizona University",
            displayName: "TEST USER",
            username: "testuser",
            email: "test.user@test.user",
            password: "password123",
            major: "Computer Science",
        });

        // Bail if the student wasn't created
        if (studentResponse.statusCode != 201) {
            console.error("Failed to create test student");
            console.error(studentResponse.body);

            // Display some debug information
            console.debug(`Server address: ${serverAddress}`);
            console.debug(`Student response: ${JSON.stringify(studentResponse)}`);

            process.exit(1);
        }

        testStudentID = studentResponse.body._id;

        // Create the test message using the API
        const messageResponse = await request(`${serverAddress}/api/messages`).post('/').send({
            groupID: testGroupID,
            studentID: testStudentID,
            message: "Hello world"
        });

        // Bail if the message wasn't created
        if (messageResponse.statusCode != 201) {
            console.error("Failed to create test message");
            console.error(messageResponse.body);

            // Display some debug information
            console.debug(`Server address: ${serverAddress}`);
            console.debug(`Message response: ${JSON.stringify(messageResponse)}`);

            process.exit(1);
        }

        testMessageID = messageResponse.body._id;
    });

    afterAll(async () => {
        // Delete the test user using the API
        const studentResponse = await request(`${serverAddress}/api/student`).delete(`/${testStudentID}`);

        // Warn if the student wasn't deleted
        if (studentResponse.statusCode != 200) {
            console.warn("Failed to delete test student");
            console.warn(studentResponse.body);
        }

        // Delete the test message using the API
        const messageResponse = await request(`${serverAddress}/api/messages`).delete(`/${testMessageID}`);

        // Warn if the message wasn't deleted
        if (messageResponse.statusCode != 200) {
            console.warn("Failed to delete test message");
            console.warn(messageResponse.body);
        }

        await mongoose.connection.close();
    });

    // Test createGroup
    test('should create a group', async () => {
        // Send the post request
        const response = await request(`${serverAddress}/api/group`).put('/').send({
            name: "JEST Test group",
            description: "This is a test",
            courses: "CS386",
            majors: "Computer Science",
            ownerID: testStudentID,
            profilePictureID: null
        });

        const { _id, group } = response.body;
        testGroupID = _id;

        // TEST: Make sure we get a good status code
        expect(response.status).toBe(201)

        // TEST: Make sure the group was created
        expect(group.name).toBe("JEST Test group")
    });

    // Test getAllGroups
    test('should get all groups', async () => {
        // Send the get request
        const response = await request(`${serverAddress}/api/group`).get('/');

        // TEST: Make sure we get a good status code
        expect(response.statusCode).toBe(200);

        // TEST: Make sure we get an array back
        expect(Array.isArray(response.body)).toBe(true);

        // TEST: Make sure the group we created is in the array
        //TODO: correctly find the group we created
        expect(response.body).toContain('JEST Test Group');
    });
    
    // Test getGroup
    test('should get a group', async () => {
        // Get the group we created
        const response = await request(`${serverAddress}/api/group`).get(`/${testGroupID}`);
 
        // TEST: Make sure that we got the group back
        expect(response.statusCode).toBe(200);
        // TEST: Make sure the group's name is the same as the one we created
        expect(response.body.name).toBe('JEST Test Group');
    });
    
    // Test updateGroup
    test('should update a group', async () => {
        const updatedName = "JEST Test Group (Updated)";
        const updatedDescription = "This is an updated test";

        // Send the put request
        const response = await request(`${serverAddress}/api/group`).post(`/${testGroupID}`).send({
            name: updatedName,
            description: updatedDescription
        })

        // TEST: Make sure we get a good status code
        expect(response.statusCode).toBe(200);

        // TEST: Make sure the group was updated
        expect(response.body.name).toBe(updatedName);
        expect(response.body.description).toBe(updatedDescription);
    });

    // Test searchGroups
    test('should search for groups', async () => {
        // Send the get request
        const response = await request(`${serverAddress}/api/group`).get('/search/JEST');

        // TEST: Make sure we get a good status code
        expect(response.statusCode).toBe(200);

        // TEST: Make sure we get an array back
        expect(Array.isArray(response.body)).toBe(true);

        // TEST: Make sure the group we created is in the array
        expect(response.body).toContain('JEST Test Group');
    });

    // Test joinGroup
    test('should join a group', async () => {
        // Send the put request
        const response = await request(`${serverAddress}/api/group`).post(`/${testGroupID}/join`).send({
            testStudentID
        })

        const { group } = response.body;

        // Get the updated student
        const updatedStudentResponse = await request(`${serverAddress}/api/student`).get(`/${studentID}`);
        const updatedStudent = updatedStudentResponse.body;

        // TEST: Make sure we get a good status code
        expect(response.statusCode).toBe(200);

        // TEST: Make sure the student was added to the group
        expect(group.students).toContain(testStudentID);

        // TEST: Make sure the group was added to the student
        expect(updatedStudent.groups).toContain(testGroupID);
    });

    // Test getStudentsFromGroup
    test('should get students from a group', async () => {
        // Send the get request
        const response = await request(`${serverAddress}/api/group`).get(`/${testGroupID}/students`);

        // TEST: Make sure we get a good status code
        expect(response.statusCode).toBe(200);

        // TEST: Make sure we get an array back
        expect(Array.isArray(response.body)).toBe(true);

        // TEST: Make sure the student we added is in the array
        expect(response.body).toContain(testStudentID);
    });

    // Test leaveGroup
    test('should leave a group', async () => {
        // Send the delete request
        const response = await request(`${serverAddress}/api/group`).delete(`/${testGroupID}/leave`).send({
            testStudentID
        })

        const { group } = response.body;

        // Get the updated student
        const updatedStudentResponse = await request(`${serverAddress}/api/student`).get(`/${studentID}`);
        const updatedStudent = updatedStudentResponse.body;

        // TEST: Make sure we get a good status code
        expect(response.statusCode).toBe(200);

        // TEST: Make sure the student was removed from the group
        expect(group.students).not.toContain(testStudentID);

        // TEST: Make sure the group was removed from the student
        expect(updatedStudent.groups).not.toContain(testGroupID);
    });

    // Test getMessages
    test('should get messages of a group', async () => {
        const testMessage = "Hello world"

        // Create a mock group
        const createGroupResponse = await request(`${serverAddress}/api/group`).put('/').send({
            name: "JEST Test group",
            description: "This is a test",
            courses: "CS386",
            majors: "Computer Science",
            ownerID: testStudentID,
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

    // Test deleteGroup
    test('should delete a group', async () => {
        // Send the delete request
        const response = await request(`${serverAddress}/api/group`).delete(`/${testGroupID}`);

        // Attempt to get the group
        const getGroupResponse = await request(`${serverAddress}/api/group`).get(`/${testGroupID}`);

        // TEST: Make sure we get a good status code
        expect(response.statusCode).toBe(200);

        // TEST: Make sure the group was deleted
        expect(response.body).toBe('Group deleted');

        // TEST: Make sure the group is no longer in the database
        expect(getGroupResponse.statusCode).toBe(404);
    });
});
