import React from "react";

import { useState } from "react";
import { auth } from "../../FirebaseConfig";
import { confirmPasswordReset } from "firebase/auth";
import { useSearchParams } from "react-router-dom";

const ForgetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  let [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("All fields are required");

      return;
    }
    if (password !== confirmPassword) {
      setError("Password must match");
      return;
    }
    setError("");
    setSuccess(false);

    try {
      await confirmPasswordReset(auth, searchParams.get("oobCode"), password);
      setSuccess(true);
      setPassword("");

      setConfirmPassword("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="shadow rounded p-3 mt-5 form" onSubmit={handleSubmit}>
      <h3 className="text-center mb-3"> Reset Password</h3>
      {success ? (
        <p className="text-center mt-5">
          your passoword is succesfully reset... you may login now
        </p>
      ) : (
        <>
          <div className="mb-3"> 
            <label htmlFor="passoword" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="InputPassword"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="passoword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              id="InputPassword"
            />
          </div>

          {error ? <p className="text-danger text-center">{error}</p> : null}
          <div className="text-center mb-3  ">
            <button className="btn btn-secondary btn-sm ">Reset</button>
          </div>
        </>
      )}
    </form>
  );
};

export default ForgetPassword;
