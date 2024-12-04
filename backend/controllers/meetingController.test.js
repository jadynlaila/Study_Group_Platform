const axios = require('axios');
require('dotenv').config();

const baseURL = "http://localhost:6789";

async function sendGet(url, data) {
    try {
        const response = await axios.get(url, data);
        const valid_status_code = 200;

        if (response.status !== valid_status_code) {
            throw new Error(`${url} returned a status of ${response.status} instead of ${valid_status_code}`);
        }

        return response.data;
    } catch (error) {
        console.error(`Failed to GET: ${error.message}`);
    }
}

async function sendPost(url, data) {
    try {
        const response = await axios.post(url, data);
        const valid_status_code = 201;
        const item_already_exists_code = 401;

        if (response.status === item_already_exists_code) {
            return;
        }

        if (response.status !== valid_status_code) {
            throw new Error(`${url} returned a status of ${response.status} instead of ${valid_status_code}`);
        }

        return response.data;
    } catch (error) {
        console.error(`Failed to POST: ${error.message}`);
    }
}

async function sendPut(url, data) {
    try {
        const response = await axios.put(url, data);
        const valid_status_code = 201;

        if (response.status !== valid_status_code) {
            throw new Error(`${url} returned a status of ${response.status} instead of ${valid_status_code}`);
        }

        return response.data;
    } catch (error) {
        console.error(`Failed to PUT: ${error.message}`);
    }
}

async function sendDelete(url, data) {
    try {
        const response = await axios.delete(url, { data });
        const valid_status_code = 200;

        if (response.status !== valid_status_code) {
            throw new Error(`${url} returned a status of ${response.status} instead of ${valid_status_code}`);
        }

        return response.data;
    } catch (error) {
        console.error(`Failed to DELETE: ${error.message}`);
    }
}

async function getSampleStudent(studentID) {
    return await sendGet(`${baseURL}/api/student/${studentID}`);
}

async function createSampleStudent(username, email) {
    const response = await sendPost(`${baseURL}/api/student`, {
        firstName: "Jest",
        lastName: "Test",
        school: "Northern Arizona University",
        displayName: "Jest Test User",
        username,
        email,
        password: "password123",
        major: "Computer Science"
    });

    if (!response) {
        return await getSampleStudent(username);
    }

    return response;
}

async function updateSampleStudent(studentID, updateData) {
    return await sendPut(`${baseURL}/api/student/${studentID}`, updateData);
}

async function deleteSampleStudent(studentID) {
    return await sendDelete(`${baseURL}/api/student/${studentID}`);
}

async function getSampleGroup(groupID) {
    return await sendGet(`${baseURL}/api/group/${groupID}`);
}

async function createSampleGroup(name, description, ownerID) {
    return await sendPost(`${baseURL}/api/group`, {
        name,
        description,
        courses: "CS386",
        majors: "Computer Science",
        memberLimit: 6,
        ownerID
    });
}

async function updateSampleGroup(groupID, updateData) {
    return await sendPut(`${baseURL}/api/group/${groupID}`, updateData);
}

async function deleteSampleGroup(groupID) {
    return await sendDelete(`${baseURL}/api/group/${groupID}`);
}

async function getSampleMeeting(meetingID) {
    return await sendGet(`${baseURL}/api/meeting/${meetingID}`);
}

async function createSampleMeeting(groupID, creatorID, name, description, location, start, end) {
    return await sendPost(`${baseURL}/api/group/${groupID}/meetings`, {
        groupID,
        creatorID,
        name,
        description,
        location,
        start,
        end
    });
}

async function updateSampleMeeting(meetingID, updateData) {
    return await sendPut(`${baseURL}/api/meeting/${meetingID}`, updateData);
}

async function deleteSampleMeeting(meetingID, groupID) {
    return await sendDelete(`${baseURL}/api/meeting/${meetingID}`, { groupID });
}

