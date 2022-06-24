import React, {useContext, useState} from 'react';
import {UserContext} from "../context/userContext";
import { isAuth } from '../context/userContext';
import {collection, query, where, getFirestore,serverTimestamp, onSnapshot , limit, orderBy, addDoc } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import "./css/chat.css";

export default function chat(props) {

    if (isAuth == true) {
        const db = getFirestore();
        const [User, setUser] = useState([]);
        const {currentUser} = useContext(UserContext);
        const usersRef = collection(db, "users");
        const q2 = query(usersRef, where("displayName", "==", currentUser.displayName));
        const messagesRef = collection(db, "chat");
        const q = query(messagesRef,orderBy("createdAt", "desc"), limit(5)); 
        const [messages] = useCollectionData(q, {idField : "id"});
        const [formValue, setFormValue] = useState("");
        const streamId = props.streamId;
        
        onSnapshot(q2, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                setUser({ ...doc.data(), id: doc.id})
            });
          });

        const sendMessage = async (e) => {  
            e.preventDefault();
            const msgDoc = collection(db, "chat");
        
            addDoc(msgDoc, 
            {
            text: formValue,
            user_id: currentUser.uid,
            photoURL: User.photoURL,
            streamId: streamId,
            createdAt: serverTimestamp()

            });
        
            setFormValue('');
          }

        return (
            <div id='chatBox' style={{ marginRight: "-70%" , marginTop: "-30%"}}>
                {messages && messages.map(msg => <ChatMessage streamId={streamId} key={msg.id} message={msg} />)}
                <form className='form' onSubmit={sendMessage}>
                    <input className='message' id='input-pay' value={formValue} onChange={(e) => setFormValue(e.target.value)} type="text" placeholder="Type a message..." />
                    <button id="pay" type="submit">Send</button>
                </form>
            </div>
        )

    }
   
}
function ChatMessage(props) {

    const { text, user_id, photoURL, streamId } = props.message;
    const {currentUser} = useContext(UserContext);
    const messageClass = user_id === currentUser.uid ? 'sent' : 'received';
    if (streamId == props.streamId) { 
    return (<>
      <div  id='chat' className={`message ${messageClass}`} >
        <img id="photo-chat" src={photoURL} />
        <p className='messages'>{text}</p>
      </div>
    </>)
    }
  }
