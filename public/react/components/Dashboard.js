import React, { useState, useEffect } from 'react';
import apiURL from '../api';
import { useNavigate } from 'react-router-dom'
import { AddForm } from './AddForm'
import { SearchForm } from './SearchForm'
export const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [items, setItems] = useState([])
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [isFiltered, setIsFiltered] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
        const email = sessionStorage.getItem('email');
        const noQuotes = email.replace(/"/g, '')
        const response = await fetch(`${apiURL}/users/${noQuotes}`);
        const data = await response.json();
        setUserData(data[0]);
    };

    const fetchItems = async () => {//find all results
      const response = await fetch(`${apiURL}/items`)
      const data = await response.json()
      setItems(data)
    }
    if (isFiltered == false){
      fetchItems();
      fetchUserData();
    }
  }, [isAddingItem, isFiltered]);

  const logout = () => {
    sessionStorage.removeItem('email')
    navigate('/')
  }

  const itemView = (id) =>{
    console.log(id)
    sessionStorage.setItem('itemId', JSON.stringify(id))
    navigate('/item')
  }

  const removeFilter = () => {
    setIsFiltered(false)
  }

  return userData ? (<>
      <h2>LOGGED IN</h2>
      <h3>Welcome {userData.username}</h3>
      <div className='items-box'>
        {items.map((item, i) => 
          <a onClick={() => itemView(item.id)}>
            <img key={item.id} className="items-dashboard" src={item.image} />
          </a>
        )}
      </div>
      <button onClick={() => setIsAddingItem(!isAddingItem)}>ADD ITEM</button>
      <button onClick={() => setIsSearching(!isSearching)}>SEARCH</button>
      <button onClick={logout}>Logout</button>
      {isFiltered && <button onClick={removeFilter}>Get All Results</button>}
      {isAddingItem && <AddForm setIsAddingItem={setIsAddingItem}/>}
      {isSearching && <SearchForm setIsSearching={setIsSearching} setItems={setItems} setIsFiltered={setIsFiltered}/>}
    </>
  ): null
};


/*
1. Display items belonging to user
2. Give the user the ability to add items to their inventory
3. Diaplay single page view for each item
*/