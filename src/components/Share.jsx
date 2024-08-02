import React, { useState } from 'react'
import dragdrop from './drag-drop.png'
const Share = ({setUpBtn}) => {
  const [file,setFile]=useState(null);
  const handleDrop=(e)=>{
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  }
  const handleDragOver=(e)=>{
    e.preventDefault();
  }
  const handleFileChange=(e)=>{
    setFile(e.target.files[0]);
  }
  return (
    <div>
      <div className="upload-box share-box">
        <div className="close-box" style={{color:'black'}} onClick={()=>{setUpBtn(false)}}>&times;</div>
        <h2 className="share-title">Transfer Files</h2>
        <p style={{fontSize:'18px',fontWeight:'500',display:'flex',justifyContent:'center',alignItems:'center'}}>Send files to this email:</p>
        <form className="share-form">
            <input type='email' required placeholder="Recipient's Mail"></input>
            <div className="drag-area share-drag-area" onDrop={handleDrop} onDragOver={handleDragOver}>
                <img src={dragdrop} alt="" className='img-invert img-share'/>
                <h3>Drag or Drop to Upload File</h3>
                <input 
            type="file" 
            id="fileInput" 
            style={{ display: 'none' }} 
            onChange={handleFileChange} 
          />
          <button className='browse-btn' onClick={() => document.getElementById('fileInput').click()}>Browse Files</button>
            </div>
            <button type='button' className='reg-btn' style={{height:'auto',width:'274px'}}>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Share
