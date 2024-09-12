//import { useState } from "react";
import "./WelcomePage.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../Hooks/useForm";
//import { useAuth } from "../../Hooks/auth";

function WelcomePage() {
  //Para que nos lleve a la pagina correspondiente
  const navigate = useNavigate();

  //Función para guardar el valor del input en user
  //const onChange = (event) => setUser(event.target.value);
  const { role, onInputChange, onResetForm, formState } = useForm({
    role: null,
  });

  //función  para hacer login
  const enterEvent = (event) => {
    event.preventDefault();
    console.log(formState);
    if (formState.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/staff");
    }
    onResetForm();
  };

  return (
    <>
      <div>
        <h1 className="font-bold text-5xl italic">AnReHis</h1>
        <form
          className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md form-container"
          onSubmit={enterEvent}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Bienvenido de nuevo! Por favor, ingresa tus credenciales.
          </h2>

          <div className="mb-4">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              Usuario
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Usuario"
              name="username"
              // value={username}
              // onChange={onInputChange}
            />
          </div>

          <div className="mb-6">
            <label className="block  text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              name="password"
              // value={password}
              // onChange={onInputChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-primary-blue  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Ingresar
            </button>
          </div>
        </form>
        <div id="app-info" className="p-6">
          <p>
            A platform that displays the database of all the students registered
            in your Institute.
          </p>
        </div>
      </div>
      {/* <br />
      <br /> */}
    </>
  );
}

export { WelcomePage };
