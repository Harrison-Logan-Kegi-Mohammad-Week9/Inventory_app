import React, { useState, useEffect } from 'react';
import apiURL from '../api';
import { useNavigate } from 'react-router-dom';

export const AddForm = ()=>{

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState(null)
    const [category, setCategory] = useState('')

    const addForm = (e) =>{
        e.preventDefault()
        console.log('form added')
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
                <label>Image</label><br></br>
                <input type='file' placeholder='Enter Image' onChange={e => setImage(e.target.value)}></input><br></br>
                <button type='submit' onClick={addForm}>Create account</button>
            </form><br></br>
            </div>
        </main>
    )
}

//Add in fetch for the add form on submit