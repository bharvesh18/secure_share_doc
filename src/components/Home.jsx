import React from 'react'
import uploadpic from './upload_pic.avif'
import sharepic from './share_doc.jpeg'
import viewpic from './VIEW_DOC.jpeg'
import Share from './Share'
import { useState,useEffect } from 'react'
import Upload from './Upload'
import Store from './Store'
import Signin from './Signin'
import Register from './Register'
import { useContext } from 'react'
import { statusSignContext,registration,showDocs } from '../context/context'
const Home = () => {
  const sliderImgs=[uploadpic,viewpic]
  const [currSlide,setCurrSlide]=useState(0)
  const upshare=['Upload Documents','View Documents']
  const [fileOpt,setFileOpt]=useState(0);
  const [upBtn,setUpBtn]=useState(false);
  const statusUser=useContext(statusSignContext);
  const regUser=useContext(registration);
  const shOWlist=useContext(showDocs);
  const totalslide=sliderImgs.length
  const nextSlide=()=>{
    setCurrSlide((currSlide+1)%totalslide)
    setFileOpt((fileOpt+1)%upshare.length)
  }
  const prevSlide=()=>{
    setCurrSlide((currSlide-1+totalslide)%totalslide)
    setFileOpt((fileOpt-1+upshare.length)%upshare.length)
  }
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [currSlide]);
  return (
    <div>
      {regUser.register==true &&(
        <div className="reg-page" style={{backgroundColor:'white'}}>
        <Register/>
        </div>
      )}
      {statusUser.statusSign===false && regUser.register===false &&(
        <div className="reg-page" style={{backgroundColor:'white'}}>
        <Signin/>
        </div>
      )}
      {statusUser.statusSign===true && (
      <div className="home-locker">
        <div className="slide-show">
        {sliderImgs.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
        <button className="prev slide-btn" onClick={prevSlide}>&#10094;</button>
        <button className="next slide-btn" onClick={nextSlide}>&#10095;</button>
        <button className='upload-btn' on onClick={()=>{setUpBtn(true)}}>{upshare[fileOpt]}</button>
        {upBtn && fileOpt==0 &&(
          <>
            <div className="reg-page">
              <Upload setUpBtn={setUpBtn}/>
            </div>
          </>
        )}
        {
          upBtn && fileOpt==1 && (
            <>
              <div className="reg-page">
                <Store setUpBtn={setUpBtn}/>
              </div>
            </>
          )
        }
        </div>
      </div>
      )}
    </div>
  )
}

export default Home
