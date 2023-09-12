import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import {auth} from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';


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

    return () => unsubscribe();


  }, []);








  return (
    // <div className='absolute w-screen px-8 py-2 bg-gradient-to-b  from-black z-10 flex  justify-between  '>
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between  '>
      {/* <img className='w-44 ' */}
      <img className='w-44 mx-auto md:mx-0 '
        src={LOGO}
        alt='logo' />

      {user && (
        // <div className=' p-2 '>
        <div className=' flex p-2 justify-between'>
          {/* <img className='w-12 h-12 ' */}
          <img className='hidden md:block w-12 h-12" '
            src={user?.photoURL}
            alt='user-icon' />

          <button onClick={handleSignOut} className='font-bold text-white'>Sign Out</button>
        </div>
      )};

    </div>
  )
}

export default Header