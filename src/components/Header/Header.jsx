import React from 'react'
import logo from '../../assets/images/ftlLogo.png'
import Navbar from '../Navbar/Navbar.jsx'
import './_Header.scss'

const Header = () => {
	return (
		<header className="header">
			<div className="header__container container">
				<div className="header__logo">
					<a href="#" className="logo">
						<img src={logo} alt="logo" className="logo__img"/>
					</a>
				</div>
				<Navbar/>
			</div>
		</header>
	)
}

export default Header