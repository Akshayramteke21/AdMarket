import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { FaUserLarge } from "react-icons/fa6";
import { MdOutlineCloudUpload } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import moment from "moment";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  
  const getUser = async () => {
    const docSnap = await getDoc(doc(db, "users", id));
    if (docSnap.exists) {
      setUser(docSnap.data());
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  const MonthAndYear = (date) => {
    return `${moment(date).format("MMMM").slice(0, 3)} ${moment(date).format("YYYY")}`;
  };

  return user ? (
    <>
      <div className="container mt-5 row">
        <div className="col-sm-2 col-md-3 text-center">
          <FaUserLarge size={50} />
          <div className="dropdown mt-2 text-center">
            <button
              className="btn btn-secondary btn-sm dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Edit
            </button>
            <ul className="dropdown-menu">
              <li>
                <label htmlFor="photo" className="dropdown-item">
                  <MdOutlineCloudUpload size={25} /> Upload Photo
                </label>
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  className="form-control"
                  style={{ display: "none" }}
                />
              </li>
              <li className="dropdown-item btn">
                Remove Photo
              </li>
            </ul>
          </div>
          <p>Member Since {MonthAndYear(user.createdAt.toDate())}</p>
        </div>
        <div className="col-sm-10 col-md-9 text-end">
          <h3>{user.name}</h3>
        </div>
      </div>
    </>
  ) : null;
};

export default Profile;
