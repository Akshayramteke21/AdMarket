import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/auth/login" />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
