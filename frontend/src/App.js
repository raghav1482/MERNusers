import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Allusrs from './components/allusers';
import Navbar from './components/Nav';
import Home from './components/Home';
import CreateTeam from './components/createTeam';
import TeamList from './components/team';
import CreateUser from './components/newuser';

function App() {
  const url = "http://127.0.0.1:4000";
  return (<>
      
      <BrowserRouter>
      <Navbar/>
      <Routes>
          <Route path="/" index element={<Home url={url}/>} />
          <Route path="/users" element={<Allusrs  url={url}/>}/>
          <Route path="/createuser" element={<CreateUser  url={url}/>}/>
          <Route path="/teams/createteams" element={<CreateTeam  url={url}/>}/>
          <Route path="/teams" element={<TeamList url={url}/>}/>
      </Routes>
    </BrowserRouter>
      </>
  );
}

export default App;
