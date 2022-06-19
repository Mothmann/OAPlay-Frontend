import React, {useState, useContext} from 'react';
import { UserContext } from '../context/userContext';
import {collection, query, where, getFirestore, onSnapshot, increment, updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useParams } from 'react-router';
import { isAuth } from '../context/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import "./css/profile.css";

export default function Profile() {
  let {username} = useParams();
  const db = getFirestore();
  const usersRef = collection(db, "users");
  const {currentUser} = useContext(UserContext);
  const [Users, setUsers] = useState([]);
  const q = query(usersRef, where("displayName", "==", username));
  const [follows, setFollow] = useState();
  
  onSnapshot(q, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      setUsers({ ...doc.data(), id: doc.id})
    });
  });
  if (isAuth == true){
  const q2 = query(usersRef, where("displayName", "==", currentUser.displayName));
  onSnapshot(q2, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      var followers = doc.data().following;
      for (var i = 0; i < followers.length; i++) {
        if(followers[i] === username) {
          setFollow(true);
        }
    } 
    if (follows == null){
      setFollow(false);
    }
    })
  })
}

  if (isAuth == true && follows == false){
    return (
      <div>
        <div id='start'></div>
      <p>profile picture</p>
      <img id="photo" src={Users.photoURL} width="200px" height="200px" alt="profile_picture" />
      <br />
      {Users.displayName}
      <br />
      {Users.followers} followers  &nbsp;
      <button className="follow" onClick={()=>follow(currentUser.uid, username, Users.id)}><FontAwesomeIcon className='not-follow icon' icon={faThumbsUp} /></button>
      </div>
    )

  }
  else if (isAuth == true && follows == true){
    return (
      <div>
        <div id='start'></div>
      <p>profile picture</p>
      <img id="photo" src={Users.photoURL} width="200px" height="200px" alt="profile_picture" />
      <br />
      {Users.displayName}
      <br />
      {Users.followers} followers  &nbsp;
      <button onClick={()=>unfollow(currentUser.uid, username, Users.id)} className='follow'><FontAwesomeIcon className='followed icon' icon={faThumbsUp} /></button>
      </div>
    )

  }
  else {
  return (
    <div>
      <div id='start'></div>
    <p>profile picture</p>
    <img src={Users.photoURL} width="200px" height="200px" alt="profile_picture" />
    <p>email</p><p>{Users.email}</p>
    <p>username</p>{Users.displayName}
    </div> 
  )
  }
}
const follow = (id, username, uid) => {  
  const db = getFirestore();
  let usersRef = doc(db, "users", id);
  let folRef = doc(db, "users", uid);
  updateDoc(usersRef, {
    following: arrayUnion(username)
});
  updateDoc(folRef, {
    followers: increment(1)
  });
}
const unfollow = (id, username, uid) => {
  const db = getFirestore();
  let usersRef = doc(db, "users", id);
  let folRef = doc(db, "users", uid);
  updateDoc(usersRef, {
    following: arrayRemove(username)
  })
  updateDoc(folRef, {
    followers: increment(-1)
  })
}