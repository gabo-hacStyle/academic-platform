import React, { useEffect } from "react";
import './Profile.css'
import { Outlet,  useNavigate } from "react-router-dom/dist";
import { useAuth } from "../../Hooks/auth";

function Profile () {
    const navigate = useNavigate();
    const auth = useAuth();
    //if the page is refreshed and the user is logged in, set the token
    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate('/')
            localStorage.removeItem('token');
        }
    }, [])

    const handleLogout = () => {
        auth.logout();          
    }
    return (
        <div className="page">
        <div className="person-container">
            <div className="profile-container">
                <div className="profile">
                    <figure>
                        <img 
                            src="data:image/png;base64,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"
                            alt="Foto de perfil"
                            width={65}
                            height={65}
                        />
                        </figure>
                        <h1>Personal</h1>
                   
                        <button 
                        className="logout clickable"
                        onClick={handleLogout}
                        > Cerrar sesion 
                        </button>
                </div>

            </div>
        </div>
        <Outlet/>
        </div>
    );
}


export {Profile}