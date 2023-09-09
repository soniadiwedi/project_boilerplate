import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";
import EditProfile from "./EditProfile";
import { Button } from "react-bootstrap";
const Home = () => {
  const { user } = useUserAuth();
  const [userData, setUserData] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  //for editing
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("active");
  // Function to fetch user data including the image URL
  const fetchUserData = async () => {
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserData(userData);
          // console.log("userData",userData)
          // Pre-fill the form fields with existing data
          setName(userData.name);
          setEmail(userData.email);
          setGender(userData.gender);
          setImage(userData.imageUrl)
          setStatus(userData.status)
        } else {
          console.log("User document not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Update the user's profile data in Firestore with the new information
    try {
      const userDocRef = doc(db, "users", user.uid);
      const updatedData = {
        name,
        email,
        gender,
        status,
      };
  
      if (image) {
        const storageRef = ref(storage, `userImages/${user.uid}/${image.name}`);
        await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(storageRef);
        updatedData.imageUrl = imageUrl;
      }
  
      await setDoc(userDocRef, updatedData);
      // Close the edit form
      setShowEdit(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  
  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, [user]);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {userData && (
        <div>
          <h2>Hello, {userData.name}</h2>
          <p>Email: {userData.email}</p>
          {userData.imageUrl && (
            <img
              src={userData.imageUrl}
              alt={`${userData.name}'s profile`}
              style={{ maxWidth: "300px" }}
            />
          )}
        </div>
      )}

      <Button onClick={() => setShowEdit(true)}>Edit</Button>
      {showEdit && (
        <EditProfile
          userData={userData}
          setEmail={setEmail}
          setName={setName}
          setGender={setGender}
          setImage={setImage}
          setStatus={setStatus}
          name={name}
          email={email}
          gender={gender}
          image={image}
          status={status}
          handleFormSubmit={handleFormSubmit}
          fetchUserData={fetchUserData}
        />
      )}
    </div>
  );
};

export default Home;
