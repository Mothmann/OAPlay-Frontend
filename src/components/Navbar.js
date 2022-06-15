import React, {useContext, useState} from 'react';
import {UserContext} from "../context/userContext";
import {Link} from "react-router-dom";
import {signOut} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {auth} from "../firebase-config";
import { isAuth } from '../context/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from "@fortawesome/free-solid-svg-icons";

import './css/animate.min.css';
import './css/aos.css';
import './css/main.css';
import './css/home.css';
import './css/NavBar.css';

export default function Navbar() {

  const {toggleModals} = useContext(UserContext)

  const navigate = useNavigate()
  const[value, setValue] = useState(""); 

  const logOut = async () => {
    try {
      await signOut(auth)
      navigate("/")
    } catch {
      alert("For some reasons we can't disconnect you, please check your internet connection and retry.")
    }
  }
  if (isAuth == true) {
    return (
      <nav>
      <div className="container">
      <div className="auth nav-content d-flex align-items-center">
        <Link to="/" className="logo text-light d-flex align-items-center">
              <i className="fas fa-gamepad"></i>
              <h3 className="m-0">OA<span>Play</span></h3>
        </Link>         
          <button 
          onClick={logOut}
          className="btn btn-danger ms-2">
            Log Out
          </button>
        <Link to="/my-account"><button className="btn btn-primary">profile</button></Link> 
        <input value={value} onChange={(e) => {setValue(e.target.value)}} />
        <button onClick={event =>  window.location.href=`/profile/${value}`}><FontAwesomeIcon className='icon' icon={faSearch} /></button> 
        </div>
        </div>
     
      </nav>
   )}
   else {
    return (
      <nav>
      <div className="container">
      <div className="auth nav-content d-flex align-items-center">
        <Link to="/" className="logo text-light d-flex align-items-center">
              <i className="fas fa-gamepad"></i>
              <h3 className="m-0">OA<span>Play</span></h3>
        </Link>
    
          <button 
          onClick={() => toggleModals("signUp")}
          className="btn btn-primary">
            Sign Up
          </button>
          <button 
            onClick={() => toggleModals("signIn")}
          className="btn btn-primary ms-2">
            Sign In
          </button>
          <input value={value} onChange={(e) => {setValue(e.target.value)}} />
          <button onClick={event =>  window.location.href=`/profile/${value}`}><FontAwesomeIcon className='icon' icon={faSearch} /></button> 
          </div>
        </div>
      </nav>
   )}
}
