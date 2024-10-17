import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {auth, db} from '../../../firebase.js';
import {toast} from 'react-toastify';
import Header from '../../components/Header/Header.jsx';
import backArrow from '../../assets/icons/backArrow.svg';
import './_Profile.scss';

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async (user) => {
    try {
      if (user) {
        console.log(db)
        // const docRef = doc(db, 'User', user.uid);
        // const docSnap = await getDoc(docRef);

        if (false) {
          // setUserDetails(docSnap.data());
        } else {
          console.log('No user data found');
          toast.error('No user data found');
        }
      } else {
        console.log('User is not logged in');
        toast.error('User is not logged in');
        navigate('/login');
      }
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      fetchUserData(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
      console.log('User logged out successfully');
    } catch (error) {
      console.log('Error logging out', error.message);
      toast.error('Error logging out: ' + error.message);
    }
  };

  return (
      <>
        <Header />
        <section className="profile">
          <div className="profile__container container">
            {userDetails ? (
                <>
                  <div className="profile__left">
                  </div>
                  <div className="profile__right">
                    <h3 className="profile__title">Вітаємо {userDetails.firstName}!</h3>
                    <p className="profile__item">Email: {userDetails.email}</p>
                    <p className="profile__item">Прізвище: {userDetails.firstName}</p>
                    <p className="profile__item">Ім'я: {userDetails.lastName}</p>
                    <div className="profile__btn" onClick={handleLogout}>
                      <img src={backArrow} alt="backArrow" className="profile__btn-img" />
                      <button>Вийти</button>
                    </div>
                  </div>
                </>
            ) : (
                <div className={'loading'}></div>
            )}
          </div>
        </section>
      </>
  );
};

export default Profile;
