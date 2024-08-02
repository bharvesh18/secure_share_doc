import React from 'react'
import { LuDownload } from "react-icons/lu";
import { IoMdMore } from "react-icons/io";
import { useState,useEffect } from 'react';
import { collection,getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/firebaseConfig';
import { storage } from '../firebase/firebaseConfig';
import { ref,listAll,getMetadata,getDownloadURL, deleteObject } from 'firebase/storage';
import { MdEmail } from "react-icons/md";
import emailjs from '@emailjs/browser';
import { auth } from '../firebase/firebaseConfig';
import { useContext } from 'react';
import { showDocs } from '../context/context';
import { MdDelete } from "react-icons/md";
const Store = ({setUpBtn}) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mail,setMail]=useState(false);
  const [fileName,setFileName]=useState(null);
  const [sname,setSName]=useState(null);
  const [fshare,setFshare]=useState(null);
  const showList=useContext(showDocs);
  useEffect(() => {
    const user=auth.currentUser;
    const fetchFiles=async()=>{
      try{
        const listRef=ref(storage,`documents/${user.uid}`);
        const res=await listAll(listRef);
        const filePromises=res.items.map(async(itemRef)=>{
          const metadata=await getMetadata(itemRef);
          const downloadURL=await getDownloadURL(itemRef);
          return{
            name:metadata.name,
            lastModified:new Date(metadata.updated).toLocaleString(),
            downloadURL:downloadURL,
          };
        });
        const fileData=await Promise.all(filePromises);
        setFiles(fileData);
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);
  const handleDownload=(url)=>{
    const link=document.createElement('a');
    link.href=url;
    link.target='_blank';
    link.download=url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  const sendEmail = (name,file,fname,rmail) => {
      const templateParams={
        from_name:name,
        toemail:rmail,
        message:file,
      }

      emailjs.send(
        'service_ibo5bje',
        'template_h15ri7c',
        templateParams,
        '4O4H2OHsPnEDPwi0O'
      ).then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }).catch((error) => {
        console.error(error)
      });
  };
  const deleteFile=async (fname)=>{
    const user=auth.currentUser;
    const storageRef=ref(storage,`documents/${user.uid}/${fname}`)
    try{
      await deleteObject(storageRef);
      setFiles(files.filter(F=>F.name!=fname));
    }
    catch(error){
      console.log('File deletion unsuccessful ',error);
    }

  }
  return (
    <div>
       <div className="gall-box">
       <div className="close-box close-box-lib" style={{color:'black'}} onClick={()=>{setUpBtn(false)}}>&times;</div>
        <h3 className="gall-title">You have {files.length} Issued Documents</h3>
        {mail &&(
        <div className="upload-box share-box">
          <div className="close-box" style={{color:'black'}} onClick={()=>{setMail(false)}}>&times;</div>
          <h3 className="share-title">Sharing {fileName}</h3>
          <form className='share-form' onSubmit={sendEmail}>
            <input type='text' placeholder='Enter Your Name' required onChange={(e)=>setSName(e.target.value)}></input>
            <input type='email' placeholder='Enter recipient Email ID' required onChange={(e)=>setMail(e.target.value)}></input>
            <button className='reg-btn'onClick={(e)=>{e.preventDefault();sendEmail(sname,fshare,fileName,mail)}}type='submit'>SEND</button>
          </form>
        </div>
      )}
        <p style={{ color: 'black' }}>Documents you stored on I-Locker can be downloaded and viewed from here</p>
        <div className="doc-list">
          {loading ? (
            <p>Loading...</p>
          ) : (
            files.map((file, index) => (
              <div className="doc" key={index}>
                <div className="doc-title">{file.name}</div>
                <div className="doc-time">{file.createdAt?.toDate().toLocaleString()}</div>
                <div className="doc-menu">
                  <LuDownload style={{ cursor: 'pointer' }} onClick={()=>{handleDownload(file.downloadURL)}}/>
                  <MdEmail onClick={()=>{setMail(true);setFileName(file.name);setFshare(file.downloadURL)}}/>
                  <MdDelete onClick={(e)=>{e.preventDefault();deleteFile(file.name)}} style={{cursor:'pointer'}}/>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Store
