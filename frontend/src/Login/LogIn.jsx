import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Assuming the same CSS file is used
import logo from './study.svg';

let baseURL = `http://localhost:${process.env.PORT || 6789}`;

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [step, setStep] = useState(1); // Track which step we're on

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
    setStep(1); // Reset to step 1 when switching forms
  };

  // Go to next step in registration
  const nextStep = () => {
    setStep(2); // Go to step 2
  };

  // Handle register form submission (Step 2)
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the full registration data to backend
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
        console.log(response.data._id)
        const student = await axios.get(`${baseURL}/api/student/${response.data._id}`)
        if (student) { 
          console.log("student", student.data)
          localStorage.setItem("student", JSON.stringify(student.data))
          window.location.href = "/"
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

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
          <h2>Together.</h2>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <img className="logo" src= {logo} alt="Study Sphere Logo" />
        <h2>{isRegistering ? (step === 1 ? 'Create Account' : 'Create Account') : 'Welcome Back!'}</h2>
        <h2>{isRegistering ? (step === 1 ? 'Please fill in your details to create an account' : 'Please fill in the remaining details') : 'Please enter your username and password'}</h2>

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
          <form id="register-form" onSubmit={step === 2 ? handleRegisterSubmit : (e) => e.preventDefault()}>
            {step === 1 ? (
              <>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
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
                <button type="button" onClick={nextStep}>Next Step</button>
              </>
            ) : (
              <>
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
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  placeholder="School"
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
              </>
            )}
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
