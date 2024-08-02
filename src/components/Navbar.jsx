import React from 'react'
import { useState } from 'react'
import Register from './Register';
import Signin from './Signin';
import { statusSignContext,userContext,registration,userDet} from '../context/context';
import { useContext } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
const Navbar = () => {
  const regStatus=useContext(registration);
  const signStatus=useContext(userContext);
  const statusUser=useContext(statusSignContext);
  const userData=useContext(userDet);
  const handleSignOut=(e)=>{
    e.preventDefault();
    signOut(auth).then(()=>{
      userData.setUsername('');
      statusUser.setStatusSign(false);
      signStatus.setSignIn(false);
      console.log("User logged Out");
    }).catch((error)=>{
      console.log("Error: ",error);
    });
  }
  return (
    <div>
       <div className="nav-bar">
        <div className="logo-text">
            <h2>I-Locker</h2>
        </div>
        <div className="sign-opt">
          <div className="sign-in">
            {statusUser.statusSign===false && (
              <>
                <button className='sign-in-btn' onClick={()=>{signStatus.setSignIn(!signStatus.signIn)}}>SIGN IN</button>
              </>
            )}
            {statusUser.statusSign===true && (
              <>
                <button className='sign-in-btn' onClick={()=>{signStatus.setSignIn(false)}}>Welcome {userData.username}</button>
              </>
            )}
          </div>
          <div className="sep">|</div>
          {statusUser.statusSign==false && (
            <>
              <div className="sign-up"><button className='sign-up-btn' onClick={()=>{regStatus.setRegister(!regStatus.register);signStatus.setSignIn(true)}}>SIGN UP</button></div>
            </>
          )}
          {
            statusUser.statusSign==true && (
              <>
                <div className="sign-up"><button className='sign-up-btn' onClick={(e)=>handleSignOut(e)}>SIGN OUT</button></div>
              </>
            )
          }
        </div>
       </div>
       {
        regStatus.register && (
          <>
            <div className='reg-page' style={{backgroundColor:'white'}}>
            <Register/>
            </div>
          </>
        )
       }
       {
        userContext.signIn && (
          <>
            <div className="reg-page" style={{backgroundColor:'white'}}>
              <Signin/>
            </div>
          </>
        )
       }
    </div>
  )
}

export default Navbar
