import { useEffect, useState } from "react";
import "./ShowStudent.css";
import { useDispatch } from "react-redux"; 
import { setShowStudent, setItemId } from "../../Slices/uiSlice";
//import { getAnything  } from '../../Hooks/useAxios';

function ShowStudent({student}) {
  //State: enrrollments
  const [enrollments, setEnrollments] = useState([]);
  const dispatch = useDispatch();

  console.log('El estudiante', student)

  //If using axios
  /**
     * 
        //Effect to bring an enpoint
        useEffect(() => {
            const fetchItem = async () => {
                const res = await getAnything(`/users/${id}/courses`);
                setEnrollments(res.data)
            };
            fetchItem();
        }, []);
     */

  return (
    <section className="relative mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
       <button
            className="text-xs underline text-primary-blue/60 absolute top-2 left-4"
            onClick={() => {
              dispatch(setShowStudent(false));
              dispatch(setItemId(null));
            }}
          >
            &lt; Volver
          </button>
    <h2 className="text-2xl font-bold mt-2 mb-4">Información del Estudiante</h2>
    <div className="space-y-4">
    <p className="text-gray-700">
        <b>Nombre:</b> {student.fullName}
      </p>
      <p className="text-gray-700">
        <b>Género:</b> {student.gender === 'M' ? 'Masculino' : 'Femenino'} 
      </p>
      <p className="text-gray-700">
        <b>Email:</b>  "No registrado"
      </p>
      <p className="text-gray-700">
        <b>Ubicación:</b>  "No registrado
      </p>
      <p className="text-gray-700">
        <b>Documento:</b> "No registrado
      </p>
    </div>
  
    {/*
      Si tienes inscripciones para cada estudiante, puedes mostrarlas aquí con sus calificaciones, por ejemplo:
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Cursos Inscritos</h3>
        <ul className="list-disc list-inside space-y-2">
          {enrollments.map((item, index) => (
            <li key={index} className="text-gray-700">
              {item.description}: {item.finalScore}.0
            </li>
          ))}
        </ul>
      </div>
    */}
  </section>
  );
}
export { ShowStudent };
