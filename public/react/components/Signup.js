import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


export const Signup = () =>{

    const [signup, setSignup] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signupHandler = async() => {
        //call the db to check if the user exists, if not add them to the db
        console.log(name)
    }

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
}