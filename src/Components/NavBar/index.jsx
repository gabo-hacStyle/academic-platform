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
      <div className="lg:flex justify-center h-[95vh] py-[45px] ">
        <Outlet />
      </div>
    </>
  );
}

export { NavBar };
