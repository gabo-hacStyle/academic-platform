import React, { useState } from "react";
import { CreateStudent } from "../Students/CreateStudent";
import { EditStudent } from "../Students/EditStudents";
import { EditUser } from "../Users/EditUser";
import { EditCourse } from "../Courses/EditCourse";
import { CreateUser } from "../Users/CreateUser";
import { CreateCourse } from "../Courses/CreateCourse";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { setFormToRender } from "../../../Slices/uiSlice";

import Succesfull from "../../Succesfull";
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
const DataManipulationForm = () => {
  const dispatch = useDispatch();

  //Manejo del estado global de los formularios
  const form = useSelector((state) => state.ui.formToRender, shallowEqual);

  const id = useSelector((state) => state.ui.itemId, shallowEqual);
  console.log("Id de item", id);

  // const { id, entity } = useParams();
  // const location = useLocation();
  const [isSent, setIsSent] = useState(false);

  // // Determinar la acción y la entidad
  // const pathParts = location.pathname.split('/');
  // const action = pathParts.includes('new') ? 'create' : 'edit';
  // const entity = pathParts[2]; // Asumiendo que la entidad está en la tercera parte de la ruta

  // Función para renderizar componentes de creación
  const renderComponent = () => {
    switch (form) {
      case "createStudent":
        return <CreateStudent setIsSent={setIsSent} />;
      case "createUser":
        return <CreateUser setIsSent={setIsSent} />;
      case "createCourse":
        return <CreateCourse setIsSent={setIsSent} />;
      case "editStudent":
        return <EditStudent id={id} setIsSent={setIsSent} />;
      case "editUser":
        return <EditUser id={id} setIsSent={setIsSent} />;
      case "editCourse":
        return <EditCourse id={id} setIsSent={setIsSent} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="comps-btw-lists">
        {isSent && <Succesfull setIsSent={setIsSent} text={"Creado"} />}

        <div className="title">
          <h1>Creando / editando </h1>
        </div>

        <article className="w-[90%]  mx-auto p-6 bg-white rounded-lg shadow-md relative form-container">
          <button
            className="text-xs underline text-primary-blue/60 absolute top-2 left-4"
            onClick={() => dispatch(setFormToRender(null))}
          >
            &lt; Admin
          </button>

          {form && renderComponent()}
        </article>
      </div>
    </>
  );
};

export default DataManipulationForm;
