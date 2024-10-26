const request = require('supertest')
const express = require('express')
const mongoose = require('mongoose')
const { getGroup } = require('./groupController')
const Group = require('../models/GroupModel')
const Student = require('../models/StudentModel')

const app = express()
app.use(express.json())
app.post('/getGroup', getGroup)

jest.mock('../models/GroupModel')
jest.mock('../models/StudentModel')

describe('getGroup', () => {
    let server

    beforeAll(() => {
        server = app.listen(4000)
    })

    afterAll((done) => {
        mongoose.connection.close()
        server.close(done)
    })

    it('should return 400 if userID is not provided', async () => {
        const res = await request(app)
            .post('/getGroup')
            .send({ groupID: 'someGroupId' })

        expect(res.status).toBe(400)
        expect(res.body.error).toBe("Required parameter 'userID' not provided")
    })

    it('should return 400 if groupID is not provided', async () => {
        const res = await request(app)
            .post('/getGroup')
            .send({ userID: 'someUserId' })

        expect(res.status).toBe(400)
        expect(res.body.error).toBe("Required parameter 'groupID' not provided")
    })

    it('should return 403 if user is not found', async () => {
        Student.findById.mockResolvedValue(null)
        Group.findById.mockResolvedValue({ name: 'someGroup' })

        const res = await request(app)
            .post('/getGroup')
            .send({ userID: 'someUserId', groupID: 'someGroupId' })

        expect(res.status).toBe(403)
        expect(res.body.error).toBe(`Student with ID someUserId was not found`)
    })

    it('should return 403 if group is not found', async () => {
        Student.findById.mockResolvedValue({ username: 'someUser' })
        Group.findById.mockResolvedValue(null)

        const res = await request(app)
            .post('/getGroup')
            .send({ userID: 'someUserId', groupID: 'someGroupId' })

        expect(res.status).toBe(403)
        expect(res.body.error).toBe(`Student with ID someUserId was not found`)
    })

    it('should return 403 if user is not a member of the group', async () => {
        Student.findById.mockResolvedValue({ _id: 'someUserId', username: 'someUser' })
        Group.findById.mockResolvedValue({ name: 'someGroup', memberIDs: [] })

        const res = await request(app)
            .post('/getGroup')
            .send({ userID: 'someUserId', groupID: 'someGroupId' })

        expect(res.status).toBe(403)
        expect(res.body.error).toBe("User is not a member of the group")
    })

    it('should return 200 and the group object if all checks pass', async () => {
        const group = { name: 'someGroup', memberIDs: ['someUserId'] }
        Student.findById.mockResolvedValue({ _id: 'someUserId', username: 'someUser' })
        Group.findById.mockResolvedValue(group)

        const res = await request(app)
            .post('/getGroup')
            .send({ userID: 'someUserId', groupID: 'someGroupId' })

        expect(res.status).toBe(200)
        expect(res.body).toEqual(group)
    })

    it('should return 500 if an error occurs', async () => {
        Student.findById.mockRejectedValue(new Error('Some error'))

        const res = await request(app)
            .post('/getGroup')
            .send({ userID: 'someUserId', groupID: 'someGroupId' })

        expect(res.status).toBe(500)
        expect(res.body.error).toBeDefined()
    })
})