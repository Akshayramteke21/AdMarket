import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const getUser = async () => {
    const docSnap = await getDoc(doc(db, "users", id));

    if (docSnap.exists) {
      setUser(docSnap.data());
    }
  };
             useEffect(()=>{
                    getUser();
             },[id])
          
  console.log(user);
  return (
    <>
      <div className="container mt-5 shadow rounded">
        <div className="row">
          <h3 className="text-center"> Welcome to profile </h3>
        </div>
      </div>
    </>
  );
};

export default Profile;
