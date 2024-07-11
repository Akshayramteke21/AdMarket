import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { auth, db } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
  });

  const navigate = useNavigate();

  const { email, password, error, loading } = values;
  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setValues({ ...values, error: "All fields are required" });
      return;
    }

    setValues({ ...values, error: "", loading: true });

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });

      setValues({
        email: "",
        password: "",
        error: "",
        loading: false,
      });

      navigate("/");
    } catch (error) {
      setValues({ ...values, error: error.message, loading: false });
    }
  };

  return (
    <form className="shadow rounded p-3 mt-5 form" onSubmit={handleSubmit}>
      <h3 className="text-center mb-3">Login</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>

      <div className="text-center mb-3">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>

      <div className=" register-btntext-sm text-primary decoration-none mb-3 ">
        Not a user?{" "}
        <Link to="/auth/register" className="text-decoration-none">
          {" "}
          Register
        </Link>
      </div>

      <div className="text-center mb-3 ">
        <small>
          <Link to="/auth/forgot-password" className="text-decoration-none">
            Forgot Password
          </Link>
        </small>
      </div>
    </form>
  );
};

export default Login;
