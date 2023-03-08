import React, { useState, useEffect } from 'react';
import apiURL from '../api';
import { useNavigate } from 'react-router-dom'

export const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [items, setItems] = useState([])
  const [isAddingItem, setIsAddingItem] = useState(false)
  console.log(items)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
        const email = sessionStorage.getItem('email');
        const noQuotes = email.replace(/"/g, '')
        const response = await fetch(`${apiURL}/users/${noQuotes}`);
        const data = await response.json();
        setUserData(data[0]);
    };

    const fetchItems = async () => {
      const response = await fetch(`${apiURL}/items`)
      const data = await response.json()
      setItems(data)
    }
    fetchItems();
    fetchUserData();
  }, []);

  const logout = () => {
    sessionStorage.removeItem('email')
    navigate('/')
  }

  return userData ? (<>
    <h2>LOGGED IN</h2>
    <h3>Welcome {userData.username}</h3>
    <div className='items-box'>
    {items.map((item, i) => <img key={i} className="items-dashboard" src={item.image} />)}
    </div>
    <button onClick={() => setIsAddingItem(!isAddingItem)}>ADD ITEM</button>
    <button onClick={logout}>Logout</button>
    {isAddingItem && <h1>Hello</h1>}
    </>
  ): null
};


/*
1. Display items belonging to user
2. Give the user the ability to add items to their inventory
3. Diaplay single page view for each item
*/