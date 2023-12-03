import React from 'react';
import "./user.css";
export default function Usrcard(props){
    return(<>
    <div class="card-container">
	<img class="round" src={props.img} alt="user" />
	<h3>{props.name}</h3>
	<h6><a href={"mailto:"+`${props.email}`} style={{textDecoration:"none" , color:"white"}}>{props.email}</a></h6>
	
	<div class="buttons">
		<button class="primary">
			Message
		</button>
	</div>
	<div class="skills">
		<h6>Domain</h6>
		<ul>
			<li>{props.domain}</li>
		</ul>
	</div>
</div>
    </>)
}