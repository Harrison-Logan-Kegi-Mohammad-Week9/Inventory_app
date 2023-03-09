import React, { useState, useEffect } from 'react';
import apiURL from '../api';
import { useNavigate } from 'react-router-dom';

export const SearchForm = (props) => {
    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('')
    
    const addForm = async(e) =>{
        try{
            e.preventDefault()
            const dataToSend = {
                title:title,
                description:description,
                price:price,
                category:category,
                image:url
            }

            const response = await fetch(`${apiURL}/items`, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                   dataToSend
                )
            });
            if (response.status == 400){
                window.alert('error')
            }else{
                props.setIsAddingItem(false)
            }
        }
        catch(e){
            window.alert('something went wrong :(')
        }
    }

    return (
        <main>	
            <div className='container'>
                <form onSubmit={addForm}>
                    <label>Title</label><br></br>
                    <input type='text' placeholder='Enter Title' onChange={e => setTitle(e.target.value)}></input><br></br>
                    <label>Description</label><br></br>
                    <input type='text' placeholder='Enter Description' onChange={e => setDescription(e.target.value)}></input><br></br>
                    <label>Price</label><br></br>
                    <input type='number' placeholder='Enter Price' onChange={e => setPrice(e.target.value)}></input><br></br>
                    <label>Category</label><br></br>
                    <input type='text' placeholder='Enter Category' onChange={e => setCategory(e.target.value)}></input><br></br>
                    <button type='submit' onClick={addForm}>Search</button>
                </form><br></br>
            </div>
        </main>
    )
};