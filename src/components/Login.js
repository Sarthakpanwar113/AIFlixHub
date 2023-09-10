// rafce- react function component export 
import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from './utils/validate';

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);

  const email= useRef(null);
  const password= useRef(null);

  

  const handleButtonClick = () => {
    //validate the form data
    


    console.log(email.current.value);
    console.log(password.current.value);

    const message= checkValidData(email.current.value,password.current.value)
    //email and password check for validation
    // console.log(message);
    setErrorMessage(message);


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
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ?"Sign In" : "Sign Up"}</h1>

        {/* if isSignInForm is false then input will work */}
        {!isSignInForm && (
          < input type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700' />
        )}

        <input ref={email}
         type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700' />

        

        <input ref={password}
         type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700' />

         <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>

        <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ?"Sign In" : "Sign Up"}</button>

        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ?"New to Netflix? Sign Up" : "Alredy Registered? Sign in Now"}</p>
      </form>

    </div>
  );
};

export default Login