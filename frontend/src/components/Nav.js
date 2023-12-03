import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar(){
    return(<>
<nav class="navbar navbar-expand-lg bg-light" >
  <div class="container-fluid" style={{width:"100vw", paddingInline:"30px"}}>
    <Link class="navbar-brand" to="/">MY USER MANAGER</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarSupportedContent">
      <ul class="navbar-nav  mb-2 mb-lg-0 " style={{marginLeft:"auto"}}>
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/users">Users</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/createuser">Create User</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/teams">Teams</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>)
}