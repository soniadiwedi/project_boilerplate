import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth,db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const adminAuthContext = createContext();

export const AdminAuthContextProvider = ({ children }) => {
    const[admin,setAdmin]=useState({})

    const signUp = async (email, password) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("user",userCredential)
        // Create a user document in Firestore with additional data
        await addDoc(collection(db, "admin"), {
          uid: user.uid,
          email: user.email,
          // Other user-related data goes here
        });
        
        // You can do further processing here if needed
      } catch (error) {
        console.error('Error signing up:', error);
      }
    };

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
     }


     const logout=()=>{
      return signOut(auth)
     }

     const googleSingin = () => {
      const googleAuthProvider = new GoogleAuthProvider();
      return signInWithPopup(auth, googleAuthProvider)
        .then(async (result) => { // Mark the function as async here
          const user = result.user;
    
          // Create a user document in Firestore with Google auth data
          await addDoc(collection(db, "admin"), {
            uid: user.uid,
            email: user.email,
          
            // Add more user-related data here
          });
    
          // You can do further processing here if needed
        })
        .catch((error) => {
          console.error('Error signing in with Google:', error);
        });
    };
    
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentadmin) => {
          setAdmin(currentadmin); // Update the admin state
        });
      
        return () => {
          unsubscribe(); // Unsubscribe when the component unmounts
        };
      }, []);
      
  return (
    <adminAuthContext.Provider value={{admin,signUp,logIn,logout,googleSingin}}>{children}</adminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  return useContext(adminAuthContext);
};
