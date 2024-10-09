import React, {useEffect, useState} from 'react'
import {HashRouter as Router, Routes, Route, Navigate} from 'react-router-dom' // Add semicolon here
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import {ToastContainer} from 'react-toastify'
import Profile from './pages/Profile/Profile.jsx'
import {auth} from '../firebase.js'
import Olympiads from './pages/Olympiads/Olympiads.jsx'
import Home from './pages/Home/Home.jsx'
import './scss/style.css'

const App = () => {
	const [user, setUser] = useState(null)
	
	useEffect(() => {
		auth.onAuthStateChanged(user => {
			setUser(user)
		})
	}, [])
	
	return (
		<Router>
			<Routes>
				<Route path={'/'} element={user ? <Home/> : <Login/>}></Route>
				<Route path="/login" element={<Login/>}/>
				<Route path="/register" element={<Register/>}/>
				<Route path="/profile"
				       element={user ? <Profile/> : <Navigate to="/login"/>}/>
				<Route path={'/olympiads'} element={<Olympiads/>}></Route>
			</Routes>
			<ToastContainer/>
		</Router>
	)
}

export default App
