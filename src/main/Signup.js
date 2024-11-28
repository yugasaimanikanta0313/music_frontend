import React, { useState } from 'react';
import axios from 'axios';
import '../main/form.css';
import '../main/style.css';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
  // State to manage form data
  const [formData, setFormData] = useState({
    fullname: '',
    gender: '',
    dateofbirth: '',
    email: '',
    password: '',
    location: '',
    contact: '',
  });

  // State to handle success message and error
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Updates state when form fields change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post(
        'https://muzic-h1kw3ki9l-yugasaimanikantas-projects.vercel.app/viewevents',
        formData
      );

      if (response.status === 200) {
        // Clear the form and set success message
        setFormData({
          fullname: '',
          gender: '',
          dateofbirth: '',
          email: '',
          password: '',
          location: '',
          contact: '',
        });
        setMessage(response.data);
        setError(''); // Clear previous errors
        navigate('/customerlogin'); // Redirect to login page
      }
    } catch (error) {
      if (error.response) {
        // Server responded with an error
        setError(error.response.data);
        setMessage(''); // Clear any success message
      } else if (error.request) {
        // Request made but no response received
        setError('Server is not responding. Please try again later.');
        setMessage(''); // Clear any success message
      } else {
        // An unexpected error occurred
        setError('An unexpected error occurred. Please try again later.');
        setMessage(''); // Clear any success message
      }
    }
  };

  return (
    <div className="home-container">
      {/* Display success or error message */}
      {message ? (
        <h4 align="center" className="success-message">{message}</h4>
      ) : (
        <h4 align="center" className="error-message">{error}</h4>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit}>
        <h3 align="center">Sign Up Here!!</h3>

        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="dateofbirth">Date of Birth</label>
          <input
            type="date"
            id="dateofbirth"
            value={formData.dateofbirth}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="contact">Contact</label>
          <input
            type="number"
            id="contact"
            pattern="[6789][0-9]{9}"
            placeholder="MUST be 10 digits"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit">Register</button>
          <button
            type="reset"
            onClick={() =>
              setFormData({
                fullname: '',
                gender: '',
                dateofbirth: '',
                email: '',
                password: '',
                location: '',
                contact: '',
              })
            }
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
