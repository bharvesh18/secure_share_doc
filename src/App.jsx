import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Signin from './components/Signin'
import Home from './components/Home'
import Profile from './components/Profile'
import Register from './components/Register'
import Upload from './components/Upload'
import Navbar from './components/Navbar'
import Documents from './components/Documents'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { statusSignContext,registration,userContext,userDet,showDocs } from './context/context'
function App() {
  const [username,setUsername]=useState('');
  const [statusSign,setStatusSign]=useState(false);
  const [register,setRegister]=useState(false);
  const [signIn,setSignIn]=useState(false);
  const [showLib,setShowLib]=useState(false);
  const router=createBrowserRouter([
    {
      path:"/",
      element:<><Navbar/><Home/></>
    },
    {
      path:"/profile",
      element:<><Navbar/><Profile/></>
    },
    {
      path:"/upload",
      element:<><Navbar/><Upload/></>
    },
    {
      path:"/documents",
      element:<><Navbar/><Documents/></>
    }
  ])
  return (
    <>
      <div className="main-page">
        <statusSignContext.Provider value={{statusSign,setStatusSign}}>
          <registration.Provider value={{register,setRegister}}>
            <userContext.Provider value={{signIn,setSignIn}}>
              <showDocs.Provider value={{showLib,setShowLib}}>
              <userDet.Provider value={{username,setUsername}}>
          <RouterProvider router={router}></RouterProvider>
          </userDet.Provider>
          </showDocs.Provider>
          </userContext.Provider>
          </registration.Provider>
        </statusSignContext.Provider>
      </div>
    </>
  )
}

export default App
