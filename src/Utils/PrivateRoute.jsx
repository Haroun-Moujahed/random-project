import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

function PrivateRoute({ component }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return component;
}

export default PrivateRoute;
