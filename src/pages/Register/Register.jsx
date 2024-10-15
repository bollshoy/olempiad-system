import React, {useState} from 'react'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {NavLink} from 'react-router-dom'
import {auth, db} from '../../../firebase.js'
import {doc, setDoc} from 'firebase/firestore'
import './_Register.scss'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const openModel = () => {
    setIsOpen(true)
  }

  const closeModel = () => {
    setIsOpen(false)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    console.log('Email:', email)
    console.log('Password:', password)

    if (email === '' || password.length < 6) {
      console.log('Please enter a valid email and password (at least 6 characters).')
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      const user = auth.currentUser
      if (user) {
        await setDoc(doc(db, 'User', user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
        });
        openModel();
      }
    } catch (error) {
      console.log(error.message)
    }
  }


  return (
      <div className="register">
        <div className="register__container container">
          <h3 className="form__title">Реєстрація</h3>
          <form className="form" onSubmit={handleRegister}>
            <div className="email__form form__item">
              <label htmlFor={'email'}>Ел. Пошта</label>
              <input
                  className={'form__input'}
                  type="email"
                  name={email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="password__form form__item">
              <label htmlFor="password">Пароль</label>
              <input
                  className={'form__input'}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="lname__form form__item">
              <label htmlFor="lname">Прізвище</label>
              <input
                  type="text"
                  className={'form__input'}
                  onChange={(e) => setLname(e.target.value)}
              />
            </div>
            <div className="fname__form form__item">
              <label htmlFor="lname">Ім'я</label>
              <input
                  type="text"
                  className={'form__input'}
                  onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <NavLink to={'/login'} className={'register__link'}>В мене є акаунт</NavLink>
            <div className="form__btn">
              <button type={'submit'} className={'form-btn'}>Зареєструватися</button>
            </div>
          </form>
          {isOpen && (
              <dialog className={'register__dialog'} open>
                <p className={'dialog__text'}>Ви успішно зареєструвалися!</p>
                <NavLink to={'/profile'}>
                  <button className={'dialog__btn'} onClick={closeModel}>Далі</button>
                </NavLink>
              </dialog>
          )}
        </div>
      </div>
  )
}

export default Register