import {collection, query, where, getFirestore, onSnapshot, increment, updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import React, {useState} from 'react';
import "./css/stream.css";
import Chat from "./chat";

export default function stream(props) {
    
    const db = getFirestore();
    const streamRef = collection(db, "streams");
    const [live, setLive] = useState([]);

    const q = query(streamRef, where("userId", "==", props.id));
    onSnapshot(q, (snapshot) => {
    snapshot.docs.forEach((doc) => {
        setLive({ ...doc.data(), id: doc.id})
    });
    });

  return (
    <div className="steam_chat">
    <iframe style={{  marginLeft: "-30%"  }} className='stream' src={`https://player.castr.com/live_${live.url_key}`} 
    frameBorder={0} scrolling="no" allow="autoplay" allowFullScreen webkitallowfullscreen 
    mozallowfullscreen oallowfullscreen msallowfullscreen>
    </iframe>
    <Chat className="stream_chat" streamId={live.id} />
    </div>
  )
}
