import React, { useState, useEffect } from 'react';
import apiURL from '../api';
import { useNavigate } from 'react-router-dom';

export const EditForm = (props)=>{

    const [title, setTitle] = useState(props.itemData.title)
    const [description, setDescription] = useState(props.itemData.description)
    const [price, setPrice] = useState(props.itemData.price)
    const [category, setCategory] = useState(props.itemData.category)
    const [image, setImage] = useState('')
    const [uploaded, setUploaded] = useState(false)
    const [url, setURL] = useState(`${props.itemData.image}`)
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
            setTimeout(() => {
                setUploaded(false)
            }, 7000);
        }
        catch(e){
            window.alert('error')
        }
    }
    
    const edit = async(e) =>{
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
                window.alert("Item has successfully been updated!")
            }
        }
        catch(e){
            window.alert('something went wrong :(')
        }
    }

    return (
        <main className='edit-container'>	
            <div className='edit-form'>
                {error && <p id='error'>Please fill in all mandatory fields</p>}
                <form className='dashboard-form' onSubmit={edit}>
                    <h2>Edit Item</h2><br></br>
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
                    {uploaded && <><p>Photo successfully uploaded</p><br></br></>}
                    <button onClick={uploadImage}>Upload Image</button><br></br><br></br>
                    <button type='submit' onClick={edit}>Save Changes</button>
                </form><br></br>
            </div>
        </main>
    )
}