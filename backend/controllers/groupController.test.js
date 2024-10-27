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
        // await mongoose.connection.db.dropDatabase();
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
        expect(group.name).toBe("Test Group")

        // Remove the created group
        Group.findByIdAndDelete(_id)
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
        const { _id, group } = createResponse.body;
        
        // TEST: Make sure the group was created
        expect(createResponse.status).toBe(201)
        
        // Attempt to grab the newly created group
        const getResponse = await request(app)
        .get(`${serverAddress}/api/group/${_id}`);
        
        console.log(JSON.stringify(getResponse.body))
        
        expect(getResponse.statusCode).toBe(200);
        expect(getResponse.body.name).toBe('JEST Test Group');
        
        Group.findByIdAndDelete(_id)
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
