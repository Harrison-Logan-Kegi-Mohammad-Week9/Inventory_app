import React, { useState, useEffect } from 'react';
import apiURL from '../api';
import { useNavigate } from 'react-router-dom';

export const SingleItem = () =>{

    const [itemData, setItemData] = useState('');
    const id = sessionStorage.getItem('itemId')

    useEffect(() => {

        const fetchItem = async () => {

            const response = await fetch(`${apiURL}/items/${id}`)
            const data = await response.json()
            console.log(data)
            setItemData(data)
        }
        fetchItem();
      }, []);

    console.log(itemData.id)
    


    return <div>
        <section>
            <h1>{itemData.title}</h1><br/>
            <img src={itemData.image}/><br/>
            <p><span>Category:</span> {itemData.category}</p><br/>
            <p><span>Description:</span> {itemData.description}</p><br/>
            <p><span>Price:</span> £{itemData.price}</p><br/>
        </section>
    </div>
}