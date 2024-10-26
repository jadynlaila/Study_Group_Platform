const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Student = require('../models/StudentModel');
const { getStudents, setStudent, updateStudent, deleteStudent } = require('./studentController');
const generateToken = require('../config/generateToken');

const app = express();
app.use(express.json());

app.get('/api/students', getStudents);

jest.mock('../models/StudentModel');

describe('GET /api/students', () => {
    it('should return a list of students', async () => {
        const mockStudents = [
            { _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
            { _id: '2', firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' }
        ];

        Student.find.mockResolvedValue(mockStudents);

        const res = await request(app).get('/api/students');

        expect(res.status).toBe(200);
        expect(res.body.students).toEqual(mockStudents);
    });

    it('should handle errors', async () => {
        Student.find.mockRejectedValue(new Error('Database error'));

        const res = await request(app).get('/api/students');

        expect(res.status).toBe(500);
        expect(res.body).toEqual({ message: 'Database error' });
    });

    const app = express();
    app.use(express.json());

    app.get('/api/students', getStudents);
    app.post('/api/students', setStudent);

    jest.mock('../models/StudentModel');
    jest.mock('../config/generateToken');

    describe('GET /api/students', () => {
        it('should return a list of students', async () => {
            const mockStudents = [
                { _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
                { _id: '2', firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' }
            ];

            Student.find.mockResolvedValue(mockStudents);

            const res = await request(app).get('/api/students');

            expect(res.status).toBe(200);
            expect(res.body.students).toEqual(mockStudents);
        });

        it('should handle errors', async () => {
            Student.find.mockRejectedValue(new Error('Database error'));

            const res = await request(app).get('/api/students');

            expect(res.status).toBe(500);
            expect(res.body).toEqual({ message: 'Database error' });
        });
    });

    describe('POST /api/students', () => {
        it('should create a new student', async () => {
            const newStudent = {
                firstName: 'John',
                lastName: 'Doe',
                school: 'Test School',
                displayName: 'JohnD',
                username: 'johndoe',
                email: 'john@example.com',
                password: 'password123',
                groups: [],
                profilePicURL: null
            };

            const savedStudent = {
                ...newStudent,
                _id: '1',
                profilePicURL: `https://avatar.iran.liara.run/username?username=JohnDoe`,
                token: 'fakeToken'
            };

            Student.findOne.mockResolvedValue(null);
            Student.prototype.save.mockResolvedValue(savedStudent);
            generateToken.mockReturnValue('fakeToken');

            const res = await request(app).post('/api/students').send(newStudent);

            expect(res.status).toBe(201);
            expect(res.body).toEqual(savedStudent);
        });

        it('should return 400 if required fields are missing', async () => {
            const newStudent = {
                firstName: 'John',
                lastName: 'Doe',
                school: 'Test School',
                displayName: 'JohnD',
                username: 'johndoe',
                email: 'john@example.com'
            };

            const res = await request(app).post('/api/students').send(newStudent);

            expect(res.status).toBe(400);
            expect(res.body).toEqual({ error: "Student has not entered all required fields" });
        });

        it('should return 401 if email is already in use', async () => {
            const newStudent = {
                firstName: 'John',
                lastName: 'Doe',
                school: 'Test School',
                displayName: 'JohnD',
                username: 'johndoe',
                email: 'john@example.com',
                password: 'password123',
                groups: [],
                profilePicURL: null
            };

            Student.findOne.mockResolvedValue(newStudent);

            const res = await request(app).post('/api/students').send(newStudent);

            expect(res.status).toBe(401);
            expect(res.text).toBe('Email already in use');
        });

        it('should return 401 if username is already taken', async () => {
            const newStudent = {
                firstName: 'John',
                lastName: 'Doe',
                school: 'Test School',
                displayName: 'JohnD',
                username: 'johndoe',
                email: 'john@example.com',
                password: 'password123',
                groups: [],
                profilePicURL: null
            };

            Student.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce(newStudent);

            const res = await request(app).post('/api/students').send(newStudent);

            expect(res.status).toBe(401);
            expect(res.text).toBe('Username taken');
        });

        it('should handle errors', async () => {
            const newStudent = {
                firstName: 'John',
                lastName: 'Doe',
                school: 'Test School',
                displayName: 'JohnD',
                username: 'johndoe',
                email: 'john@example.com',
                password: 'password123',
                groups: [],
                profilePicURL: null
            };

            Student.findOne.mockRejectedValue(new Error('Database error'));

            const res = await request(app).post('/api/students').send(newStudent);

            expect(res.status).toBe(500);
            expect(res.text).toBe('Error creating student');
        });

        const app = express();
        app.use(express.json());

        app.get('/api/students', getStudents);
        app.post('/api/students', setStudent);
        app.put('/api/students/:id', updateStudent);

        jest.mock('../models/StudentModel');
        jest.mock('../config/generateToken');

        describe('GET /api/students', () => {
            it('should return a list of students', async () => {
                const mockStudents = [
                    { _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
                    { _id: '2', firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' }
                ];

                Student.find.mockResolvedValue(mockStudents);

                const res = await request(app).get('/api/students');

                expect(res.status).toBe(200);
                expect(res.body.students).toEqual(mockStudents);
            });

            it('should handle errors', async () => {
                Student.find.mockRejectedValue(new Error('Database error'));

                const res = await request(app).get('/api/students');

                expect(res.status).toBe(500);
                expect(res.body).toEqual({ message: 'Database error' });
            });
        });

        describe('POST /api/students', () => {
            it('should create a new student', async () => {
                const newStudent = {
                    firstName: 'John',
                    lastName: 'Doe',
                    school: 'Test School',
                    displayName: 'JohnD',
                    username: 'johndoe',
                    email: 'john@example.com',
                    password: 'password123',
                    groups: [],
                    profilePicURL: null
                };

                const savedStudent = {
                    ...newStudent,
                    _id: '1',
                    profilePicURL: `https://avatar.iran.liara.run/username?username=JohnDoe`,
                    token: 'fakeToken'
                };

                Student.findOne.mockResolvedValue(null);
                Student.prototype.save.mockResolvedValue(savedStudent);
                generateToken.mockReturnValue('fakeToken');

                const res = await request(app).post('/api/students').send(newStudent);

                expect(res.status).toBe(201);
                expect(res.body).toEqual(savedStudent);
            });

            it('should return 400 if required fields are missing', async () => {
                const newStudent = {
                    firstName: 'John',
                    lastName: 'Doe',
                    school: 'Test School',
                    displayName: 'JohnD',
                    username: 'johndoe',
                    email: 'john@example.com'
                };

                const res = await request(app).post('/api/students').send(newStudent);

                expect(res.status).toBe(400);
                expect(res.body).toEqual({ error: "Student has not entered all required fields" });
            });

            it('should return 401 if email is already in use', async () => {
                const newStudent = {
                    firstName: 'John',
                    lastName: 'Doe',
                    school: 'Test School',
                    displayName: 'JohnD',
                    username: 'johndoe',
                    email: 'john@example.com',
                    password: 'password123',
                    groups: [],
                    profilePicURL: null
                };

                Student.findOne.mockResolvedValue(newStudent);

                const res = await request(app).post('/api/students').send(newStudent);

                expect(res.status).toBe(401);
                expect(res.text).toBe('Email already in use');
            });

            it('should return 401 if username is already taken', async () => {
                const newStudent = {
                    firstName: 'John',
                    lastName: 'Doe',
                    school: 'Test School',
                    displayName: 'JohnD',
                    username: 'johndoe',
                    email: 'john@example.com',
                    password: 'password123',
                    groups: [],
                    profilePicURL: null
                };

                Student.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce(newStudent);

                const res = await request(app).post('/api/students').send(newStudent);

                expect(res.status).toBe(401);
                expect(res.text).toBe('Username taken');
            });

            it('should handle errors', async () => {
                const newStudent = {
                    firstName: 'John',
                    lastName: 'Doe',
                    school: 'Test School',
                    displayName: 'JohnD',
                    username: 'johndoe',
                    email: 'john@example.com',
                    password: 'password123',
                    groups: [],
                    profilePicURL: null
                };

                Student.findOne.mockRejectedValue(new Error('Database error'));

                const res = await request(app).post('/api/students').send(newStudent);

                expect(res.status).toBe(500);
                expect(res.text).toBe('Error creating student');
            });
        });

        describe('PUT /api/students/:id', () => {
            it('should update an existing student', async () => {
                const studentId = '1';
                const updatedData = {
                    firstName: 'John',
                    lastName: 'Doe',
                    school: 'Updated School',
                    displayName: 'JohnDUpdated',
                    username: 'johndoeupdated',
                    email: 'johnupdated@example.com',
                    password: 'newpassword123',
                    groups: [],
                    profilePicURL: null
                };

                const existingStudent = {
                    _id: studentId,
                    firstName: 'John',
                    lastName: 'Doe',
                    school: 'Test School',
                    displayName: 'JohnD',
                    username: 'johndoe',
                    email: 'john@example.com',
                    password: 'password123',
                    groups: [],
                    profilePicURL: null
                };

                const updatedStudent = {
                    ...existingStudent,
                    ...updatedData
                };

                Student.findById.mockResolvedValue(existingStudent);
                Student.findByIdAndUpdate.mockResolvedValue(updatedStudent);

                const res = await request(app).put(`/api/students/${studentId}`).send(updatedData);

                expect(res.status).toBe(200);
                expect(res.body).toEqual(updatedStudent);
            });

            it('should return 400 if student is not found', async () => {
                const studentId = '1';
                const updatedData = {
                    firstName: 'John',
                    lastName: 'Doe',
                    school: 'Updated School',
                    displayName: 'JohnDUpdated',
                    username: 'johndoeupdated',
                    email: 'johnupdated@example.com',
                    password: 'newpassword123',
                    groups: [],
                    profilePicURL: null
                };

                Student.findById.mockResolvedValue(null);

                const res = await request(app).put(`/api/students/${studentId}`).send(updatedData);

                expect(res.status).toBe(400);
                expect(res.text).toBe('Student not found');
            });

            it('should handle errors', async () => {
                const studentId = '1';
                const updatedData = {
                    firstName: 'John',
                    lastName: 'Doe',
                    school: 'Updated School',
                    displayName: 'JohnDUpdated',
                    username: 'johndoeupdated',
                    email: 'johnupdated@example.com',
                    password: 'newpassword123',
                    groups: [],
                    profilePicURL: null
                };

                Student.findById.mockRejectedValue(new Error('Database error'));

                const res = await request(app).put(`/api/students/${studentId}`).send(updatedData);

                expect(res.status).toBe(500);
                expect(res.text).toBe('Database error');
            });

            const app = express();
            app.use(express.json());

            app.get('/api/students', getStudents);
            app.post('/api/students', setStudent);
            app.put('/api/students/:id', updateStudent);
            app.delete('/api/students/:id', deleteStudent);

            jest.mock('../models/StudentModel');
            jest.mock('../config/generateToken');

            describe('GET /api/students', () => {
                it('should return a list of students', async () => {
                    const mockStudents = [
                        { _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
                        { _id: '2', firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' }
                    ];

                    Student.find.mockResolvedValue(mockStudents);

                    const res = await request(app).get('/api/students');

                    expect(res.status).toBe(200);
                    expect(res.body.students).toEqual(mockStudents);
                });

                it('should handle errors', async () => {
                    Student.find.mockRejectedValue(new Error('Database error'));

                    const res = await request(app).get('/api/students');

                    expect(res.status).toBe(500);
                    expect(res.body).toEqual({ message: 'Database error' });
                });
            });

            describe('POST /api/students', () => {
                it('should create a new student', async () => {
                    const newStudent = {
                        firstName: 'John',
                        lastName: 'Doe',
                        school: 'Test School',
                        displayName: 'JohnD',
                        username: 'johndoe',
                        email: 'john@example.com',
                        password: 'password123',
                        groups: [],
                        profilePicURL: null
                    };

                    const savedStudent = {
                        ...newStudent,
                        _id: '1',
                        profilePicURL: `https://avatar.iran.liara.run/username?username=JohnDoe`,
                        token: 'fakeToken'
                    };

                    Student.findOne.mockResolvedValue(null);
                    Student.prototype.save.mockResolvedValue(savedStudent);
                    generateToken.mockReturnValue('fakeToken');

                    const res = await request(app).post('/api/students').send(newStudent);

                    expect(res.status).toBe(201);
                    expect(res.body).toEqual(savedStudent);
                });

                it('should return 400 if required fields are missing', async () => {
                    const newStudent = {
                        firstName: 'John',
                        lastName: 'Doe',
                        school: 'Test School',
                        displayName: 'JohnD',
                        username: 'johndoe',
                        email: 'john@example.com'
                    };

                    const res = await request(app).post('/api/students').send(newStudent);

                    expect(res.status).toBe(400);
                    expect(res.body).toEqual({ error: "Student has not entered all required fields" });
                });

                it('should return 401 if email is already in use', async () => {
                    const newStudent = {
                        firstName: 'John',
                        lastName: 'Doe',
                        school: 'Test School',
                        displayName: 'JohnD',
                        username: 'johndoe',
                        email: 'john@example.com',
                        password: 'password123',
                        groups: [],
                        profilePicURL: null
                    };

                    Student.findOne.mockResolvedValue(newStudent);

                    const res = await request(app).post('/api/students').send(newStudent);

                    expect(res.status).toBe(401);
                    expect(res.text).toBe('Email already in use');
                });

                it('should return 401 if username is already taken', async () => {
                    const newStudent = {
                        firstName: 'John',
                        lastName: 'Doe',
                        school: 'Test School',
                        displayName: 'JohnD',
                        username: 'johndoe',
                        email: 'john@example.com',
                        password: 'password123',
                        groups: [],
                        profilePicURL: null
                    };

                    Student.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce(newStudent);

                    const res = await request(app).post('/api/students').send(newStudent);

                    expect(res.status).toBe(401);
                    expect(res.text).toBe('Username taken');
                });

                it('should handle errors', async () => {
                    const newStudent = {
                        firstName: 'John',
                        lastName: 'Doe',
                        school: 'Test School',
                        displayName: 'JohnD',
                        username: 'johndoe',
                        email: 'john@example.com',
                        password: 'password123',
                        groups: [],
                        profilePicURL: null
                    };

                    Student.findOne.mockRejectedValue(new Error('Database error'));

                    const res = await request(app).post('/api/students').send(newStudent);

                    expect(res.status).toBe(500);
                    expect(res.text).toBe('Error creating student');
                });
            });

            describe('PUT /api/students/:id', () => {
                it('should update an existing student', async () => {
                    const studentId = '1';
                    const updatedData = {
                        firstName: 'John',
                        lastName: 'Doe',
                        school: 'Updated School',
                        displayName: 'JohnDUpdated',
                        username: 'johndoeupdated',
                        email: 'johnupdated@example.com',
                        password: 'newpassword123',
                        groups: [],
                        profilePicURL: null
                    };

                    const existingStudent = {
                        _id: studentId,
                        firstName: 'John',
                        lastName: 'Doe',
                        school: 'Test School',
                        displayName: 'JohnD',
                        username: 'johndoe',
                        email: 'john@example.com',
                        password: 'password123',
                        groups: [],
                        profilePicURL: null
                    };

                    const updatedStudent = {
                        ...existingStudent,
                        ...updatedData
                    };

                    Student.findById.mockResolvedValue(existingStudent);
                    Student.findByIdAndUpdate.mockResolvedValue(updatedStudent);

                    const res = await request(app).put(`/api/students/${studentId}`).send(updatedData);

                    expect(res.status).toBe(200);
                    expect(res.body).toEqual(updatedStudent);
                });

                it('should return 400 if student is not found', async () => {
                    const studentId = '1';
                    const updatedData = {
                        firstName: 'John',
                        lastName: 'Doe',
                        school: 'Updated School',
                        displayName: 'JohnDUpdated',
                        username: 'johndoeupdated',
                        email: 'johnupdated@example.com',
                        password: 'newpassword123',
                        groups: [],
                        profilePicURL: null
                    };

                    Student.findById.mockResolvedValue(null);

                    const res = await request(app).put(`/api/students/${studentId}`).send(updatedData);

                    expect(res.status).toBe(400);
                    expect(res.text).toBe('Student not found');
                });

                it('should handle errors', async () => {
                    const studentId = '1';
                    const updatedData = {
                        firstName: 'John',
                        lastName: 'Doe',
                        school: 'Updated School',
                        displayName: 'JohnDUpdated',
                        username: 'johndoeupdated',
                        email: 'johnupdated@example.com',
                        password: 'newpassword123',
                        groups: [],
                        profilePicURL: null
                    };

                    Student.findById.mockRejectedValue(new Error('Database error'));

                    const res = await request(app).put(`/api/students/${studentId}`).send(updatedData);

                    expect(res.status).toBe(500);
                    expect(res.text).toBe('Database error');
                });
            });

            describe('DELETE /api/students/:id', () => {
                it('should delete an existing student', async () => {
                    const studentId = '1';
                    const deletedStudent = {
                        _id: studentId,
                        firstName: 'John',
                        lastName: 'Doe',
                        school: 'Test School',
                        displayName: 'JohnD',
                        username: 'johndoe',
                        email: 'john@example.com',
                        password: 'password123',
                        groups: [],
                        profilePicURL: null
                    };

                    Student.findByIdAndDelete.mockResolvedValue(deletedStudent);

                    const res = await request(app).delete(`/api/students/${studentId}`);

                    expect(res.status).toBe(200);
                    expect(res.body).toEqual(deletedStudent);
                });

                it('should return 400 if student is not found', async () => {
                    const studentId = '1';

                    Student.findByIdAndDelete.mockResolvedValue(null);

                    const res = await request(app).delete(`/api/students/${studentId}`);

                    expect(res.status).toBe(400);
                    expect(res.text).toBe('Student not found');
                });

                it('should handle errors', async () => {
                    const studentId = '1';

                    Student.findByIdAndDelete.mockRejectedValue(new Error('Database error'));

                    const res = await request(app).delete(`/api/students/${studentId}`);

                    expect(res.status).toBe(500);
                    expect(res.text).toBe('Database error');
                });
            });
        });
    });
});