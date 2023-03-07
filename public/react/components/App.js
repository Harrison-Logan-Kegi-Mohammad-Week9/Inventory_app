import React, { useState, useEffect } from 'react';
import { SaucesList } from './SaucesList';
import { Routes, Route } from "react-router-dom";

// import and prepend the api url to any fetch calls
import apiURL from '../api';
import { useSyncExternalStore } from 'react';
import { Login } from "./Login"
import { Signup } from "./Signup"

export const App = () => {
	return <>
	<Routes>
		<Route exact path="/" element={<Login />} />
		<Route path="signup" element={<Signup/>} />
  </Routes>
  </>
}