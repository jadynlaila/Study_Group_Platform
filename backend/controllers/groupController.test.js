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
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    const serverAddress = `http://localhost:${process.env.PORT}`
    const studentID = "6715f0b32d87f2dadfb736fa";
    let groupID;

    test('should create a group', async () => {
        // Send the post request
        const response = await request(`${serverAddress}/api/group`).put('/').send({
            name: "Test Group",
            description: "This is a test",
            courses: "CS386",
            majors: "Computer Science",
            ownerID: studentID,
            profilePictureID: null
        });

        const { name, _id } = response.body;

        groupID = _id

        expect(response.status).toBe(201)
        expect(name).toBe("Test Group")
    });

    test('should get a group', async () => {
        const response = await request(app)
            .get('/getGroup')
            .send({ groupID });

        console.log(JSON.stringify(response.body))

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Test Group');
    });

    // test('should update a group', async () => {
    //     const group = new Group({
    //         name: 'Test Group',
    //         description: 'A group for testing',
    //         courses: ['CS101'],
    //         majors: ['Computer Science'],
    //         memberLimit: 10,
    //         ownerID: studentID
    //     });
    //     await group.save();
    //     groupID = group._id;

    //     const response = await request(app)
    //         .put('/updateGroup')
    //         .send({
    //             groupID,
    //             name: 'Updated Group',
    //             description: 'An updated group for testing'
    //         });

    //     expect(response.status).toBe(200);
    //     expect(response.body.name).toBe('Updated Group');
    // });

    // test('should return 501 for deleteGroup', async () => {
    //     const response = await request(app)
    //         .delete('/deleteGroup')
    //         .send({ groupID });

    //     expect(response.status).toBe(501);
    // });

    // test('should join a group', async () => {
    //     const group = new Group({
    //         name: 'Test Group',
    //         description: 'A group for testing',
    //         courses: ['CS101'],
    //         majors: ['Computer Science'],
    //         memberLimit: 10,
    //         ownerID: studentID
    //     });
    //     await group.save();
    //     groupID = group._id;

    //     const response = await request(app)
    //         .post('/joinGroup')
    //         .send({ studentID, groupID });

    //     expect(response.status).toBe(201);
    //     expect(response.body.searchedGroup.memberIDs).toContain(studentID.toString());
    // });

    // test('should get messages of a group', async () => {
    //     await request(app).post('/createGroup').send({
    //         name: 'Test Group',
    //         description: 'A group for testing',
    //         courses: 'CS101',
    //         majors: 'Computer Science',
    //         memberLimit: 10,
    //         ownerID: studentID
    //     })
    //     await group.save();
    //     groupID = group._id;

    //     const response = await request(app)
    //         .get('/getMessages')
    //         .send({ groupID });

    //     expect(response.status).toBe(200);
    //     expect(response.body).toEqual([]);
    // });
});
