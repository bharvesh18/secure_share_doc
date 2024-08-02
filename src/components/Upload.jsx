import React from 'react'
import dragdrop from './drag-drop.png'
import { storage,firestore } from '../firebase/firebaseConfig'
import { ref,uploadBytesResumable,getDownloadURL } from 'firebase/storage'
import { collection,addDoc,serverTimestamp } from 'firebase/firestore'
import { useState } from 'react'
import { useContext } from 'react'
import { statusSignContext } from '../context/context'
import { auth } from '../firebase/firebaseConfig'
import Signin from './Signin'
const Upload = ({setUpBtn}) => {
  const [file,setFile]=useState(null);
  const [uploadProgress,setUploadProgress]=useState(0);
  const [message,setMessage]=useState('');
  const handleDrop=(e)=>{
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  }
  const handleDragOver=(e)=>{
    e.preventDefault();
  }
  const handleUpload=(e)=>{
    const user=auth.currentUser;
    e.preventDefault();
    if(!user || !file){
      return;
    }
    const storageRef=ref(storage,`documents/${user.uid}/${file.name}`);
    const uploadTask=uploadBytesResumable(storageRef,file);
    uploadTask.on('state_changed',
      (snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setUploadProgress(progress);
      },
      (error)=>{
        console.error('Upload Failed: ',error)
        setMessage('Upload Failed');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addDoc(collection(firestore, 'documents'), {
            name: file.name,
            url: downloadURL,
            createdAt: serverTimestamp(),
          });
          setMessage('Upload successful');
          setFile(null);
          setUploadProgress(0);
        });
      }
    )
  }
  const handleFileChange=(e)=>{
    setFile(e.target.files[0]);
  }
  return (
    <div>
      <div className="upload-box">
      <div className="close-box" onClick={()=>{setUpBtn(false)}}>&times;</div>
        <div className="drag-area" onDrop={handleDrop} onDragOver={handleDragOver}>
          <img src={dragdrop} alt="" className='img-invert'/>
          <h2>Drag or Drop to Upload File</h2>
          <input 
            type="file" 
            id="fileInput" 
            style={{ display: 'none' }} 
            onChange={handleFileChange} 
          />
          <button className='browse-btn' onClick={() => document.getElementById('fileInput').click()}>Browse Files</button>
        </div>
        {file && (
          <div>
            <p>Selected file: {file.name}</p>
            <button className='upload-btn' onClick={handleUpload}>Upload</button>
            <progress value={uploadProgress} max="100" />
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Upload
