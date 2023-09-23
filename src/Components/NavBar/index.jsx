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
                    ACADEMIC PLATFORM 📓
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export {NavBar}