const request = require('supertest');
require('dotenv').config();

describe('sendMessage', () => {
    const serverAddress = `localhost:${process.env.EXPRESS_PORT}`;
    let testGroupID = null;
    let testStudentID = null;

    beforeAll(async () => {
        // Create a test student using the API
        const studentResponse = await request(`${serverAddress}/api/student`).post('/').send({
            firstName: "Test",
            lastName: "User",
            school: "Northern Arizona University",
            displayName: "TEST USER",
            username: "testuser_messagecontroller",
            email: "test.user@message.controller",
            password: "password123",
            major: "Computer Science"
        });

        // Bail if the student wasn't created
        if (studentResponse.statusCode != 201) {
            console.error("Failed to create test student");
            console.error(studentResponse.body);
            process.exit(1);
        }

        testStudentID = studentResponse.body._id;

        // Create a test group using the API
        const groupResponse = await request(`${serverAddress}/api/group`).post('/').send({
            name: "Test Group",
            description: "A test group",
            members: [testStudentID]
        });

        // Bail if the group wasn't created
        if (groupResponse.statusCode != 201) {
            console.error("Failed to create test group");
            console.error(groupResponse.body);
            process.exit(1);
        }
    });

    afterAll(async () => {
        // Delete the test student and group using the API
        const groupDeleteResponse = await request(`${serverAddress}/api/message`).delete(`/api/group/${testGroupID}`);
        const studentDeleteResponse = await request(`${serverAddress}/api/message`).delete(`/api/student/${testStudentID}`);

        // Warn if the student wasn't deleted
        if (studentDeleteResponse.statusCode != 200) {
            console.error("Failed to delete test student");
            console.error(studentDeleteResponse.body);
        }

        // Warn if the group wasn't deleted
        if (groupDeleteResponse.statusCode != 200) {
            console.error("Failed to delete test group");
            console.error(groupDeleteResponse.body);
        }
    });

    // Test sendMessage
    it('should send a message', async () => {
        const response = await request(`${serverAddress}/api/message`).post('/').send({
            groupID: testGroupID,
            studentID: testStudentID,
            message: "Hello, world!"
        });

        expect(response.statusCode).toEqual(201);
        expect(response.body.content).toEqual("Hello, world!");
        expect(response.body.author).toEqual(testStudentID);
        expect(response.body.groupID).toEqual(testGroupID);
    });

    // Test getMessage
    it('should get a message', async () => {
        const response = await request(`${serverAddress}/api/message`).get(`/${testMessageID}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body.content).toEqual("Hello, world!");
        expect(response.body.author).toEqual(testStudentID);
        expect(response.body.groupID).toEqual(testGroupID);
    });

    // Test deleteMessage
    it('should delete a message', async () => {
        const response = await request(app).delete('/api/messages').send({
            messageID: testMessageID,
            senderID: testStudentID
        });

        expect(response.statusCode).toEqual(200);
        expect(response.body.content).toEqual("Hello, world!");
        expect(response.body.author).toEqual(testStudentID);
        expect(response.body.groupID).toEqual(testGroupID);
    });
        
});