import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';


const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)
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


  const handlerGptSearchClick = () => {
    //toggle GPT search
    dispatch(toggleGptSearchView());
    //don't pass any value bcz it just toggle
  };


  const handleLanguageChange = (e) => {
    // console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };




  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black  z-10 flex  justify-between  '>
      <img className='w-44  '
        src={LOGO}
        alt='logo' />

      {user && (
        <div className=' flex p-2 '>

          {showGptSearch && (<select className='p-2 m-2 bg-gray-900 text-white ' onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}

          </select>)
          }
          <button className='py-2 px-4  bg-yellow-800 text-white mx-4 my-2 rounded-lg' onClick={handlerGptSearchClick}
          >
          {showGptSearch ? "HomePage" : " GPT SEARCH"}
          </button>

          <img className=' w-12 h-12" '
            src={user?.photoURL}
            alt='user-icon' />

          <button onClick={handleSignOut} className='font-bold text-white '>Sign Out</button>
        </div>
      )};

    </div>
  )
}

export default Header