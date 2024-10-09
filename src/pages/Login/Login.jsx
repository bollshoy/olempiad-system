import React, {useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {auth} from '../../../firebase.js'
import {signInWithEmailAndPassword} from 'firebase/auth'
import './_Login.scss'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await signInWithEmailAndPassword(auth, email, password)
			console.log('User logged in successfully')
			navigate('/profile')
		} catch (error) {
			console.error('Login error:', error)
		}
	}
	
	return (
		<div className="login">
			<div className="login__container container">
				<h3 className="form__title">Авторизація</h3>
				<form className="form" onSubmit={handleSubmit}>
					<div className="email__form">
						<label htmlFor={'email'}>Ел. Пошта</label>
						<input
							className={'form__input'}
							type="email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="password__form">
						<label htmlFor="password">Пароль</label>
						<input
							className={'form__input'}
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<NavLink to={'/register'} className={'login__link'}>В мене немає акаунта</NavLink>
					<div className="form__btn">
						<button type={'submit'} className={'form-btn'}>Submit</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login
