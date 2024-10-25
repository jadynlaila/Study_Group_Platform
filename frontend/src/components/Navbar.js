document.addEventListener('DOMContentLoaded', () => {
    const navbarContainer = document.getElementById('navbar');

    const navbar = document.createElement('nav');
    navbar.className = 'navbar';

    // Left Section: Logo StudySphere
    const leftSection = document.createElement('div');
    leftSection.className = 'navbar-left';

    const logo = document.createElement('img');
    logo.src = 'public/StudySphere-White.svg'; // Path to your logo
    logo.alt = 'Logo';
    logo.className = 'logo';
    leftSection.appendChild(logo);

    // Middle Section: Group Chat Details
    const middleSection = document.createElement('div');
    middleSection.className = 'navbar-middle';

    const groupChat = document.createElement('div');
    groupChat.className = 'group-chat';

    const groupProfile = document.createElement('img');
    groupProfile.src = 'public/download.jpg'; // Path to the group profile picture
    groupProfile.alt = 'Group Profile';
    groupProfile.className = 'group-profile';

    const groupInfo = document.createElement('div');
    groupInfo.className = 'group-info';

    const groupName = document.createElement('span');
    groupName.className = 'group-name';
    groupName.innerText = 'Datastructures T_T'; // PLACEHOLDER

    const fieldOfStudy = document.createElement('span');
    fieldOfStudy.className = 'field-of-study';
    fieldOfStudy.innerText = 'Computer Science'; // PLACEHOLDER

    const userCount = document.createElement('span');
    userCount.className = 'user-count';
    userCount.innerText = '?/?'; // PLACEHOLDER

    groupInfo.appendChild(groupName);
    groupInfo.appendChild(fieldOfStudy);
    groupInfo.appendChild(userCount);
    
    groupChat.appendChild(groupProfile);
    groupChat.appendChild(groupInfo);
    middleSection.appendChild(groupChat);

    // Right Section: User Details - SAME AS GROUP -
    
    const rightSection = document.createElement('div');
    rightSection.className = 'navbar-right';

    const userDetails = document.createElement('div');
    userDetails.className = 'user-details';

    const userProfile = document.createElement('img');
    userProfile.src = 'public/vector.png'; // Path to the user profile picture
    userProfile.alt = 'User Profile';
    userProfile.className = 'user-profile';

    const userInfo = document.createElement('div');
    userInfo.className = 'user-info';

    const userName = document.createElement('span');
    userName.className = 'user-name';
    userName.innerText = 'Valentino Valero'; // PLACEHOLDER

    const userMajor = document.createElement('span');
    userMajor.className = 'user-major';
    userMajor.innerText = 'ComputerScience'; // PLACEHOLDER

    const userCollege = document.createElement('span');
    userCollege.className = 'user-college';
    userCollege.innerText = 'NAU'; // PLACEHOLDER

    userInfo.appendChild(userName);
    userInfo.appendChild(userMajor);
    userInfo.appendChild(userCollege);
    
    userDetails.appendChild(userProfile);
    userDetails.appendChild(userInfo);
    
    rightSection.appendChild(userDetails);
    
    // Append sections to navbar
    navbar.appendChild(leftSection);
    navbar.appendChild(middleSection);
    navbar.appendChild(rightSection);
    
    
    // Add event listeners for navigation
    userInfo.addEventListener('click', () => {
        window.location.href = 'user-settings.html'; // Navigate to user settings
    });

    groupChat.addEventListener('click', () => {
        window.location.href = 'group-settings.html'; // Navigate to group settings
    });

    // Append the navbar to the container
    navbarContainer.appendChild(navbar);
});
