import React from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";

import "react-pro-sidebar/dist/css/styles.css";
import "./SideBar.scss";

function SideBar() {
  const location = useLocation();
  return (
    <aside>
      <ProSidebar className="sideBar">
        <Menu iconShape="circle">
          <MenuItem
            active={location.pathname === "/" ? true : false}
            icon={<HomeIcon />}
          >
            Tout les emails
            <Link to="/" />
          </MenuItem>
          <MenuItem
            active={location.pathname === "/mail" ? true : false}
            icon={<EmailIcon />}
          >
            Envoyer un mail
            <Link to="/mail" />
          </MenuItem>
        </Menu>
      </ProSidebar>
    </aside>
  );
}

export default SideBar;
