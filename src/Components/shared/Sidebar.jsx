import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAdminList, setFormToRender, setItemId, setShowStudent } from "../../Slices/uiSlice";
const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const isShowingStudent = useSelector((state) => state.ui.showStudent);

  const handleClickList = (list) => {
    if (pathname === "/admin") {
      dispatch(setAdminList(list));
      dispatch(setFormToRender(null));
      dispatch(setItemId(null));
    } else {
      navigate("/admin");
    }
  };

  const handleClickForm = (form) => {
    dispatch(setItemId(null));
    dispatch(setFormToRender(form));
  };

  //Logout function
  const logout = () => {
    navigate("/");
  };

  return (
    <div className="hidden lg:block h-screen w-64 shadow-md shadow-dark-black/50 ">
      <aside className=" h-[92vh] flex flex-col justify-between items-center pt-16">
        {role === "admin" ? (
          <>
            <ul className="space-y-6">
              <li>
                <h2
                  className="text-xl font-bold mb-2 clickable hover:underline"
                  onClick={() => handleClickList("students")}
                >
                  Estudiantes
                </h2>
                <ul className="space-y-2 pl-4">
                  <li>
                    <span
                      className="clickable text-gray-600 "
                      onClick={() => handleClickForm("createStudent")}
                    >
                      Crear Estudiante
                    </span>
                  </li>
                </ul>
              </li>
              <li>
                <h2
                  className="text-xl font-bold mb-2 clickable hover:underline"
                  onClick={() => handleClickList("courses")}
                >
                  Cursos
                </h2>
                <ul className="space-y-2 pl-4">
                  <li>
                    <span
                      className="clickable text-gray-600 "
                      onClick={() => handleClickForm("createCourse")}
                    >
                      Crear Curso
                    </span>
                  </li>
                </ul>
              </li>
              <li>
                <h2
                  className="text-xl font-bold mb-2 clickable hover:underline"
                  onClick={() => handleClickList("users")}
                >
                  Usuarios
                </h2>
                <ul className="space-y-2 pl-4">
                  <li>
                    <span
                      className="clickable text-gray-600 "
                      onClick={() => handleClickForm("createUser")}
                    >
                      Crear Usuario
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          </>
        ) : (
          <div className="p-4 w-[90%]  text-xs">
            <h2 className="text-xl font-bold mb-4">Filtros:</h2>
            <ul className="space-y-2 pl-4">
              <li>
                <label className=" inline-flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-6 form-checkbox text-primary-blue"
                  />
                  <span className="ml-2">Filtro 1</span>
                </label>
              </li>
              <li>
                <label className=" inline-flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-6 form-checkbox text-primary-blue"
                  />
                  <span className="ml-2">Filtro 2</span>
                </label>
              </li>
              <li>
                <label className=" inline-flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-6 form-checkbox text-primary-blue"
                  />
                  <span className="ml-2">Filtro 3</span>
                </label>
              </li>
              <li>
                <label className=" inline-flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-6 form-checkbox text-primary-blue"
                  />
                  <span className="ml-2">Filtro 4</span>
                </label>
              </li>
              <li>
                <label className=" inline-flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-6 form-checkbox text-primary-blue"
                  />
                  <span className="ml-2">Filtro 5</span>
                </label>
              </li>
              <li>
                <label className=" inline-flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-6 form-checkbox text-primary-blue"
                  />
                  <span className="ml-2">Filtro 6</span>
                </label>
              </li>
            </ul>
            <br />
            {
              isShowingStudent && (
                <span className="text-xl clickable" onClick={() => {
                  dispatch(setShowStudent(false));
                  dispatch(setItemId(null));
                }}>
                  Estudiantes
                </span>
              )

            }

            
          </div>
        )}

        <button
          className="cursor-pointer border border-primary-blue px-7 py-3 rounded-sm
                "
          onClick={logout}
        >
          Log out
        </button>
      </aside>
    </div>
  );
};

export default Sidebar;
