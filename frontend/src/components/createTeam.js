import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Usrcard from './usercard';

function CreateTeam(props) {
  const [teamName, setTeamName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [dom , setdom] = useState('Finance');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${props.url}/api/filtered-users`, {
          params: {
            domain: dom, // replace with the actual domain
            availability: true, // replace with the actual availability
            page: 1,
            pageSize: 10,
          },
        });
        setFilteredUsers(result.data);
      } catch (error) {
        console.error('Error fetching filtered users:', error);
      }
    };

    fetchData();
  }, [dom]);

  const handleCheckboxChange = (userId) => {
    const updatedUsers = selectedUsers.includes(userId)
      ? selectedUsers.filter((id) => id !== userId)
      : [...selectedUsers, userId];
    setSelectedUsers(updatedUsers);
  };

  const handleCreateTeam = async () => {
    try {
      const newTeam = { name: teamName, users: selectedUsers };
      const result = await axios.post(`${props.url}/api/teams`, newTeam);
      alert('Team created');
      setTeamName('');
      setSelectedUsers([]);
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  return (
    <div>
      <div className='teamname'>
        <h1 style={{textAlign:"center" , color:"white" , margin:"30px"}}>Create Team</h1>
        <div style={{display:"flex" , flexWrap:"wrap" , width:"500px" , justifyContent:"space-between" , alignItems:"center",marginBottom:"30px"}}>
        <button className="btn" onClick={()=>{setdom('Sales')}}>Sales</button>
        <button className="btn" onClick={()=>{setdom('Finance')}}>Finance</button>
        <button className="btn" onClick={()=>{setdom('Business Development')}}>Bussiness Dev.</button>
        <button className="btn" onClick={()=>{setdom('UI Designing')}}>UI Designing</button>
        <button className="btn" onClick={()=>{setdom('IT')}}>IT</button>
        </div>
        <div style={{display:'flex' , flexDirection:"column"  , justifyContent:"center" , alignItems:"center"}}>
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)} 
          />
          <button onClick={handleCreateTeam} className='button-86'>Create Team</button>
        </div>
      </div>
      <h3 style={{textAlign:"center" , color:"yellow" , margin:"30px"}}>Select Users</h3>
      <div className='usrcon'>
        {filteredUsers.map((user) => (
          <div key={user._id}>
            <input
              type="checkbox"
              value={user._id}
              checked={selectedUsers.includes(user._id)}
              onChange={() => handleCheckboxChange(user._id)} style={{position:"relative", top:"15%" , left:"10%" , zIndex:"100"}}
            />
            <Usrcard key={user.id} name={user.first_name + " " + user.last_name} img = {user.avatar} domain={user.domain} email={user.email}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateTeam;
