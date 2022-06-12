import React, {useContext, useState} from 'react';
import { UserContext } from '../context/userContext';
import "./css/profile.css";
import axios from 'axios';
import {updateProfile} from "firebase/auth";
import {auth} from "../firebase-config";

export default function Account() {
        const [selectedImage, setSelectedImage] = useState(null);
        const {currentUser} = useContext(UserContext);
        console.log(currentUser);
        return (
            <div>
                <p>profile picture</p>
                <img src={currentUser.photoURL} width="200px" height="200px" alt="profile_picture" />
                <p>email</p>{currentUser.email}
                <p>username</p>{currentUser.displayName}
                <h1>Upload and Display Image</h1>
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
            </div>
            
            
        );
}
const upload = ( file ) => {

    const formData = new FormData();
    formData.append( "image", file );

    let apiresponse = axios.post('https://api.imgbb.com/1/upload?key=20c8203790bceb146353bb6da9ed1be3', formData )
        .then( res => { window.location.reload();
            var url = res.data.data.url;    
            updateProfile(auth.currentUser, {
                photoURL: url
              })
             
        } )
        .catch( error => { console.log(error) } )

    return apiresponse;
}
