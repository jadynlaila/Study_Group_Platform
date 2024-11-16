const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const Meeting = require('../models/MeetingModel');
const Group = require('../models/GroupModel');
const Student = require('../models/StudentModel');
const DB = require('../db');

const app = express();

const serverAddress = `http://localhost:${process.env.PORT}`
let studentID = null;
let groupID = null;
let meetingID = null;

describe('Meeting Controller', () => {
    beforeAll(async () => {
        const url = process.env.MONGO_URI;
        await mongoose.connect(url);

        // Create a test user
        const response = await request(`${serverAddress}/api/student`).put('/').send({
            firstName: "JEST",
            lastName: "Test User",
            school: "JEST University",
            displayName: "JEST Test User",
            username: "jest",
            email: "jest@test.test",
            password: "password",
            groups: [],
            profilePicURL: null
        });

        // check if the student was created
        expect(response.status).toBe(201);

        const { student } = response.body;
        studentID = student._id;

        // Create a test group
        const groupResponse = await request(`${serverAddress}/api/group`).put('/').send({
            name: "JEST Test Group",
            description: "This is a test",
            courses: "CS386",
            majors: "Computer Science",
            ownerID: studentID,
            profilePictureID: null
        });
    });

    afterAll(async () => {
        // delete the test group
        const groupResponse = await request(`${serverAddress}/api/group`).delete(`/${groupID}`);
        const studentResponse = await request(`${serverAddress}/api/student`).delete(`/${studentID}`);

        // validate the deletion
        expect(groupResponse.status).toBe(200);
        expect(studentResponse.status).toBe(200);

        await mongoose.connection.close();
    });

    test('should create a meeting', async () => {
        // Send the post request
        const response = await request(`${serverAddress}/api/meeting`).put('/').send({
            name: "JEST Test meeting",
            description: "This is a test",
            start: new Date(),
            end: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hour from now
            creatorID: studentID,
            location: "Zoom"
        });

        const { _id, meeting } = response.body;
        meetingID = _id;

        expect(response.status).toBe(201)
        expect(meeting.name).toBe("JEST Test meeting")
        expect(meeting.creatorID).toBe(studentID)
        expect(meeting.location).toBe("Zoom")
        expect(meeting.description).toBe("This is a test")
    });

    test('should get a meeting', async () => {
        // Send the get request
        const getResponse = await request(`${serverAddress}/api/meeting`).get(`${meetingID}`);
        const { meeting } = getResponse.body;

        expect(getResponse.status).toBe(200)
        expect(meeting.name).toBe("JEST Test meeting")
        expect(meeting.creatorID).toBe(studentID)
        expect(meeting.location).toBe("Zoom")
        expect(meeting.description).toBe("This is a test")
    });

    test('should update a meeting', async () => {
        // Send the post request
        const response = await request(`${serverAddress}/api/meeting`).post(`/${meetingID}`).send({
            name: "JEST Test meeting updated",
            description: "This is a test updated",
            end: new Date(new Date().getTime() + 120 * 60 * 1000), // 2 hours from now
            location: "Google Meet"
        });

        const { meeting } = response.body;

        // Validate the response
        expect(response.status).toBe(200)
        expect(meeting.name).toBe("JEST Test meeting updated")
        expect(meeting.creatorID).toBe(studentID)
        expect(meeting.location).toBe("Google Meet")
        expect(meeting.description).toBe("This is a test updated")
    });

    test('should delete a meeting', async () => {
        // Send the delete request
        const response = await request(`${serverAddress}/api/meeting`).delete(`/${meetingID}`);

        // Validate the response
        expect(response.status).toBe(200)
    });

});