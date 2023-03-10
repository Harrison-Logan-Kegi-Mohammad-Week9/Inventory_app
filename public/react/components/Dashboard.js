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
    window.alert("Successfully Logged Out!")
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

  return userData ? (<main className='form-bg'>
      <h2 id='header'>Welcome {userData.username}</h2>
      <h3 id='header'>Click the items below for inventory details</h3><br></br>
      <div className='items-box'>
        {items.map((item, i) =>
        <div className='single-box'> 
          <a onClick={() => itemView(item.id)}>
            <div className='image-container'>
              <img key={item.id} className="items-dashboard hovering" src={item.image} />
            </div>
            <p>{item.title}</p>
          </a>
          </div>
        )}
      </div>
      <div className='button-list'>
        <button onClick={() => setIsAddingItem(!isAddingItem)}>{isAddingItem ? "CLOSE" : "ADD ITEM"}</button><br></br><br></br>
        {isAddingItem && <AddForm setIsAddingItem={setIsAddingItem}/>}
        <button onClick={() => setIsSearching(!isSearching)}>{isSearching ? "CLOSE" : "SEARCH"}</button><br></br><br></br>
        {isSearching && <SearchForm setIsSearching={setIsSearching} setItems={setItems} setIsFiltered={setIsFiltered}/>}
        {isFiltered && <><button onClick={removeFilter}>Get All Results</button><br></br><br></br></>}
        <button onClick={logout}>Logout</button>
      </div>
    </main>
  ): null
};


/*
1. Display items belonging to user
2. Give the user the ability to add items to their inventory
3. Diaplay single page view for each item
*/