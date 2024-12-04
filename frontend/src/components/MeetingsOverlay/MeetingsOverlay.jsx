import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './MeetingsOverlayStyle.css';
import arrowDownImage from '../Public/arrow_down.svg';
import notesImage from '../Public/notes.svg';
import noPicImage from '../Public/no-pic.png';
import pinImage from '../Public/pin.svg';
import personImage from '../Public/person.svg';

export { MeetingsOverlay, MeetingsComponent };

const baseURL = `http://localhost:6789`;

async function getItemFromURL(url) {
    try {
        const response = await axios.get(url);

        if (response.status !== 200) {
            throw new Error("Response from API is not 200");
        }

        return response.data;
    } catch (error) {
        console.log(`Failed to obtain data from ${url}: ${error.message}`);
        return null;
    }
}

async function getMeetings(groupID) {
    if (!groupID) {
        return;
    }
    return await getItemFromURL(`${baseURL}/api/group/${groupID}/meetings`);
}

async function getStudent(studentID) {
    if (!studentID) {
        return;
    }
    return await getItemFromURL(`${baseURL}/api/student/${studentID}`);
}

function getDateString(inputDate) {
    return new Date(inputDate).toLocaleDateString();
}

function getTimeString(inputDate) {
    return new Date(inputDate).toLocaleTimeString();
}

function getDateTimeString(inputDate) {
    return new Date(inputDate).toLocaleString();
}

function IndividualMeetingComponent({ meeting }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [meetingOwner, setMeetingOwner] = useState(null);

    useEffect(() => {
        const fetchMeetingOwner = async () => {
            const owner = await getStudent(meeting.creatorID);
            setMeetingOwner(owner);
        };

        fetchMeetingOwner();
    }, [meeting]);
    

    if (!meeting) {
        return;
    }

    return (
        <div className='individual_meeting_container'>
            <div className='meeting_banner'>
                {/* <img 
                    className='some_identifier_picture' 
                    src={}
                /> */}
                <div className='meeting_short_details'>
                    <p className='meeting_title'>{meeting.name}</p>
                    <p className='meeting_short_time'>
                        {
                            `${getDateTimeString(meeting.start)}`
                        }
                    </p>
                </div>
                <div className='meeting_dropdown_arrow'>
                    <img 
                        src={arrowDownImage}
                        style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }} 
                        alt='Toggle Arrow' 
                        onClick={() => setIsExpanded(!isExpanded)}
                        />
                </div>
            </div>
            {
                isExpanded ? (
                    <div className='meeting_details'>
                        <div className='meeting_time_and_location'>
                            <div className='meeting_location_container'>
                                <img
                                    className='meeting_location_icon'
                                    src={pinImage}
                                    alt='Pin icon'
                                    />
                               <p className='meeting_location'>{meeting.location}</p>
                            </div>
                            <p className='meeting_time'>
                                { `${getDateTimeString(meeting.start)} to ${getDateTimeString(meeting.end)}` }
                            </p>
                        </div>
                        <div className='meeting_description'>
                            <img
                                className='meeting_description_icon'
                                src={notesImage}
                                alt='Notes icon'
                            />
                            <p className='meeting_description_contents'>{meeting.description}</p>
                        </div>
                        {
                            meetingOwner ? 
                                <div className='meeting_owner'>
                                    <img
                                        className='meeting_owner_descriptor_icon'
                                        src={personImage}
                                        alt='Person'
                                    />
                                    <img
                                        className='meeting_owner_profile_pic'
                                        src={meetingOwner.profilePicURL || noPicImage}
                                        alt='Meeting owner profile icon'
                                    />
                                    <div className='meeting_owner_identifier'>
                                        <div className='meeting_owner_name'>
                                            { `${meetingOwner.firstName} ${meetingOwner.lastName}` }
                                        </div>
                                        <div className='meeting_owner_username'>
                                            { meetingOwner.username }
                                        </div>
                                    </div>
                                </div>
                            : null
                        }
                    </div>
                ) : null
            }
        </div>
    );
}

function MeetingsComponent({ groupID }) {
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        const fetchMeetings = async () => {
            const meetingsData = await getMeetings(groupID);
            setMeetings(meetingsData);
        };

        fetchMeetings();
    }, [groupID]);

    if (!meetings) {
        return;
    }
    
    return meetings.map((meetingItem) => {
        return (<IndividualMeetingComponent meeting={meetingItem} />)
    });
}

// Taken from https://www.youtube.com/watch?v=D9OJX6sSyYk
function MeetingsOverlay({ onClose, groupID }) {
    console.log("MeetingsOverlay called")
    return (
        <div className='overlay'>
            <div className='overlay_container'>
                <div className='overlay_controls'>
                    <h1 className='overlay_title'>Meetings</h1>
                    <button className='overlay_close' type='button' onClick={onClose}>Close</button>
                </div>
                <MeetingsComponent groupID={groupID} />
            </div>
        </div>
    )
}