import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import AuthContext from "../../Contexts/AuthContext";

function AuthProvider({ children }) {
  // check user existence on load
  const token = localStorage.getItem("token") || null;
  let currentUser = token ? jwt_decode(token) : null;

  const [user, setUser] = useState(currentUser);
  const navigate = useNavigate();

  // sign in function
  const signin = (token) => {
    let jwtToken = token.split(" ")[1];
    localStorage.setItem("token", jwtToken);
    let decodedToken = jwt_decode(jwtToken);
    setUser(decodedToken);
    navigate("/", { replace: true });
  };

  // sign out function
  let signout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
