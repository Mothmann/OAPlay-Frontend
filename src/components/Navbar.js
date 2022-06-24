import React, {useContext, useState} from 'react';
import {UserContext} from "../context/userContext";
import {Link} from "react-router-dom";
import {signOut} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {auth} from "../firebase-config";
import { isAuth } from '../context/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {collection, query, where, getFirestore, onSnapshot, limit, updateDoc, doc, orderBy } from "firebase/firestore";

import './css/animate.min.css';
import './css/aos.css';
import './css/main.css';
import './css/home.css';
import './css/NavBar.css';
import Stream_popup from "../components/stream_popup";

export default function Navbar() {

  const [stream, setStream] = useState([]);
  const [user, setUser] = useState([]);
  const {toggleModals} = useContext(UserContext)

  const navigate = useNavigate()
  const[value, setValue] = useState(""); 
  const [isOpen, setIsOpen] = useState(false);
  const [streaming, setStreaming] = useState(false);

  const logOut = async () => {
    try {
      await signOut(auth)
      navigate("/")
    } catch {
      alert("For some reasons we can't disconnect you, please check your internet connection and retry.")
    }
  }
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  
  if (isAuth == true) {
    
    const db = getFirestore();
    const {currentUser} = useContext(UserContext);
    const streamRef = collection(db, "streams");
    const q1 = query(streamRef, where("userId", "==", currentUser.uid));
    const q2 = query(streamRef, where("isUsed", "==", false) , limit(1));
    
    onSnapshot(q1, (snapshot) => {
      snapshot.docs.forEach((doc) => {{
        setUser({ ...doc.data(), id: doc.id})
        if (user != null){
          setStreaming(true);
        }
      }});
    })
    onSnapshot(q2, (snapshot) => {
      snapshot.docs.forEach((doc) => {
          setStream({ ...doc.data(), id: doc.id})
      });
    });
    
    const startStream = async () => {
      let unusedDoc = doc(db, "streams", stream.id); 
      let userDoc = doc(db, "users", currentUser.uid);
        updateDoc( unusedDoc, 
          {
            isUsed: true,
            userId: currentUser.uid,  
          });
        setStreaming(true);
        updateDoc( userDoc, 
          {
            isStreaming: true,
          })
    }
    const stopStream = async () => {
      let unusedDoc = doc(db, "streams", user.id); 
      let userDoc = doc(db, "users", currentUser.uid);
        updateDoc( unusedDoc, 
          {
            isUsed: false,
            userId: null,  
          });
        setStreaming(false);
        updateDoc(userDoc, 
          {
            isStreaming: false,
          })
          window.setTimeout(function(){location.reload()},1000)
    }
    
    return (
      <div>
      <nav>
      <div className="container">
      <div className="auth nav-content d-flex align-items-center">
        <Link to="/" className="logo text-light d-flex align-items-center">
              <i className="fas fa-gamepad"></i>
              <img id='logo' src="https://i.ibb.co/M6twcJP/logo.png" alt="logo"></img>
        </Link> 
        <div className='recherche'>
        <input value={value} onChange={(e) => {setValue(e.target.value)}} />
        <button onClick={event =>  window.location.href=`/profile/${value}`}><FontAwesomeIcon className='icon' icon={faSearch} /></button>
        </div>
        <div className='nav'> 
        <Link to="/my-account"><button className="btn btn-primary">profile</button></Link> 
          <button 
          onClick={logOut}
          className="btn btn-danger ms-2">
            Log Out
          </button>
          {streaming ? (
            <div>
              <button className="btn btn-danger ms-2" onClick={stopStream}>stop streaming</button>
              <button className="stream-button btn btn-outline-light" onClick={togglePopup}>show stream keys</button>
            </div>
          ) : (
              <button className="stream-button btn btn-outline-light" onClick={startStream}>start streaming</button>
          )}
          
        </div>
      </div>
      </div>
      </nav>
      {isOpen && <Stream_popup
      content={<>
        <p> RTMP Link : rtmp://eu-central.castr.io/static</p>
        <p> streaming key : {user.streaming_key}</p> 
      </>}
      handleClose={togglePopup}
      />}
      </div>
   )}
   else {
    return (
      <nav>
      <div className="container"> 
      <div className="auth nav-content d-flex align-items-center">
        <Link to="/" className="logo text-light d-flex align-items-center">
              <i className="fas fa-gamepad"></i>
              <img id='logo' src="https://i.ibb.co/M6twcJP/logo.png" alt="logo"></img>
        </Link>
        <div className='recherche'>
        <input alt="test" value={value} onChange={(e) => {setValue(e.target.value)}} />
        <button onClick={event =>  window.location.href=`/profile/${value}`}><FontAwesomeIcon className='icon' icon={faSearch} /></button>
        </div>
        <div className='nav1'>
          <button 
          onClick={() => toggleModals("signUp")}
          className="btn btn-primary ms-2">
            Sign Up
          </button>
          <button 
            onClick={() => toggleModals("signIn")}
          className="btn btn-primary ms-2">
            Sign In
          </button>
          </div>
          </div>
        </div>

      </nav>
   )}

}

