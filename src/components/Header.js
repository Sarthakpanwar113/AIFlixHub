import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from './utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from './utils/userSlice';

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });

  };





  //ek baar karna tha toh we use useeffect 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in,              
        const { uid, email, displayName, photoURL } = user;
        //store uid email display name etc
        dispatch
          (addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
          );


        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");

      }
    });

    //logic for return from this component
    //we will unscubscribe the onauthstatechange when component unmounts this will unsubscribe onauth

    return() => unsubscribe();


  }, []);








  return (
    <div className='absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-44' src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
        alt='logo' />

      {user && (
        <div className='flex p-4'>
          <img className='w-12 h-12 '
            src={user?.photoURL}
            alt='user-icon' />

          <button onClick={handleSignOut} className='font-bold text-white'>Sign Out</button>
        </div>
      )};

    </div>
  )
}

export default Header