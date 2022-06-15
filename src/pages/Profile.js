import React, {useState} from 'react';
import {collection, query, where, getFirestore, onSnapshot } from "firebase/firestore";
import { useParams } from 'react-router';
import { getAuth } from 'firebase/auth';

export default function Profile() {
  let {username} = useParams();
  const db = getFirestore();
  const usersRef = collection(db, "users");
  const [Users, setUsers] = useState([]);

  const q = query(usersRef, where("displayName", "==", username));
  onSnapshot(q, function test (snapshot) {
    snapshot.docs.forEach((doc) => {
      setUsers({ ...doc.data(), id: doc.id})
    });
  });
  return (
    <div><p>profile picture</p>
    <img src={Users.photoURL} width="200px" height="200px" alt="profile_picture" />
    <p>email</p><p>{Users.email}</p>
    <p>username</p>{Users.displayName}
    </div>
    
  )
}
async function test(){
}