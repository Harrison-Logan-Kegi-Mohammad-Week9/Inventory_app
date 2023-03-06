import React, { useState, useEffect } from 'react';
import { SaucesList } from './SaucesList';

// import and prepend the api url to any fetch calls
import apiURL from '../api';
import { useSyncExternalStore } from 'react';

export const App = () => {

	// const [sauces, setSauces] = useState([]);
	// console.log(sauces)

	// async function fetchSauces(){
	// 	try {
	// 		const response = await fetch(`${apiURL}/sauces`);
	// 		const saucesData = await response.json();
			
	// 		setSauces(saucesData);
	// 	} catch (err) {
	// 		console.log("Oh no an error! ", err)
	// 	}
	// }

	// useEffect(() => {
	// 	fetchSauces();
	// }, []);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loggedIn, setLoggedIn] = useState(false)
	

	const submitHandler = async(e) =>{ //Need to fetch the Users model to verify the user (.findAll)
		e.preventDefault();
		console.log(email)
		console.log(password)
		setLoggedIn(true)
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
				</form>
				</div>
			</main>
		)
	}else{
		return <h1>LOGGED IN</h1>
	}
}