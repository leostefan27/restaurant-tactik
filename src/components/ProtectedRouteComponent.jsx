import React, { useState } from "react";
import { useContext } from "react";
import AuthProvider, { AuthContext } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";


const ProtectedRouteComponent = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  const token = localStorage.getItem('_token')

  if (auth.isAuthenticated === null && token) {
    return null;
  }

  return (
      auth.isAuthenticated === true 
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRouteComponent;
