import React, { useState, useEffect } from 'react';
import apiURL from '../api';
import { useNavigate } from 'react-router-dom';

export const EditForm = (props)=>{

    const [title, setTitle] = useState(props.itemData.title)
    const [description, setDescription] = useState(props.itemData.description)
    const [price, setPrice] = useState(props.itemData.price)
    const [category, setCategory] = useState(props.itemData.category)
    const [image, setImage] = useState(props.itemData.image)
    const [uploaded, setUploaded] = useState(false)
    const [url, setURL] = useState('https://static.thenounproject.com/png/778835-200.png')
    const [error, setError] = useState(false)

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
            setURL(urlData.url)
            setUploaded(true)
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
            const id = sessionStorage.getItem('itemId')
            const response = await fetch(`${apiURL}/items/${id}`, {
                method: "PUT",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                   dataToSend
                )
            });
            console.log(response)
            if (response.status == 400){
                setError(true)
            }else{
                props.setEditingItem(false)
            }
        }
        catch(e){
            window.alert('something went wrong :(')
        }
    }

    return (
        <main>	
            <div className='container'>
                {error && <p id='error'>Please fill in all mandatory fields</p>}
                <form onSubmit={addForm}>
                    <label>Title<span id='mandatory'>*</span></label><br></br>
                    <input type='text' placeholder='Enter Title' value={title} onChange={e => setTitle(e.target.value)}></input><br></br>
                    <label>Description</label><br></br>
                    <input type='text' placeholder='Enter Description' value={description} onChange={e => setDescription(e.target.value)}></input><br></br>
                    <label>Price<span id='mandatory'>*</span></label><br></br>
                    <input type='number' placeholder='Enter Price' value={price} onChange={e => setPrice(e.target.value)}></input><br></br>
                    <label>Category<span id='mandatory'>*</span></label><br></br>
                    <input type='text' placeholder='Enter Category' value={category} onChange={e => setCategory(e.target.value)}></input><br></br>
                    <label>Image</label><br></br>
                    <input type='file' placeholder='Enter Image'  onChange={e => setImage(e.target.files[0])}></input><br></br>
                    <button onClick={uploadImage}>Upload Image</button>
                    {uploaded && <p>Photo successfully uploaded</p>}
                    <button type='submit' onClick={addForm}>Save Changes</button>
                </form><br></br>
            </div>
        </main>
    )
}