import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import Loading from "./Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import { doc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../FirebaseConfig";

function Navbar() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [signOutError, setSignOutError] = useState(null);

  const handleSignOut = async () => {
    try {
      await updateDoc(doc(db, "users", user.uid), {
        isOnline: false,
      });
      await signOut(auth);
      navigate("/auth/login");
    } catch (error) {
      setSignOutError("Failed to sign out. Please try again.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <nav className="navbar navbar-expand-md bg-light navbar-light sticky-top shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/">
            AdMarket
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="true"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={`/profile/${user.uid}`}>
                      Profile
                    </Link>
                  </li>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={handleSignOut}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/auth/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/auth/login">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {signOutError && <div className="alert alert-danger">{signOutError}</div>}
    </div>
  );
}

export default Navbar;
