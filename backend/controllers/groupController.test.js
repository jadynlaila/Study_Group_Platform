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

function createUser(userData) {
    request(`${serverAddress}/api/student`).post('/').send(userData)
        .end((err, res) => {
            if (err) {
                console.debug("Error creating user");
                console.debug(err);
            }

            console.debug("Got a status code of " + res.statusCode);
            expect(res.statusCode).toBe(201);
            return res.body;
        }
    );
}

describe('Group Controller', () => {
    const serverAddress = `localhost:${process.env.EXPRESS_PORT}`;

    // Test createGroup
    test('should create a group', async () => {
        // Create a sample student
        let studentData = { ...sampleStudentData };
        studentData.username = "testuser_createGroup";
        studentData.email = "createGroup@test.user"

        let studentID;

        // check if the student already exists using the API
        const studentCheckResponse = await request(`${serverAddress}/api/student`).get(`/${studentData.username}`);

        if (studentCheckResponse.status == 404) {
            console.debug(`Creating student with username ${studentData.username}`);
            console.debug(studentData);

            const studentResponse = await request(`${serverAddress}/api/student`).post('/').send(studentData);
            studentID = studentResponse.body._id;
            console.debug(studentResponse.body);

            if (studentResponse.status != 401) {
                expect(studentResponse.status).toBe(201);
                expect(studentID).not.toBeNull();
            }
            else {
                console.debug("Student already exists. Skipping creation.");
            }
        } else {
            studentID = studentCheckResponse.body._id;
        }
        
        // Create the target group
        let groupData = { ...sampleGroupData };
        groupData.ownerID = studentID;
        console.debug(groupData)
        
        const response = await request(`${serverAddress}/api/group`).post('/').send(groupData);

        const { _id, group } = response.body;
        const groupID = _id;

        if (response.status != 201) {
            console.debug(response.body.error);
        }

        // Delete the stuff we created
        await request(`${serverAddress}/api/group`).delete(`/${groupID}`);
        await request(`${serverAddress}/api/student`).delete(`/${studentID}`);

        // TEST: Make sure the group is a-okay
        expect(response.status).toBe(201)
        expect(group.name).toBe("JEST Test Group")

    });

    // Test getAllGroups
    test('should get all groups', async () => {
        // NOTE: this assumes that there are groups in the database

        // Get all groups using the API
        const response = await request(`${serverAddress}/api/group`).get('/');

        // TEST: Make sure we get an array back
        console.debug(response.body);
        expect(Array.isArray(response.body)).toBe(true);
    });
    
    // Test getGroup
    test('should get a group', async () => {
        // Create a student to own the group
        const studentData = { ...sampleStudentData };
        studentData.username = "testuser_getGroup";
        studentData.email = "getGroup@test.user";

        const studentResponse = await request(`${serverAddress}/api/student`).post('/').send(studentData);
        const testStudentID = studentResponse.body._id;

        expect(studentResponse.statusCode).toBe(201);

        // Create the group
        const groupData = { ...sampleGroupData };
        groupData.ownerID = testStudentID;

        const groupResponse = await request(`${serverAddress}/api/group`).post('/').send(groupData);
        const testGroupID = groupResponse.body._id;

        expect(groupResponse.statusCode).toBe(201);

        // Get the group we created
        const response = await request(`${serverAddress}/api/group`).get(`/${testGroupID}`);

        // Delete the test group
        await request(`${serverAddress}/api/group`).delete(`/${testGroupID}`);
 
        // TEST: Make sure that we got the group back
        expect(response.statusCode).toBe(200);
        // TEST: Make sure the group's name is the same as the one we created
        expect(response.body.name).toBe('JEST Test Group');
    });
    
    // Test updateGroup
    test('should update a group', async () => {
        let studentData = { ...sampleStudentData };
        studentData.username = "testuser_updateGroup";
        studentData.email = "updateGroup@test.user"

        let studentID;

        // Create the student
        const studentResponse = await request(`${serverAddress}/api/student`).post('/').send(studentData);
        studentID = studentResponse.body._id;
        
        if (studentResponse.status != 201) {
            console.error("Failed to create student");
            console.debug(studentResponse.body);
        }

        if (studentID == null || studentID == undefined) {
            console.error("Because the student ID is null, we can't continue with the test");
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

        // Update the local data
        const updatedName = "JEST Test Group (Updated)";
        const updatedDescription = "This is an updated test";

        // Send the update request
        const response = await request(`${serverAddress}/api/group`).put(`/${groupID}`).send({
            name: updatedName,
            description: updatedDescription
        })

        // Delete the test stuff before we test
        await request(`${serverAddress}/api/group`).delete(`/${groupID}`);
        await request(`${serverAddress}/api/student`).delete(`/${studentID}`);

        // TEST: Make sure we get a good status code
        expect(response.statusCode).toBe(200);

        // TEST: Make sure the group was updated
        console.debug(response.body);
        expect(response.body.group.name).toBe(updatedName);
        expect(response.body.group.description).toBe(updatedDescription);
    });

    // Test searchGroups
    test('should search for groups', async () => {
        let studentData = { ...sampleStudentData };
        studentData.username = "testuser_getGroup";
        studentData.email = "getGroup@test.user"

        let studentID;

        // Create the student
        const studentResponse = await request(`${serverAddress}/api/student`).post('/').send(studentData);
        studentID = studentResponse.body._id;
        
        if (studentResponse.status != 201) {
            console.error("Failed to create student");
            console.debug(studentResponse.body);
        }

        if (studentID == null || studentID == undefined) {
            console.error("Because the student ID is null, we can't continue with the test");
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

        // Send the get request
        const response = await request(`${serverAddress}/api/group`).get(`/search/${groupData.name}`);

        // Delete the test stuff before we test
        await request(`${serverAddress}/api/group`).delete(`/${groupID}`);
        await request(`${serverAddress}/api/student`).delete(`/${studentID}`);

        // TEST: Make sure we get a good status code
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test joinGroup
    test('should join a group', async () => {
        let studentData = { ...sampleStudentData };
        studentData.username = "testuser_joinGroup";
        studentData.email = "joinGroup@test.user"

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

        // Create a second student
        const studentData2 = { ...sampleStudentData };
        studentData2.username = "testuser_joinGroup2";
        studentData2.email = "joinGroup2@test.user";

        const studentResponse2 = await request(`${serverAddress}/api/student`).post('/').send(studentData2);
        const studentID2 = studentResponse2.body._id;

        if (studentResponse2.status != 201) {
            console.error("Failed to create SECOND student");
            console.debug(studentResponse2.body);
        }

        if (studentID2 == null || studentID2 == undefined) {
            console.error("Because the SECOND student ID is null, we can't continue with the test");
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

        // Have the student join the group
        const response = await request(`${serverAddress}/api/group`).put(`/join/${groupID}`).send({
            studentID: studentID2
        })

        const { group } = response.body;

        // Get the updated student
        const updatedStudentResponse = await request(`${serverAddress}/api/student`).get(`/${studentID2}`);
        const updatedStudent = updatedStudentResponse.body;

        // Delete the test stuff before we test
        await request(`${serverAddress}/api/group`).delete(`/${groupID}`);
        await request(`${serverAddress}/api/student`).delete(`/${studentID}`);
        await request(`${serverAddress}/api/student`).delete(`/${studentID2}`);

        // Run our tests
        expect(response.statusCode).toBe(201);
        expect(group.memberIDs).toContain(studentID2);
        expect(updatedStudent.groups).toContain(groupID);
    });

    // Test getStudentsFromGroup
    test('should get students from a group', async () => {
        let studentData = { ...sampleStudentData };
        studentData.username = "testuser_getStudentsFromGroup";
        studentData.email = "getStudentsFromGroup@test.user";

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

        // Create a second student
        const studentData2 = { ...sampleStudentData };
        studentData2.username = "testuser_getStudentsFromGroup2";
        studentData2.email = "getStudentsFromGroup2@test.user";

        const studentResponse2 = await request(`${serverAddress}/api/student`).post('/').send(studentData2);
        const studentID2 = studentResponse2.body._id;

        if (studentResponse2.status != 201) {
            console.error("Failed to create SECOND student");
            console.debug(studentResponse2.body);
        }

        if (studentID2 == null || studentID2 == undefined) {
            console.error("Because the SECOND student ID is null, we can't continue with the test");
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

        // Have the students join the group
        await request(`${serverAddress}/api/group`).put(`/join/${groupID}`).send({
            studentID: studentID2
        })

        // Send the get request
        const response = await request(`${serverAddress}/api/group`).get(`/${groupID}/students`);

        // Delete the test stuff before we test
        await request(`${serverAddress}/api/group`).delete(`/${groupID}`);
        await request(`${serverAddress}/api/student`).delete(`/${studentID}`);
        await request(`${serverAddress}/api/student`).delete(`/${studentID2}`);

        // TEST: Make sure we get a good status code
        expect(response.statusCode).toBe(200);

        // TEST: Make sure we get an array back
        expect(Array.isArray(response.body)).toBe(true);

        // TEST: Make sure the student we added is in the array
        expect(response.body.memberIDs).toContain(groupID);
    });

    // Test leaveGroup
    test('should leave a group', async () => {
        let studentData = { ...sampleStudentData };
        studentData.username = "testuser_leaveGroup";
        studentData.email = "leaveGroup@test.user"

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

        // Create a second student
        const studentData2 = { ...sampleStudentData };
        studentData2.username = "testuser_leaveGroup2";
        studentData2.email = "leaveGroup2@test.user";

        const studentResponse2 = await request(`${serverAddress}/api/student`).post('/').send(studentData2);
        const studentID2 = studentResponse2.body._id;

        if (studentResponse2.status != 201) {
            console.error("Failed to create SECOND student");
            console.debug(studentResponse2.body);
        }

        if (studentID2 == null || studentID2 == undefined) {
            console.error("Because the SECOND student ID is null, we can't continue with the test");
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

        // Have the student join the group
        await request(`${serverAddress}/api/group`).put(`/join/${groupID}`).send({
            studentID: studentID2
        });

        // Have the second student leave the group
        const leaveResponse = await request(`${serverAddress}/api/group`).put(`/leave/${groupID}`).send({
            studentID: studentID2
        });

        // Get the updated student
        const updatedStudentResponse = await request(`${serverAddress}/api/student`).get(`/${studentID2}`);
        const updatedStudent = updatedStudentResponse.body;

        // Get the updated group
        const updatedGroupResponse = await request(`${serverAddress}/api/group`).get(`/${groupID}`);
        const updatedGroup = updatedGroupResponse.body;

        // Delete the test stuff before we test
        await request(`${serverAddress}/api/group`).delete(`/${groupID}`);
        await request(`${serverAddress}/api/student`).delete(`/${studentID}`);
        await request(`${serverAddress}/api/student`).delete(`/${studentID2}`);

        // Run our tests
        expect(leaveResponse.statusCode).toBe(200);
        expect(updatedGroup.memberIDs).not.toContain(studentID2);
        expect(updatedStudent.groups).not.toContain(groupID);
    });

    // Test getMessages
    test('should get messages of a group', async () => {
        // Create/Send the test message
        const sendMessageResponse = await request(`${serverAddress}/api/messages`).put('/').send({
            testGroupID,
            studentID: testStudentID,
            message: "Hello world"
        })

        if (sendMessageResponse.statusCode != 201)
            console.debug(sendMessageResponse.body)

        // TEST: Check if the message was sent successfully
        expect(sendMessageResponse.statusCode).toBe(201)

        // Check if the message ID was added to the group
        const messagesResponse = await request(`${serverAddress}/api/group`).get(`/messages/${testGroupID}`)
        const messages = messagesResponse.body

        expect(messages[0].content).toBe("Hello world")
    });

    // // Test deleteGroup
    // test('should delete a group', async () => {
    //     // Create the test group using the API
    //     const groupResponse = await request(`${serverAddress}/api/group`).post('/').send({
    //         name: "JEST Test group",
    //         description: "This is a test",
    //         courses: "CS386",
    //         majors: "Computer Science",
    //         ownerID: testStudentID,
    //         profilePictureID: null
    //     });

    //     // Bail if the group wasn't created
    //     expect(groupResponse.statusCode).toBe(201);

    //     const { groupID } = groupResponse.body;

    //     console.debug(`Deleting group ${groupID}`);

    //     // Send the delete request
    //     const response = await request(`${serverAddress}/api/group`).delete(`/${groupID}`);

    //     // Attempt to get the group
    //     const getGroupResponse = await request(`${serverAddress}/api/group`).get(`/${groupID}`);

    //     // TEST: Make sure we get a good status code
    //     expect(response.statusCode).toBe(200);

    //     // TEST: Make sure the group was deleted
    //     expect(response.body.success).toBe(true);

    //     // TEST: Make sure the group is no longer in the database
    //     expect(getGroupResponse.statusCode).toBe(404);
    // });
});
