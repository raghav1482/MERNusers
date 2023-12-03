// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="content">
        <h1 className="heading">Welcome to Your App</h1>
        <p className="subtitle">Explore and manage your teams and users effortlessly.</p>
        <Link to="/users" className="button">Go to Users</Link>
      </div>
    </div>
  );
};

export default Home;
