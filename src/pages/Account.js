import React, {useContext, useState} from 'react';
import { UserContext } from '../context/userContext';
import "./css/profile.css";
import axios from 'axios';
import {updateProfile} from "firebase/auth";
import {auth} from "../firebase-config";
import { doc, updateDoc, getFirestore } from "firebase/firestore"; 

export default function Account() {
        const [selectedImage, setSelectedImage] = useState(null);
        const {currentUser} = useContext(UserContext);
        const[value, setValue] = useState(""); 
        return (
            <div>
                <p>profile picture</p>
                <img src={currentUser.photoURL} width="200px" height="200px" alt="profile_picture" />
                <p>email</p>{currentUser.email}
                <p>username</p>{currentUser.displayName}
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
                /><br />
                <button onClick={()=>upload(selectedImage)}>upload</button>
                <br />
                <input value={value} onChange={(e) => {setValue(e.target.value)}} />
                <button onClick={()=>changeUsername(value)}>Button</button>
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