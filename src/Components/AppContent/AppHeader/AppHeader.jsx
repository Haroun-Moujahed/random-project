import React from "react";
import { Link } from "react-router-dom";

import { Button } from "primereact/button";
import { useAuth } from "../../../Contexts/AuthContext";

import Logo from "../../../Assets/logo.png";
import "./AppHeader.css";

function AppHeader() {
  const auth = useAuth();

  const handleSignOut = () => {
    auth.signout();
  };
  return (
    <header className="appHeader">
      <Link to="/" className="logo_header">
        <img src={Logo} alt="logo" className="appHeaderLogo" />
      </Link>
      <Button
        label="Déconnexion"
        className="p-button-rounded p-button-danger"
        id="logOutBtn"
        onClick={handleSignOut}
      />
    </header>
  );
}

export default AppHeader;
