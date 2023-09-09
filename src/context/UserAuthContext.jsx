import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc ,setDoc,doc} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";


export const userAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

 
  const signUp = async (userData) => {
    const { email, password, name, gender, status, address, image } = userData;
  
    try {
      // Step 1: Create a user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("user", userCredential);
  
      // Step 2: Upload the image to Firebase Storage
      if (image) {
        const storageRef = ref(storage, `userImages/${user.uid}/${image.name}`);
        await uploadBytes(storageRef, image);
  
        // Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(storageRef);
  
        // Step 3: Create a user document in Firestore with additional data including the image URL
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          email: email,
          name: name,
          gender: gender,
          status: status,
          address: address,
          imageUrl: imageUrl, // Store the image URL in Firestore
        });
      } else {
        // If no image is provided, create the user document without the image URL
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          email: email,
          name: name,
          gender: gender,
          status: status,
          address: address,
        });
      }
  
      // You can do further processing here if needed
    } catch (error) {
      console.error("Error signing up:", error);
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
      await addDoc(collection(db, "users"), {
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
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser); // Update the admin state
    });

    return () => {
      unsubscribe(); // Unsubscribe when the component unmounts
    };
  }, []);

  return (
    <userAuthContext.Provider value={{ user, signUp,logIn,logout,googleSingin }}>
      {children}
    </userAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
