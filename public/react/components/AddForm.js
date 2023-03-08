import React, { useState, useEffect } from 'react';
import apiURL from '../api';
import { useNavigate } from 'react-router-dom';

export const AddForm = (props)=>{

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [url, setURL] = useState('')
    console.log(url)

    const uploadImage = async(e) =>{
        try{
            e.preventDefault()
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "Inventory")
            data.append("cloud_name", "dqtomfaef")
            const response = await fetch("https://api.cloudinary.com/v1_1/dqtomfaef/image/upload",{
                method:"post",
                body: data
            })
            const urlData = await response.json()
            console.log(urlData)
            setURL(urlData.url)
        }
        catch(e){
            window.alert('error')
        }
    }
    
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
            props.setIsAddingItem(false)
        }
        catch(e){
            window.alert('Something went wrong :(')
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
                <label>Image</label><br></br>
                <input type='file' placeholder='Enter Image' onChange={e => setImage(e.target.files[0])}></input><br></br>
                <button onClick={uploadImage}>Upload</button>
                <button type='submit' onClick={addForm}>Add item</button>
            </form><br></br>
            </div>
        </main>
    )
}

//Add in fetch for the add form on submit
