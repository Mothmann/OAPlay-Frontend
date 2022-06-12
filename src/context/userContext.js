import { createContext, useState, useEffect, React } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile 
} from "firebase/auth"
import {auth} from "../firebase-config"

export const UserContext = createContext()
export var isAuth;

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
      if (currentUser.displayName === null) {
        var number = Math.floor(Math.random() * 10000) + 1;
        updateProfile(auth.currentUser, {
          displayName: "user" + number,
          photoURL: "https://brausermaimonides.org/wp-content/uploads/2014/12/default_profile_pic.jpg"
        })
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