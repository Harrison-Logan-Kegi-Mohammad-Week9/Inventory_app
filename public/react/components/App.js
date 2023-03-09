import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

// import and prepend the api url to any fetch calls
import apiURL from '../api'
import { Dashboard } from './Dashboard';
import { Login } from "./Login"
import { Signup } from "./Signup"
import { SingleItem } from "./SingleItem"

export const App = () => {
	return <>
	<Routes>
		<Route exact path="/" element={<Login />} />
		<Route path="signup" element={<Signup/>} />
		<Route path="dashboard" element={<Dashboard/>} />
		<Route path="item" element={<SingleItem/>} />
  </Routes>
  </>
}