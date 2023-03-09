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
            navigate('/dashboard')
        }
    }

    return <div>
        <section>
            <h1>{itemData.title}</h1><br/>
            <img src={itemData.image}/><br/>
            <p><span>Category:</span> {itemData.category}</p><br/>
            <p><span>Description:</span> {itemData.description}</p><br/>
            <p><span>Price:</span> £{itemData.price}</p><br/>
            <button onClick={() => editItem()}>EDIT ITEM</button>
            {editingItem && <EditForm setEditingItem={setEditingItem} itemData={itemData}/>}
            <button onClick={() => deleteItem()}>DELETE ITEM</button>
            {itemNotFound && <p id='error'>Item not found</p>}
        </section>
    </div>
}