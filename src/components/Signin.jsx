import React, { useState } from 'react'
import { auth,functions,firestore } from '../firebase/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useContext } from 'react';
import { statusSignContext,userContext,userDet } from '../context/context';
import { useNavigate } from 'react-router-dom';
import { httpsCallable } from 'firebase/functions';
import { doc, getDoc, getDocs } from 'firebase/firestore';
const Signin = () => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [name,setName]=useState('');
  const [otp,setOtp]=useState('');
  const [otpSent,setOtpSent]=useState(false);
  const statusUser=useContext(statusSignContext);
  const navigate=useNavigate();
  const signStatus=useContext(userContext);
  const userData=useContext(userDet);
  const handleLogin=async (e)=>{
    e.preventDefault();
    try{
        await signInWithEmailAndPassword(auth,email,password);
        userData.setUsername(name);
        statusUser.setStatusSign(true);
        console.log(statusUser.statusSign);
        console.log('User Signed In');
        navigate("/");
    }catch(error){
      console.error(error);
    }
  }
  return (
    <div>
      <div className="reg-box">
          <form className="reg-form" onSubmit={handleLogin}>
            <h3 className="sign-title">Sign In to your account!</h3>
            <input type="text" required placeholder='Name*' onChange={(e)=>setName(e.target.value)}></input>
            <input type='email' required placeholder='Email*' onChange={(e)=>{setEmail(e.target.value)}}></input>
            <input type='password' required placeholder='6 Digit Security Pin* ' onChange={(e)=>{setPassword(e.target.value)}}></input>
            <button type="submit" className='sign-btn'>Submit</button>
            <p>Do not have an account ? <span className='btn-link'>Sign Up</span></p>
          </form>
      </div>
    </div>
  )
}

export default Signin
