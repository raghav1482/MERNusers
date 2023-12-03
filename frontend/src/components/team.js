// TeamList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function TeamList(props) {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${props.url}/api/teams`);
        setTeams(result.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container' style={{width:"100%"}}>
      <h1 style={{textAlign:"center" , color:"white" , margin:"30px auto"}}>Team List</h1>
      <Link to="/teams/createteams" className="button" style={{margin:"auto"}}>Create Team</Link>
      <div style={{display:"flex" , width:"100%" , flexWrap:"wrap"}}>
        {teams.map((team) => (
          <div className='card-container ' key={team._id}>
            <h3> {'TEAM : ' + team.name}</h3><br />
            <strong>Users</strong>
            <ul style={{listStyle:"none" ,padding:"0"}}>
            <div style={{display:"flex" ,backgroundColor:"#161666",margin:"auto" , padding:"20px" , width:"300px",borderRadius:"10px",flexWrap:"wrap"}}>
              {team.users.map((user) => (
                <li key={user._id} style={{margin:"10px"}}>{user.first_name}</li>
              ))}
            </div>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamList;
