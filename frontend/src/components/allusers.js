import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Usrcard from './usercard';
import "./style.css";
export default function Allusrs(props){
    const [users, setUsers] = useState([]);
    const [pageval , setpage]=useState(1);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await axios.get(`${props.url}/api/users`, {
            params: {
              page: pageval, // Specify the desired page
              pageSize: 10, // Specify the desired page size
            },
          });
          setUsers(result.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [pageval]);
    return(<>
        <div style={{width:"100%" , display:"flex" ,textAlign:"center", flexDirection:"column"}}>
      <h1 style={{color:"white"}}>User List</h1>
      <div className='usrcon'>
        {users.map((user) => (
          <Usrcard key={user.id} name={user.first_name + " " + user.last_name} img = {user.avatar} domain={user.domain} email={user.email}/>
        ))}
      </div>
      <div style={{display:"flex" , margin:"30px auto " , justifyContent:"center" , alignItems:"center"}}>
      <button className='page-btn' onClick={()=>{setpage(pageval-1)}} disabled={pageval < 1}>{'<'}</button><span style={{color:"white",margin:"10px"}}>{pageval}</span>
      <button className='page-btn' onClick={()=>{setpage(pageval+1);}} >{'>'}</button>
      </div>
    </div>
    </>)
}