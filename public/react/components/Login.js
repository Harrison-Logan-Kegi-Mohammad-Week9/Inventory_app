import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const Login = () => {
	const navigate = useNavigate()

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loggedIn, setLoggedIn] = useState(false)
	

	const submitHandler = async(e) =>{ //Need to fetch the Users model to verify the user (.findAll)
		e.preventDefault();

		const dataToSend = {
			email:email,
			password:password
		}

		const response = await fetch(`${apiURL}/users/login`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
               dataToSend
            )
		});
		if (response.status == 200){
			setLoggedIn(true)
		}else{
			console.log(response)
			window.alert("Email or Password is incorrect")
		}
	}

	if (!loggedIn){
		return (
			<main>	
				<div className='container'>
				<form onSubmit={submitHandler} id='login-form'>
					<label>Email</label><br></br>
					<input type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)}></input><br></br>
					<label>Password</label><br></br>
					<input type='password' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)}></input><br></br>
					<button type='submit'>Log in</button>
				</form><br></br>
				<button onClick={() => navigate('/signup')}>Sign Up</button>
				</div>
			</main>
		)
	}else{
		return <h1>LOGGED IN</h1>
	}
}