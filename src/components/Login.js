// rafce- react function component export 
import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from './utils/validate';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../components/utils/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';
import { USER_AVTAR } from './utils/constants';


const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);



  const handleButtonClick = () => {
    //validate the form data

    // console.log(email.current.value);
    // console.log(password.current.value);

    const message = checkValidData(email.current.value, password.current.value)
    //email and password check for validation
    // console.log(message);
    setErrorMessage(message);

    //if error then  return no go ahead
    if (message) return;

    //sign in sign up logic
    if (!isSignInForm) {
      //sign up logic
      //whenever we net auth we will import from firebase.js
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;

          //as user sign in nowupdate it
          updateProfile(user, {
            displayName: name.current.value, photoURL:USER_AVTAR,
          }).then(() => {

            //dispach the actio and update the user
            const {uid, email, displayName, photoURL} = auth.currentUser;
            //store uid email display name etc
            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL,}));
            
            // ...
          }).catch((error) => {
            // An error occurred
            setErrorMessage(error.message);
          });

          console.log(user);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          setErrorMessage(errorCode + "-" + errorMessage);
        });


    }
    else {
      //sign in logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
          // console.log(user);
         
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage)
        });


    }






    //ager valid then do sign in or signup

  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);

  };
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/42df4e1f-bef6-499e-87ff-c990584de314/5e7c383c-1f88-4983-b4da-06e14c0984ba/IN-en-20230904-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt='logo'
        />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-r-lg bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>

        {/* if isSignInForm is false then input will work */}
        {!isSignInForm && (
          < input ref={name}
            type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700' />
        )}

        <input ref={email}
          type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700' />



        <input ref={password}
          type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700' />

        <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>

        <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>

        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up" : "Alredy Registered? Sign in Now"}</p>
      </form>

    </div>
  );
};

export default Login