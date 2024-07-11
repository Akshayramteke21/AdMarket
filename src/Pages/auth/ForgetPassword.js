import React from "react";

import { useState } from "react";
import { auth } from "../../FirebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");

      return;
    }

    setError("");
    setSuccess(false);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);

      setEmail("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="shadow rounded p-3 mt-5 form" onSubmit={handleSubmit}>
      <h3 className="text-center mb-3"> Forget Password</h3>
      {success ? (
        <p className="text-center mt-5">
          an email is send with reset instrunction
        </p>
      ) : (
        <>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="InputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          {error ? <p className="text-danger text-center">{error}</p> : null}
          <div className="text-center mb-3  ">
            <button className="btn btn-secondary btn-sm ">
              {" "}
              Reset Password
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default ForgetPassword;
