import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import apiURL from '../api';
import { useNavigate } from "react-router-dom";




export const Signup = () => {
    const navigate = useNavigate()

    const [signup, setSignup] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mandatoryFieldsError, setMandatoryFieldsError] = useState(false)

    const signupHandler = async (e) => {
        try {
            e.preventDefault();
            //call the db to check if the user exists, if not add them to the db
            const dataToSend = {
                username: name,
                email: email,
                password: password
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

            if (response.status == 500) {
                window.alert("Account already exists")
            } else if (response.status == 400) {
                setMandatoryFieldsError(true)
            } else if (response.status == 201) {
                setSignup(true)
            }
        }
        catch (e) {
            window.alert("Error")
        }
    }

    if (signup == false) {
        return (
            <main className='form-bg'>	
                <div className='form-container'>
                <h1>Signup Page</h1><br></br><br></br>
                    {mandatoryFieldsError && <p id='error'>Please fill out all fields</p>}
                    <form onSubmit={signupHandler} className="form">
                        <label>Name</label><br></br>
                        <input type='text' placeholder='Enter name' onChange={e => setName(e.target.value)}></input><br></br>
                        <input type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)}></input><br></br>
                        <input type='password' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)}></input><br></br>
                        <div className='button-list'>
                        <button type='submit' onClick={signupHandler}>Create account</button>
                        <Link className='form-link' to="/">Already have an account?</Link>
                        </div>
                    </form><br></br>
                </div>
            </main>
        )
    } else {
        sessionStorage.setItem('email', JSON.stringify(email))
        navigate('/dashboard')
    }
}