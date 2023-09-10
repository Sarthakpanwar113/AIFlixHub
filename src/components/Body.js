import React, { useEffect } from 'react'
import Browser from './Browser';
// import Body from './Body';
import Login from './Login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from './utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from './utils/userSlice';

const Body = () => {

    const dispatch = useDispatch();
    

    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login />,
        },
        {
            path: '/browse',
            element: <Browser />,
        }
    ]);
    //ek baar karna tha toh we use useeffect 
    useEffect(()=> {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in,              
              const {uid, email, displayName, photoURL} = user;
              //store uid email display name etc
              dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL,}));

              


              // ...
            } else {
              // User is signed out
              dispatch(removeUser());
             
            }
          });
          

    },[]);



    return (
        <div>
            <RouterProvider router= {appRouter} />

        </div>
    )
}

export default Body;