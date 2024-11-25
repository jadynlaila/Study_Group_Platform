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

const sampleMeetingData = {
    name: "Test Meeting",
    description: "A test meeting",
    start: new Date(),
    end: new Date(new Date().getTime() + 2 * 60 * 60 * 1000), // 2 hours in the future
    creatorID: null,
}

describe('Meeting Controller', () => {
    const serverAddress = `http://localhost:${process.env.EXPRESS_PORT}`;

    // Test createMeeting
    test('should create a meeting', async () => {
        // Create a sample student
        let studentData = { ...sampleStudentData };
        studentData.username = "testuser_createMeeting";
        studentData.email = "createMeeting@test.user"

        let studentID;

        // Create the student
        const studentResponse = await request(`${serverAddress}/api/student`).post('/').send(studentData);
        studentID = studentResponse.body._id;
        
        if (studentResponse.status != 201) {
            console.error("Failed to create student: " + studentResponse.body.error);
            console.error(studentResponse.body);
        }

        if (studentID == null || studentID == undefined) {
            console.error("Because the student ID is null, we can't continue with the test");
            expect(true).toBe(false);   // force the test to fail
        }
        
        // Create the test group
        let groupData = { ...sampleGroupData };
        groupData.ownerID = studentID;
        console.debug(groupData)
        
        const groupResponse = await request(`${serverAddress}/api/group`).post('/').send(groupData);

        const { groupID, group } = groupResponse.body;

        if (groupResponse.status != 201) {
            console.error(groupResponse.body.error);
        }

        // Create the meeting
        const meetingData = { ...sampleMeetingData };
        meetingData.creatorID = studentID;

        const meetingResponse = await request(`${serverAddress}/api/group`).put(`/${groupID}/meetings`).send(meetingData);
        const meetingID = meetingResponse.body._id;

        // Delete the data
        await request(`${serverAddress}/api/group`).delete(`/${groupID}`);
        await request(`${serverAddress}/api/student`).delete(`/${studentID}`);
        await request(`${serverAddress}/api/meeting`).delete(`/${meetingID}`);

        // Run the tests
        expect(meetingResponse.statusCode).toBe(201);
        expect(meetingResponse.body).toHaveProperty('_id');
        expect(meetingResponse.body).toHaveProperty('group', groupID);
        expect(meetingResponse.body).toHaveProperty('name', "Test Meeting");
        expect(meetingResponse.body).toHaveProperty('description', "A test meeting");
        expect(meetingResponse.body).toHaveProperty('start');
        expect(meetingResponse.body).toHaveProperty('end');
        expect(meetingResponse.body).toHaveProperty('creatorID', studentID);
    });

    // Test getOneMeeting
    test('should get a meeting', async () => {
        // Send the get request
        const response = await request(`${serverAddress}/api/meeting`).get(`/${testGroupID}`);

        // Check the response
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', testGroupID);
        expect(response.body).toHaveProperty('group', testGroupID);
        expect(response.body).toHaveProperty('title', "Test Meeting");
        expect(response.body).toHaveProperty('description', "A test meeting");
        expect(response.body).toHaveProperty('date');
        expect(response.body).toHaveProperty('location', "Test Location");
    });

    // Test getAllMeetings
    test('should get all meetings', async () => {
        // Send the get request
        const response = await request(`${serverAddress}/api/meeting`).get('/');

        // Check the response
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // Test getMeetings
    test('should get all meetings for a group', async () => {
        // Send the get request
        const response = await request(`${serverAddress}/api/meeting`).get(`/group/${testGroupID}`);

        // Check the response
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('group', testGroupID);
    });

    // Test updateMeeting
    test('should update a meeting', async () => {
        // Send the put request
        const response = await request(`${serverAddress}/api/meeting`).post(`/${testGroupID}`).send({
            title: "Updated Meeting",
            description: "An updated meeting",
            date: new Date(),
            location: "Updated Location"
        });

        // Check the response
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', testGroupID);
        expect(response.body).toHaveProperty('group', testGroupID);
        expect(response.body).toHaveProperty('title', "Updated Meeting");
        expect(response.body).toHaveProperty('description', "An updated meeting");
        expect(response.body).toHaveProperty('date');
        expect(response.body).toHaveProperty('location', "Updated Location");
    });

    // Test deleteMeeting
    test('should delete a meeting', async () => {
        // Send the delete request
        const response = await request(`${serverAddress}/api/meeting`).delete(`/${testGroupID}`);

        // Check the response
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', testGroupID);
        expect(response.body).toHaveProperty('group', testGroupID);
        expect(response.body).toHaveProperty('title', "Updated Meeting");
        expect(response.body).toHaveProperty('description', "An updated meeting");
        expect(response.body).toHaveProperty('date');
        expect(response.body).toHaveProperty('location', "Updated Location");
    });
})