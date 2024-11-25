const request = require('supertest');
require('dotenv').config();

// Sample data
const sampleStudentData = {
    firstName: "Test",
    lastName: "User",
    school: "Northern Arizona University",
    displayName: "TEST USER",
    username: null,
    email: null,
    password: "password123",
    major: "Computer Science"
};

const sampleGroupData = {
    name: "JEST Test Group",
    description: "This is a test",
    courses: "CS386",
    majors: "Computer Science",
    memberLimit: 10,
    ownerID: null,
    profilePictureID: null
};

const sampleMessageData = {
    groupID: null,
    studentID: null,
    message: "Hello world"
};

describe('messageController', () => {
    const serverAddress = `localhost:${process.env.EXPRESS_PORT}`;

    // Test sendMessage
    it('should send a message', async () => {
        // Create a sample student
        let studentData = { ...sampleStudentData };
        studentData.username = "testuser_sendMessage";
        studentData.email = "sendMessage@test.user"

        let studentID;

        // Create the student
        const studentResponse = await request(`${serverAddress}/api/student`).post('/').send(studentData);
        studentID = studentResponse.body._id;
        
        if (studentResponse.status != 201) {
            console.error("Failed to create FIRST student");
            console.debug(studentResponse.body);
        }

        if (studentID == null || studentID == undefined) {
            console.error("Because the FIRST student ID is null, we can't continue with the test");
            expect(true).toBe(false);   // force the test to fail
        }

        // Create the test group
        let groupData = { ...sampleGroupData };
        groupData.ownerID = studentID;

        const groupResponse = await request(`${serverAddress}/api/group`).post('/').send(groupData);
        const groupID = groupResponse.body.groupID;

        if (groupResponse.status != 201) {
            console.error("Failed to create group");
        }

        // Create the message data
        let messageData = { ...sampleMessageData };
        messageData.groupID = groupID;
        messageData.studentID = studentID;

        const response = await request(`${serverAddress}/api/message`).post('/').send(messageData);
        const messageID = response.body._id;

        // Remove the sample data
        await request(`${serverAddress}/api/group`).delete(`/${groupID}`);
        await request(`${serverAddress}/api/student`).delete(`/${studentID}`);
        await request(`${serverAddress}/api/message`).delete(`/${messageID}`);

        expect(response.statusCode).toEqual(201);
        expect(response.body.content).toEqual(sampleMessageData.message);
        expect(response.body.author).toEqual(studentID);
        expect(response.body.groupID).toEqual(groupID);
    });

    // Test getMessage
    it('should get a message', async () => {
        // Create a sample student
        let studentData = { ...sampleStudentData };
        studentData.username = "testuser_getMessage";
        studentData.email = "getMessage@test.user"

        let studentID;

        // Create the student
        const studentResponse = await request(`${serverAddress}/api/student`).post('/').send(studentData);
        studentID = studentResponse.body._id;
        
        if (studentResponse.status != 201) {
            console.error("Failed to create FIRST student");
            console.debug(studentResponse.body);
        }

        if (studentID == null || studentID == undefined) {
            console.error("Because the FIRST student ID is null, we can't continue with the test");
            expect(true).toBe(false);   // force the test to fail
        }

        // Create the test group
        let groupData = { ...sampleGroupData };
        groupData.ownerID = studentID;

        const groupResponse = await request(`${serverAddress}/api/group`).post('/').send(groupData);
        const groupID = groupResponse.body.groupID;

        if (groupResponse.status != 201) {
            console.error("Failed to create group");
        }

        // Create the message data
        let messageData = { ...sampleMessageData };
        messageData.groupID = groupID;
        messageData.studentID = studentID;

        const messageResponse = await request(`${serverAddress}/api/message`).post('/').send(messageData);
        const createMessageID = messageResponse.body._id;

        // Get the message via the API
        const response = await request(`${serverAddress}/api/message`).get(`/${createMessageID}`);
        const messageID = response.body._id;

        // Remove the sample data
        await request(`${serverAddress}/api/group`).delete(`/${groupID}`);
        await request(`${serverAddress}/api/student`).delete(`/${studentID}`);
        await request(`${serverAddress}/api/message`).delete(`/${messageID}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body.content).toEqual(sampleMessageData.message);
    });

    // Test deleteMessage
    it('should delete a message', async () => {
        // Create a sample student
        let studentData = { ...sampleStudentData };
        studentData.username = "testuser_deleteMessage";
        studentData.email = "deleteMessage@test.user"

        let studentID;

        // Create the student
        const studentResponse = await request(`${serverAddress}/api/student`).post('/').send(studentData);
        studentID = studentResponse.body._id;
        
        if (studentResponse.status != 201) {
            console.error("Failed to create FIRST student");
            console.debug(studentResponse.body);
        }

        if (studentID == null || studentID == undefined) {
            console.error("Because the FIRST student ID is null, we can't continue with the test");
            expect(true).toBe(false);   // force the test to fail
        }

        // Create the test group
        let groupData = { ...sampleGroupData };
        groupData.ownerID = studentID;

        const groupResponse = await request(`${serverAddress}/api/group`).post('/').send(groupData);
        const groupID = groupResponse.body.groupID;

        if (groupResponse.status != 201) {
            console.error("Failed to create group");
        }

        // Create the message data
        let messageData = { ...sampleMessageData };
        messageData.groupID = groupID;
        messageData.studentID = studentID;

        const messageResponse = await request(`${serverAddress}/api/message`).post('/').send(messageData);
        const createMessageID = messageResponse.body._id;

        // Delete the message via the API
        const response = await request(`${serverAddress}/api/message`).delete(`/`).send({ messageID: createMessageID, senderID: studentID });

        // Remove the sample data
        await request(`${serverAddress}/api/group`).delete(`/${groupID}`);
        await request(`${serverAddress}/api/student`).delete(`/${studentID}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual('Message deleted successfully');
    });
        
});