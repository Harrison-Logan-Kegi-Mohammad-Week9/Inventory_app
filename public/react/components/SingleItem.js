import React, { useState, useEffect } from 'react';
import apiURL from '../api';
import { Navigate, useNavigate } from 'react-router-dom';
import { EditForm } from './EditForm'

export const SingleItem = () =>{
    const navigate = useNavigate()

    const [itemData, setItemData] = useState('');
    const [editingItem, setEditingItem] = useState(false);
    const [deletingItem, setDeletingItem] = useState(false);
    const [itemNotFound, setItemNotFound] = useState(false);
    const id = sessionStorage.getItem('itemId')

    useEffect(() => {

        const fetchItem = async () => {
            const response = await fetch(`${apiURL}/items/${id}`)
            const data = await response.json()
            console.log(data)
            setItemData(data)
        }
        fetchItem();
      }, [editingItem, deletingItem]);

    console.log(itemData.id)
    
    const editItem = async() =>{
        setEditingItem(!editingItem)
    }
    const deleteItem = async() =>{
        const response = await fetch(`${apiURL}/items/${id}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json'
            }
        });
        if (response.status == 404){
            setItemNotFound(true)
        }else{
            setDeletingItem(!deletingItem)
            sessionStorage.removeItem('itemId')
            window.alert("Item has successfully been deleted!")
            navigate('/dashboard')
        }
    }

    return <div className='form-bg'>
        <section>
            <div className='single-box-item'>
                <h1 className='header-single-item'>{itemData.title}</h1><br/>
                <div className='image-container'>
                    <img className="items-dashboard hovering" src={itemData.image}/><br/>
                </div>
                <p><span className='bold'>Category:</span> {itemData.category}</p><br/>
                <p><span className='bold'>Description:</span> {itemData.description}</p><br/>
                <p><span className='bold'>Price:</span> £{itemData.price}</p><br/>
                <div className='button-list'>
                    <button onClick={() => editItem()}>EDIT ITEM</button><br></br><br></br>
                    {editingItem && <EditForm setEditingItem={setEditingItem} itemData={itemData}/>}
                    <button onClick={() => deleteItem()}>DELETE ITEM</button><br></br><br></br>
                    <button onClick={() => navigate('/dashboard')}>GO BACK</button>
                    {itemNotFound && <p id='error'>Item not found</p>}
                </div>
            </div>
        </section>
    </div>
}