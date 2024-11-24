const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const Group = require('../models/GroupModel');
const Student = require('../models/StudentModel');
const connectDB = require("../config/db");

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/group", require("../routes/groupRoutes"));
app.use("/api/student", require("../routes/studentRoutes"));
app.use("/api/messages", require("../routes/messageRoutes"));
app.use("/api/meeting", require("../routes/meetingRoutes"));

describe('Meeting Controller', () => {
    const serverAddress = `localhost:${process.env.EXPRESS_PORT}`;
    let testGroupID = null;
    let testStudentID = null;

    beforeAll(async () => {
        // Create the test user using the API
        const studentResponse = await request(`${serverAddress}/api/student`).post('/').send({
            firstName: "Test",
            lastName: "User",
            school: "Northern Arizona University",
            displayName: "TEST USER",
            username: "testuser_meetingcontroller",
            email: "test.user@meeting.controller",
            password: "password123",
            major: "Computer Science"
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

        // Create the test group using the API
        const groupResponse = await request(`${serverAddress}/api/group`).post('/').send({
            name: "Test Group",
            description: "A test group",
            members: [testStudentID]
        });

        // Bail if the group wasn't created
        if (groupResponse.statusCode != 201) {
            console.error("Failed to create test group");
            console.error(groupResponse.body);

            // Display some debug information
            console.debug(`Server address: ${serverAddress}`);
            console.debug(`Group response: ${JSON.stringify(groupResponse)}`);

            process.exit(1);
        }
    });

    // Test createMeeting
    test('should create a meeting', async () => {
        // Send the post request
        const response = await request(`${serverAddress}/api/meeting`).put('/').send({
            group: testGroupID,
            title: "Test Meeting",
            description: "A test meeting",
            date: new Date(),
            location: "Test Location"
        });

        // Check the response
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('group', testGroupID);
        expect(response.body).toHaveProperty('title', "Test Meeting");
        expect(response.body).toHaveProperty('description', "A test meeting");
        expect(response.body).toHaveProperty('date');
        expect(response.body).toHaveProperty('location', "Test Location");

        // Save the test group ID
        testGroupID = response.body._id;
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