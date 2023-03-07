import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import apiURL from '../api';


export const Signup = () =>{

    const [signup, setSignup] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signupHandler = async(e) => {
        try{
            e.preventDefault();
            //call the db to check if the user exists, if not add them to the db
            const dataToSend = {
                username:name,
		    	email:email,
		    	password:password
		    }

            const response = await fetch(`${apiURL}/users/signup`, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                   dataToSend
                )
		    });

		    if (response.status != 201){
		    	window.alert("Error has occured")
		    }else{
                setSignup(true)
            }
        }
        catch(e){
            window.alert("Account already exists")
        }
    }

    if (signup == false){
        return (
            <main>	
                <div className='container'>
                <form onSubmit={signupHandler}>
                    <label>Name</label><br></br>
                    <input type='text' placeholder='Enter name' onChange={e => setName(e.target.value)}></input><br></br>
                    <label>Email</label><br></br>
                    <input type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)}></input><br></br>
                    <label>Password</label><br></br>
                    <input type='password' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)}></input><br></br>
                    <button type='submit' onClick={signupHandler}>Create account</button>
                </form><br></br>
                <Link to="/"><button>Go Back</button></Link>
                </div>
            </main>
        )
    }else{
        return <h2>LOGGED IN</h2>
    }
}