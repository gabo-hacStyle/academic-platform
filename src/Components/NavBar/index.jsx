import React from "react";
import { Outlet } from "react-router-dom";
import  './NavBar.css'
function NavBar () {
    return (
        <>
            <nav className="main-navbar">
                <div className="logo">
                    GABS
                </div>
                <div className="platform">
                    PLATAFORMA ACADÉMICA 📓
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export {NavBar}