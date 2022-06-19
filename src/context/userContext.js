import { createContext, useState, useEffect, React } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile 
} from "firebase/auth"
import {auth} from "../firebase-config";
import { doc, setDoc, getFirestore } from "firebase/firestore"; 

export const UserContext = createContext()
export var isAuth;
const db = getFirestore();
export function UserContextProvider(props) {


  const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd)
  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd)

  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setLoadingData] = useState(true);
  //console.log("MAJ", currentUser);
  if (currentUser){
  isAuth = true;
  }
  else {
    isAuth = false;  
  }
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser)
      setLoadingData(false)
      if (currentUser.displayName === null && isAuth == true) {
        var number = Math.floor(Math.random() * 10000) + 1;
        updateProfile(auth.currentUser, {
          displayName: "user" + number,
          photoURL: "https://brausermaimonides.org/wp-content/uploads/2014/12/default_profile_pic.jpg"
        })
        setDoc(doc(db, "users", currentUser.uid), {
          email: currentUser.email,
          displayName: "user" + number,
          photoURL: "https://brausermaimonides.org/wp-content/uploads/2014/12/default_profile_pic.jpg",
          following: [],
          followers: 0,
          coins: 0,
        })
      }
      else {
        return
      }
    })

    return unsubscribe;

  }, [])


  // modal
  const [modalState, setModalState] = useState({
    signUpModal: false,
    signInModal: false
  })

  const toggleModals = modal => {
    if(modal === "signIn") {
      setModalState({
        signUpModal: false,
        signInModal: true
      })
    }
    if(modal === "signUp") {
      setModalState({
        signUpModal: true,
        signInModal: false
      })
    }
    if(modal === "close") {
      setModalState({
        signUpModal: false,
        signInModal: false
      })
    }
  }

  return (
    <UserContext.Provider value={{modalState, toggleModals, signUp, currentUser, signIn}}>
      {!loadingData && props.children}
    </UserContext.Provider>
  )
}