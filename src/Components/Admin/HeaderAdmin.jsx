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
    <>
      <Sidebar />
      <header className="header-container my-8">

      <button className="cursor-pointer border border-primary-blue px-2 rounded-sm
       absolute right-7 top-0 " onClick={logout}>
          Log out
        </button>
        <h1>Admin Page</h1>
        <nav>
          <ul  className="flex">
            <li className="clickable px-3 border border-primary-blue/50" onClick={() => handleClick("students")}>
              Estudiantes
            </li>
            <li className="clickable px-3 border border-primary-blue/50" onClick={() => handleClick("courses")}>
              Cursos
            </li>
            <li className="clickable px-3 border border-primary-blue/50" onClick={() => handleClick("users")}>
              Usuarios
            </li>
          </ul>
        </nav>

        
      </header>
      <div className="w-full">
      <Outlet />
      </div>
      
    </>
  );
}

export { HeaderAdmin };
