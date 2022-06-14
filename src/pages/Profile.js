import React from 'react';
import { collection, query, where, getFirestore } from "firebase/firestore";


export default function Profile() {
  return (
    <div><h3>Profile</h3>
      {/* <button onClick={test} className="btn btn-danger ms-2"></button> */}
    </div>
    
  )
}
// function test(){
//   const db = getFirestore();
//   const username = "test@gmail.com";
//   const search = collection(db, "users");
//   const q = query(search, where("email", "==", username));
//   console.log(q);
  
// }