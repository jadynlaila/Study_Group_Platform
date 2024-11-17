document.getElementById('create-account').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'flex';
});

document.getElementById('login').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'flex';
});

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.querySelector('input[placeholder="First Name"]').value;
    const lastName = document.querySelector('input[placeholder="Last Name"]').value;
    const displayName = document.querySelector('input[placeholder="Display Name"]').value;
    const email = document.querySelector('input[placeholder="Email"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;
    const school = document.querySelector('input[placeholder="College"]').value;
    const username = document.querySelector('input[placeholder="User Name"]').value;
    const major = document.querySelector('input[placeholder="Major"]').value;

    // Create an object to send as the request body
    const studentData = {
        firstName,
        lastName,
        school,
        displayName,
        email,
        password,
        username,
        major
    };

    // Send a POST request to the backend to create a new student
    fetch('/api/student', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)  // Convert the data to JSON string
    })
    .then(response => response.json())  // Parse the JSON response
    .then(data => {
        if (data.success) {
            // Handle success (e.g., show a success message or redirect)
            alert('Account created successfully!');
            // Optionally, redirect to login page
            document.getElementById('register-form').style.display = 'none';
            document.getElementById('login-form').style.display = 'flex';
        } else {
            // Handle error (e.g., display error message)
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        // Handle network or other errors
        console.error('Error:', error);
        alert('An error occurred while creating the account.');
    });
});