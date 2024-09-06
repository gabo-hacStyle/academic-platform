import React from "react";
import { Outlet } from "react-router-dom";
import "./NavBar.css";
function NavBar() {
  return (
    <>
      <nav className="main-navbar ">
        <div className="logo">AnReHis</div>
        <div className="platform">PLATAFOMA DE REGISTROS ACADEMICOS 📓</div>
      </nav>
      <Outlet />
      
    </>
  );
}

export { NavBar };
