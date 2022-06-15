import React, {useState, useContext} from 'react';
import { UserContext } from '../context/userContext';
import {collection, query, where, getFirestore, onSnapshot, increment, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { useParams } from 'react-router';
import { isAuth } from '../context/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  let {username} = useParams();
  const db = getFirestore();
  const usersRef = collection(db, "users");
  const {currentUser} = useContext(UserContext);
  const [Users, setUsers] = useState([]);

  const q = query(usersRef, where("displayName", "==", username));
  onSnapshot(q, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      setUsers({ ...doc.data(), id: doc.id})
    });
  });
  if (isAuth == true){
    return (
      <div>
      <p>profile picture</p>
      <img src={Users.photoURL} width="200px" height="200px" alt="profile_picture" />
      <p>email</p><p>{Users.email}</p>
      <p>username</p>{Users.displayName}
      <br />
      {Users.followers} followers  &nbsp;
      <button onClick={()=>follow(currentUser.uid, username, Users.id)}><FontAwesomeIcon className='icon' icon={faThumbsUp} /></button>
      </div>
    )

  }
  else {
  return (
    <div>
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