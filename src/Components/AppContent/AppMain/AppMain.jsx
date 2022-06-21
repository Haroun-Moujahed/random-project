import React from "react";
import { Outlet } from "react-router-dom";

import SideBar from "./SideBar/SideBar";

import "./AppMain.css";

function AppMain() {
  return (
    <main className="main">
      <SideBar />
      <Outlet />
    </main>
  );
}

export default AppMain;
