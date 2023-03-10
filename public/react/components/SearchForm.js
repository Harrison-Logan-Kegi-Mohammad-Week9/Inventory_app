import React, { useState, useEffect } from 'react';
import apiURL from '../api';
import { useNavigate } from 'react-router-dom';

export const SearchForm = (props) => {
    
    const [optionList, setOptionList] = useState([])
    console.log(optionList)
    const [chosenCategory, setChosenCategory] = useState('')
    console.log(chosenCategory)
    
    const search = async(e) =>{
        try{
            e.preventDefault()

            const response = await fetch(`${apiURL}/items/search/${chosenCategory}`);
            if (response.status == 400){
                window.alert('error')
            }else{
                const data = await response.json()
                console.log(data)
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

    useEffect(() => {
        const fetchCategories = async () => {
            try{
                const response = await fetch(`${apiURL}/items`)
                if (response.status == 400){
                    window.alert('error')
                }else{
                    const data = await response.json()
                    const categoryList = data.map(object => object.category) //every category in database

                    let optionArr = [] // contains every category option (minus any duplicates)
                    optionArr.push(categoryList[0])
                    for(let i = 1; i < categoryList.length; i++) {
                        if (categoryList[i] == categoryList[i - 1]) {
                            continue;
                        } else {
                            optionArr.push(categoryList[i])
                        }
                    }
                    setOptionList(optionArr)
                    setChosenCategory(optionArr[0])
                }
            }
            catch(e){
                console.log(e)
                window.alert('something went wrong :(')
            }
        }
        fetchCategories()
    }, [])

    return (
        <main>	
            <div className='dashboard-container'>
                <form className='dashboard-form' onSubmit={search}>
                    <h2>Filter By Category</h2><br></br>
                    <label>Category</label><span id='mandatory'>*</span><br></br>
                    <select onChange={(e) => setChosenCategory(e.target.value)}>
                        {optionList.map(option => <option value={option}>{option}</option>)}    
                    </select><br></br><br></br>
                    <button type='submit' onClick={search}>Search</button>
                </form><br></br>
            </div>
        </main>
    )
};