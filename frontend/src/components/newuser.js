// CreateUser.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = (props) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    age: '',
    domain: '',
    availability: '',
    avatar:'https://robohash.org/temporibusporrolaboriosam.png?size=50x50&set=set1'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have a /api/users endpoint to handle user creation
      await axios.post(`${props.url}/api/users`, formData);
      alert('User created successfully');
      // Optionally, you can redirect to the user list or perform other actions
    } catch (error) {
      alert('Error creating user:', error);
    }
  };

  return (
    <div className="create-user-container">
      <div className="glass-form">
        <h2>Create a New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="name-fields">
            <div className="input-group">
              <label htmlFor="first_name">First Name:</label>
              <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="last_name">Last Name:</label>
              <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
            </div>
          </div>

          {/* Other form fields */}
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />

          <label htmlFor="domain">Domain:</label>
          <input type="text" id="domain" name="domain" value={formData.domain} onChange={handleChange} required />

          <label htmlFor="availability">Availability:</label>
          <input type="text" id="availability" name="availability" value={formData.availability} onChange={handleChange} required />

          <button type="submit">Create User</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
