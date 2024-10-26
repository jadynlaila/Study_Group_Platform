const { sendMessage } = require('./messageController');
const Message = require('../models/MessageModel');
const Group = require('../models/GroupModel');
const httpMocks = require('node-mocks-http');
const mongoose = require('mongoose');
// const { sendMessage, deleteMessage } = require('./messageController');

jest.mock('../models/MessageModel');
jest.mock('../models/GroupModel');

describe('sendMessage', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        req.student = { _id: mongoose.Types.ObjectId() };
        req.body = { message: 'Test message' };
        req.params = { id: mongoose.Types.ObjectId() };
    });

    it('should return 500 if group chat does not exist', async () => {
        Group.findOne.mockResolvedValue(null);

        await sendMessage(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ error: "Group chat doesn't exist" });
    });

    it('should create and save a new message', async () => {
        const groupChat = { 
            _id: mongoose.Types.ObjectId(), 
            participants: [req.student._id, req.params.id], 
            messages: [], 
            save: jest.fn() 
        };
        Group.findOne.mockResolvedValue(groupChat);

        const newMessage = { 
            _id: mongoose.Types.ObjectId(), 
            content: req.body.message, 
            sender: req.student._id, 
            group: req.params.id, 
            save: jest.fn().mockResolvedValue(true) 
        };
        Message.mockImplementation(() => newMessage);

        await sendMessage(req, res);

        expect(Message).toHaveBeenCalledWith({
            content: req.body.message,
            sender: req.student._id,
            group: req.params.id,
        });
        expect(newMessage.save).toHaveBeenCalled();
        expect(groupChat.messages).toContain(newMessage._id);
        expect(groupChat.save).toHaveBeenCalled();
        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toEqual(newMessage);
    });

    it('should return 500 if there is an error', async () => {
        Group.findOne.mockRejectedValue(new Error('Database error'));

        await sendMessage(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ error: "Internal server error" });
    });

    jest.mock('../models/MessageModel');
    jest.mock('../models/GroupModel');

    describe('sendMessage', () => {
        let req, res;

        beforeEach(() => {
            req = httpMocks.createRequest();
            res = httpMocks.createResponse();
            req.student = { _id: mongoose.Types.ObjectId() };
            req.body = { message: 'Test message' };
            req.params = { id: mongoose.Types.ObjectId() };
        });

        it('should return 500 if group chat does not exist', async () => {
            Group.findOne.mockResolvedValue(null);

            await sendMessage(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ error: "Group chat doesn't exist" });
        });

        it('should create and save a new message', async () => {
            const groupChat = { 
                _id: mongoose.Types.ObjectId(), 
                participants: [req.student._id, req.params.id], 
                messages: [], 
                save: jest.fn() 
            };
            Group.findOne.mockResolvedValue(groupChat);

            const newMessage = { 
                _id: mongoose.Types.ObjectId(), 
                content: req.body.message, 
                sender: req.student._id, 
                group: req.params.id, 
                save: jest.fn().mockResolvedValue(true) 
            };
            Message.mockImplementation(() => newMessage);

            await sendMessage(req, res);

            expect(Message).toHaveBeenCalledWith({
                content: req.body.message,
                sender: req.student._id,
                group: req.params.id,
            });
            expect(newMessage.save).toHaveBeenCalled();
            expect(groupChat.messages).toContain(newMessage._id);
            expect(groupChat.save).toHaveBeenCalled();
            expect(res.statusCode).toBe(201);
            expect(res._getJSONData()).toEqual(newMessage);
        });

        it('should return 500 if there is an error', async () => {
            Group.findOne.mockRejectedValue(new Error('Database error'));

            await sendMessage(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ error: "Internal server error" });
        });
    });

    describe('deleteMessage', () => {
        let req, res;

        beforeEach(() => {
            req = httpMocks.createRequest();
            res = httpMocks.createResponse();
            req.student = { _id: mongoose.Types.ObjectId() };
            req.params = { id: mongoose.Types.ObjectId() };
        });

        it('should return 404 if message does not exist', async () => {
            Message.findById.mockResolvedValue(null);

            await deleteMessage(req, res);

            expect(res.statusCode).toBe(404);
            expect(res._getJSONData()).toEqual({ error: 'Message not found' });
        });

        it('should return 403 if user is not the sender', async () => {
            const message = {
                _id: req.params.id,
                author: mongoose.Types.ObjectId(),
                group: mongoose.Types.ObjectId(),
            };
            Message.findById.mockResolvedValue(message);

            await deleteMessage(req, res);

            expect(res.statusCode).toBe(403);
            expect(res._getJSONData()).toEqual({ error: 'You do not have permission to delete this message' });
        });

        it('should delete the message if user is the sender', async () => {
            const message = {
                _id: req.params.id,
                author: req.student._id,
                group: mongoose.Types.ObjectId(),
                remove: jest.fn().mockResolvedValue(true),
            };
            Message.findById.mockResolvedValue(message);

            Group.updateOne.mockResolvedValue({ nModified: 1 });

            await deleteMessage(req, res);

            expect(Group.updateOne).toHaveBeenCalledWith(
                { _id: message.group },
                { $pull: { messages: req.params.id } }
            );
            expect(message.remove).toHaveBeenCalled();
            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual({ message: 'Message deleted successfully' });
        });

        it('should return 500 if there is an error', async () => {
            Message.findById.mockRejectedValue(new Error('Database error'));

            await deleteMessage(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ error: 'Internal server error' });
        });
    });
});