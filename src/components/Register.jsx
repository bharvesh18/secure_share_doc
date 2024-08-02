import React from 'react'
import { useState } from 'react'
import {auth} from '../firebase/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth';
const Register = () => {
  const [name,setName]=useState('');
  const [dob,setDob]=useState('');
  const [tel,setTel]=useState('');
  const [email,setEmail]=useState('');
  const [pin,setPin]=useState('');
  const handleRegister=async(e)=>{
    e.preventDefault();
    try{
      await createUserWithEmailAndPassword(auth,email,pin);
      alert('Registration Successfully');
    }catch(error){
      alert('Registration Unsuccessfull');
      console.error(error);
    }
  }
  return (
    <div>
      <div className="reg-box">
        <h3 className="reg-title">Creating account is fast and easy!</h3>
        <form className="reg-form" onSubmit={handleRegister}>
          <input type="text" placeholder='Full Name*' required onChange={(e)=>{setName(e.target.value)}}></input>
          <label htmlFor='dob'>Date of Birth*</label>
          <input type='date' id='dob' onChange={(e)=>{setDob(e.target.value)}}></input>
          <div className="genders">
            <div><input type='radio' name='gender' id='male' value='male'></input><label htmlFor='male'>Male</label></div>
            <div><input type='radio' name='gender' id='female' value='female'></input><label htmlFor='female'>Female</label></div>
            <div><input type='radio' name='gender' id='others' value='others'></input><label htmlFor='others'>Others</label></div>
          </div>
          <input type='tel' required placeholder='Mobile Number*' onChange={(e)=>setTel(e.target.value)}></input>
          <input type="email" placeholder='Email ID' required onChange={(e)=>setEmail(e.target.value)}></input>
          <input type='password' required placeholder='Set 6 digit Security PIN*'onChange={(e)=>setPin(e.target.value)}></input>
          <button type='submit' className='reg-btn'>Submit</button>
          <p>Already have an account? <span className='btn-link'>Sign In</span></p>
        </form>
      </div>
    </div>
  )
}

export default Register
