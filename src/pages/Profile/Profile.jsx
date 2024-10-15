import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {auth, db, storage} from '../../../firebase.js'
import {doc, getDoc} from 'firebase/firestore'
import {toast} from 'react-toastify'
import {getDownloadURL, listAll, ref, uploadBytes} from 'firebase/storage'
import {v4} from 'uuid'
import Header from '../../components/Header/Header.jsx'
import backArrow from '../../assets/icons/backArrow.svg'
import './_Profile.scss'

const Profile = () => {
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState(null)
  const [img, setImg] = useState(null)
  const [imgUrl, setImgUrl] = useState([])

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user)
        const docRef = doc(db, 'User', user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setUserDetails(docSnap.data())
          console.log(docSnap.data())
        } else {
          console.log('No user data found')
        }
      } else {
        console.log('User is not logged in')
        navigate('/login')
      }
    })
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const handleLogout = async () => {
    try {
      await auth.signOut()
      navigate('/')
      console.log('User logged out successfully')
    } catch (error) {
      console.log('Error logging out', error.message)
      toast.error('Error logging out: ' + error.message)
    }
  }

  const handleClick = () => {
    if (!img) {
      toast.error('No file selected')
      return
    }

    const imgRef = ref(storage, `files/${v4()}`)
    uploadBytes(imgRef, img)
        .then(() => {
          toast.success('File uploaded successfully')
        })
        .catch((error) => {
          toast.error('Error uploading file: ' + error.message)
        })
  }

  useEffect(() => {
    const fetchImages = async () => {
      const listRef = ref(storage, 'files')
      const imgs = await listAll(listRef)

      const urls = await Promise.all(
          imgs.items.map(async (item) => {
            const url = await getDownloadURL(item)
            return url
          })
      )
      setImgUrl(urls)
    }

    fetchImages()
  }, [])

  return (
      <>
        <Header/>
        <section className="profile">
          <div className="profile__container container">
            {userDetails ? (
                <>
                  <div className="profile__left">
                    {/* Фотография */}
                    <div className="profile__img-wrapper">
                      {imgUrl.length > 0 ? (
                          <img
                              src={imgUrl[0]}
                              alt="Profile"
                              className="profile__img"
                              onClick={() => document.getElementById('imgInput').click()}
                          />
                      ) : (
                          <div
                              className="profile__img-placeholder"
                              onClick={() => document.getElementById('imgInput').click()}
                          >
                            Click to upload
                          </div>
                      )}
                      <input
                          id="imgInput"
                          type="file"
                          style={{display: 'none'}}
                          onChange={(e) => setImg(e.target.files[0])}
                      />
                    </div>
                    <button className="profile__upload" onClick={handleClick}>
                      Upload
                    </button>
                  </div>
                  <div className="profile__right">
                    <h3
                        className="profile__title">Вітаємо {userDetails.firstName}!</h3>
                    <p className="profile__item">Email: {userDetails.email}</p>
                    <p
                        className="profile__item">Прізвище: {userDetails.firstName}</p>
                    <p className="profile__item">Ім'я: {userDetails.lastName}</p>
                    <div className="profile__btn">
                      <img src={backArrow} alt="backArrow" className="profile__btn-img"/>
                      <button onClick={handleLogout}>Вийти</button>
                    </div>
                  </div>
                </>
            ) : (
                <div className={'loading'}></div>
            )}
          </div>
        </section>
      </>
  )
}

export default Profile