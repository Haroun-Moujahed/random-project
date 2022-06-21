import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AppHeader from "./AppHeader/AppHeader";

function AppContent() {
  return (
    <>
      <AppHeader />
      <Outlet />
      <ToastContainer />
    </>
  );
}

export default AppContent;
