import React, {useEffect, useState} from 'react';
import {HashRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import {ToastContainer} from 'react-toastify';
import Profile from './pages/Profile/Profile.jsx';
import {auth} from '../firebase.js';
import Olympiads from './pages/Olympiads/Olympiads.jsx';
import Home from './pages/Home/Home.jsx';
import './scss/style.css';

const App = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true); // Добавляем состояние загрузки

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setUser(user);
			setLoading(false); // Завершаем загрузку, когда получаем пользователя
		});
		return () => unsubscribe(); // Отписываемся при размонтировании
	}, []);

	if (loading) {
		return <div>Loading...</div>; // Пока идет загрузка, отображаем сообщение или спиннер
	}

	return (
			<Router>
				<Routes>
					<Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
					<Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
					<Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
					<Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
					<Route path="/olympiads" element={<Olympiads />} />
				</Routes>
				<ToastContainer />
			</Router>
	);
};

export default App;
