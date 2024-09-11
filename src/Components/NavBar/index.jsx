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
      <div className="lg:flex justify-center items-center h-screen my-[60px] p-2 mx-auto w-[95%]">

        <Outlet />
      </div>
      
      
    </>
  );
}

export { NavBar };
