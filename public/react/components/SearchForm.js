import React, { useState, useEffect } from 'react';
import apiURL from '../api';
import { useNavigate } from 'react-router-dom';

export const SearchForm = (props) => {
    
    const [category, setCategory] = useState('')
    
    const addForm = async(e) =>{
        try{
            e.preventDefault()
            console.log(category)

            const response = await fetch(`${apiURL}/items/search/${category}`);
            if (response.status == 400){
                window.alert('error')
            }else{
                const data = await response.json()
                props.setItems(data)
                props.setIsFiltered(true)
                props.setIsSearching(false)
                console.log(data)
            }
        }
        catch(e){
            console.log(e)
            window.alert('something went wrong :(')
        }
    }

    return (
        <main>	
            <div className='container'>
                <form onSubmit={addForm}>
                    <label>Category</label><br></br>
                    <input type='text' placeholder='Enter Category' onChange={e => setCategory(e.target.value)}></input><br></br>
                    <button type='submit' onClick={addForm}>Search</button>
                </form><br></br>
            </div>
        </main>
    )
};