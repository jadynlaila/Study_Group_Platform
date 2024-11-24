import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css'; // Assuming the same CSS file is used

let baseURL = `http://localhost:${process.env.PORT || 6789}`;

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [authUser, setAuthUser] = useState(null)

  // Form data state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    school: '',
    displayName: '',
    username: '',
    major: '',
    email: '',
    password: '',
  });

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isRegistering) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setLoginData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Toggle between login and register forms
  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  // Handle register form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make POST request to create a new student (register user)
      const response = await axios.post(`${baseURL}/api/student`, formData);

      if (response.status === 201) {
        setIsRegistering(false); // Switch to login form after successful registration
      }
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseURL}/api/student/login`, loginData);

      if (response.status === 200) {
        localStorage.setItem("student", JSON.stringify(response.data))
        setAuthUser(response.data)
        window.location.href = "/"
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("chat-user");
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));  // Set authUser state from localStorage data
    }
  }, []);

  return (
    <div className="container">
      {/* Left Section */}
      <div className="left-section">
        <nav>
          <a href="#">GitHub</a>
          <a href="#">About Us</a>
          <a href="#">Learn More</a>
          <a href="#">Contact Us</a>
        </nav>
        <div className="slogan">
          <h1>Study Smarter,</h1>
          <h1>Together.</h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <img className="logo" src="public/S + Study.svg" alt="Study Sphere Logo" />
        <h2>{isRegistering ? 'Create Account' : 'Welcome Back!'}</h2>
        <p>{isRegistering ? 'Please fill in your details to create an account' : 'Please enter your username and password'}</p>

        {!isRegistering ? (
          <form id="login-form" onSubmit={handleLoginSubmit}>
            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <button type="submit">LOGIN</button>
          </form>
        ) : (
          <form id="register-form" onSubmit={handleRegisterSubmit}>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              placeholder="Display Name"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              placeholder="School"
              required
            />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
            <input
              type="text"
              name="major"
              value={formData.major}
              onChange={handleChange}
              placeholder="Major"
              required
            />
            <button type="submit">SIGN UP</button>
          </form>
        )}

        <p className="terms">
          By logging in, you agree to the <a href="#">Terms & Conditions</a>
        </p>

        <p className="toggle-form">
          {isRegistering ? (
            <>
              Already have an account? <a href="#" onClick={toggleForm}>Login</a>
            </>
          ) : (
            <>
              Don't have an account yet? <a href="#" onClick={toggleForm}>Create Account</a>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
