import React, {useContext, useState} from 'react';
import { UserContext } from '../context/userContext';
import "./css/account.css";
import {Link} from "react-router-dom";
import axios from 'axios';
import {updateProfile} from "firebase/auth";
import { Navigate} from "react-router-dom";
import {collection, query, where, getFirestore, onSnapshot, increment, updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import {auth} from "../firebase-config";
import coin from "./images/coin.png";

export default function Account() {
        const [selectedImage, setSelectedImage] = useState(null);
        const {currentUser} = useContext(UserContext);
        const [Users, setUsers] = useState([]);
        const[value, setValue] = useState(""); 
        const db = getFirestore();
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("displayName", "==", currentUser.displayName));

        onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach((doc) => {
            setUsers({ ...doc.data(), id: doc.id})
            });
        });

        if(!currentUser) {
            return <Navigate to="/" />
        }
        return (
            <div>
                <br></br><br></br><h1>profile picture</h1> <br />
                <img id="photo" src={currentUser.photoURL} width="200px" height="200px" alt="profile_picture" /> <br /> <br />
                <p>{currentUser.displayName} </p>
                &nbsp; {Users.coins} &nbsp; <img src={coin} width="50px" alt="" /> <Link to="/coins"> &nbsp; &nbsp; <button id='pay'>buy more coins</button> </Link>
                <br/><br/><br/>
                <h1>Change your profile picture or your username</h1>
                {selectedImage && (
                    <div>
                    </div>
                )}
                <br />
                <br /> 
                
                <input
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                    }}
                /><button onClick={()=>upload(selectedImage)}
                className="btn btn-primary">
                    upload</button><br />
                <br />
                <input id="newusername" value={value} onChange={(e) => {setValue(e.target.value)}} />
                <button width="10px" onClick={()=>changeUsername(value)}
                className="username btn btn-primary">
                    NewUsername
                </button>
            </div>
            
            
        );
            
}
const upload = ( file ) => {

    const db = getFirestore(); 
    const formData = new FormData();
    formData.append( "image", file );

    let apiresponse = axios.post('https://api.imgbb.com/1/upload?key=20c8203790bceb146353bb6da9ed1be3', formData )
        .then( res => {
            var url = res.data.data.url;    
            updateProfile(auth.currentUser, {
                photoURL: url
            })
            updateDoc(doc(db, "users", auth.currentUser.uid ), {
                photoURL: url
              })
              setTimeout(function(){
                window.location.reload();
             }, 1000);
        } )
        .catch( error => { console.log(error) } )

    return apiresponse;
}
const changeUsername = (username) => {
    const db = getFirestore(); 
    updateProfile(auth.currentUser, {
        displayName: username
       }) 
    updateDoc(doc(db, "users", auth.currentUser.uid ), {
        displayName: username
      })
      setTimeout(function(){
        window.location.reload();
     }, 1000);

}