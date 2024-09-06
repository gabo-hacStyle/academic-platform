import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./HeaderAdmin.css";
import "./Admin.css";
import { useDispatch } from "react-redux";
import { setAdminList } from "../../Slices/uiSlice";
import Sidebar from "../shared/Sidebar";
//import { useAuth } from '../../Hooks/auth';
//import { useEffect } from 'react';

//Header of the admin page. In charge of changing the state of the adminlist
//And logout

function HeaderAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const auth = useAuth();

  //while user is editing or creating and wants to get back to the lists through the header
  const { pathname } = useLocation();
  /**
     * useEffect(() => {
        if(!auth.isAuthenticated) {
            navigate('/');
            localStorage.removeItem('token');
        }
    }, [])
     */

  //if the user is in the main page, the list will change
  //if the user is in the creation or edition page, it will
  //navigate to the main page

  const handleClick = (list) => {
    if (pathname === "/admin") {
      dispatch(setAdminList(list));
    } else {
      navigate("/admin");
    }
  };

  //Logout function
  const logout = () => {
    navigate("/");
  };
  return (
    <div className="page">
      <Sidebar />
      <header className="header-container">
        <h1>Admin Page</h1>
        <nav className="navbar-for-admin">
          <ul>
            <li className="clickable" onClick={() => handleClick("students")}>
              Estudiantes
            </li>
            <li className="clickable" onClick={() => handleClick("courses")}>
              Cursos
            </li>
            <li className="clickable" onClick={() => handleClick("users")}>
              Usuarios
            </li>
          </ul>
        </nav>

        <button className="cerrar-sesion clickable" onClick={logout}>
          Log out
        </button>
      </header>
      <Outlet />
    </div>
  );
}

export { HeaderAdmin };
