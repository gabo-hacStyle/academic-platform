import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./HeaderAdmin.css";
import "./Admin.css";
import { useDispatch } from "react-redux";
import { setAdminList, setFormToRender, setItemId } from "../../Slices/uiSlice";
import Sidebar from "../shared/Sidebar";
//import { useAuth } from '../../Hooks/auth';
//import { useEffect } from 'react';

//Header of the admin page. In charge of changing the state of the adminlist
//And logout

function HeaderAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const auth = useAuth();

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

  const handleClickList = (list) => {
    dispatch(setAdminList(list));
    dispatch(setFormToRender(null));
    dispatch(setItemId(null));
  };

  //Logout function
  const logout = () => {
    navigate("/");
  };
  return (
    <>
      <Sidebar role={"admin"} />
      <main className="wrapper lg:oveflow-y-scroll">
        <header className="header-container p-2 lg:p-4 my-4 lg:mb-8">
          <button
            className="cursor-pointer border lg:hidden border-primary-blue px-2 rounded-sm
        absolute right-7 top-2 "
            onClick={logout}
          >
            Log out
          </button>
          <h1 className="lg:text-5xl text-left font-semibold">Admin Page</h1>
          <nav className="lg:hidden">
            <ul className="flex">
              <li
                className="clickable px-3 border border-primary-blue/50"
                onClick={() => handleClickList("students")}
              >
                Estudiantes
              </li>
              <li
                className="clickable px-3 border border-primary-blue/50"
                onClick={() => handleClickList("courses")}
              >
                Cursos
              </li>
              <li
                className="clickable px-3 border border-primary-blue/50"
                onClick={() => handleClickList("users")}
              >
                Usuarios
              </li>
            </ul>
          </nav>
        </header>
        <div className="w-full">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export { HeaderAdmin };