describe('Meeting Controller', () => {
    test('Create a meeting', async () => {
        // Create sample data
        const student = await createSampleStudent("jesttest_createmeeting", "create.meeting@jest.test");
        if (!student) {
            console.error("Failed to create sample student");
            return;
        }

        const group = await createSampleGroup("Jest Test Group - Create Meeting", "Mock data for Creating a Meeting", student._id);
        if (!group) {
            console.error("Failed to create sample group");
            return;
        }

        // Create a meeting lasting for 2 hours
        const meeting = await createSampleMeeting(
            group.groupID, 
            student._id, 
            "Jest Test Meeting", 
            "Mock data for Creating a Meeting", 
            "Mock Location", 
            new Date(), 
            new Date(new Date().getTime() + 2 * 60 * 60 * 1000)
        );

        const updatedGroup = await getSampleGroup(group.groupID);
        if (!updatedGroup) {
            console.error("Failed to get updated group");
            return;
        }

        // Clean up before testing
        await deleteSampleGroup(group.groupID);
        await deleteSampleStudent(student._id);
        await deleteSampleMeeting(meeting._id);

        // Verify the meeting was created
        expect(meeting).toHaveProperty('_id');
        expect(meeting.name).toBe("Jest Test Meeting");
        expect(meeting.description).toBe("Mock data for Creating a Meeting");
        expect(meeting.location).toBe("Mock Location");
        expect(meeting.creatorID).toBe(student._id);
        expect(meeting.groupID).toBe(group._id);

        // Verify the group was updated
        expect(updatedGroup.meetingIDs).toHaveLength(1);
        expect(updatedGroup.meetingIDs[0]).toBe(meeting._id);
    });

    test('Get a meeting', async () => {
        // Create sample data
        const student = await createSampleStudent("jesttest_deletemeeting", "delete.meeting@jest.test");
        if (!student) {
            console.error("Failed to create sample student");
            return;
        }

        let group = await createSampleGroup("Jest Test Group - Delete Meeting", "Mock data for Deleting a Meeting", student._id);
        if (!group) {
            console.error("Failed to create sample group");
            return;
        }
        const groupID = group.groupID;

        // Create a meeting lasting for 2 hours
        const meeting = await createSampleMeeting(
            groupID, 
            student._id, 
            "Jest Test Meeting", 
            "Mock data for Deleting a Meeting", 
            "Mock Location", 
            new Date(), 
            new Date(new Date().getTime() + 2 * 60 * 60 * 1000)
        );

        // Get the meeting
        const retrievedMeeting = await getSampleMeeting(meeting._id);

        // Clean up before testing
        await deleteSampleGroup(groupID);
        await deleteSampleStudent(student._id);
        await deleteSampleMeeting(meeting._id);

        // Verify the meeting was retrieved
        expect(retrievedMeeting).toHaveProperty('_id');
        expect(retrievedMeeting.name).toBe("Jest Test Meeting");
        expect(retrievedMeeting.description).toBe("Mock data for Deleting a Meeting");
        expect(retrievedMeeting.location).toBe("Mock Location");
        expect(retrievedMeeting.creatorID).toBe(student._id);
        
    });


    test('Delete a meeting', async () => {
        // Create sample data
        const student = await createSampleStudent("jesttest_deletemeeting", "delete.meeting@jest.test");
        if (!student) {
            console.error("Failed to create sample student");
            return;
        }

        let group = await createSampleGroup("Jest Test Group - Delete Meeting", "Mock data for Deleting a Meeting", student._id);
        if (!group) {
            console.error("Failed to create sample group");
            return;
        }
        const groupID = group.groupID;

        // Create a meeting lasting for 2 hours
        const meeting = await createSampleMeeting(
            groupID, 
            student._id, 
            "Jest Test Meeting", 
            "Mock data for Deleting a Meeting", 
            "Mock Location", 
            new Date(), 
            new Date(new Date().getTime() + 2 * 60 * 60 * 1000)
        );
        
        // Delete the meeting
        const deletedMeeting = await deleteSampleMeeting(meeting._id, group.groupID);
        
        group = await getSampleGroup(group.groupID);
        if (!group) {
            console.error("Failed to get updated group");
            return;
        }

        // Clean up before testing
        await deleteSampleGroup(groupID);
        await deleteSampleStudent(student._id);

        // Verify the meeting was deleted
        expect(deletedMeeting).toHaveProperty('_id');
        expect(deletedMeeting.name).toBe("Jest Test Meeting");
        expect(deletedMeeting.description).toBe("Mock data for Deleting a Meeting");
        expect(deletedMeeting.location).toBe("Mock Location");
        expect(deletedMeeting.creatorID).toBe(student._id);
        expect(group.meetingIDs).toHaveLength(0);
    });
});