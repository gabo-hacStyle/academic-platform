import { useNavigate } from "react-router-dom";
import { useState } from "react";
//File to manage a creation form
import { useForm } from "../../../Hooks/useForm";
import Succesfull from "../../Succesfull";
import { useEffect } from "react";
import { getCountries } from "../../../Hooks/useFetchLocation";
import "../Styles/creation.css";
import useLocalStorage from "../../../Hooks/useLocalStorage";

//Uncomment next line if using axios and comment the following
//import { postData, getAnything } from "../../../Hooks/useAxios";

//If you need to create one more field or fix your fields to your needs:
//Manage them where the useForm is being manipulated:
//-Add the fields' name in the destructuration
//-Inside the function´s argument ({}) set the field and the type of variable
//Eg: preferences: [],
//If the value is a number, go to Hooks/useForm.js and add it in the conditional
//Copy and paste the sample jsx code of any field (like email)
//And fix it according to the field you need

function CreateStudent({ setIsSent }) {
  const navigate = useNavigate();
  //States to check the form
  const [notFilled, setNotFilled] = useState(false);
  // const [isSent, setIsSent] = useState(false);

  //using localStorage, function addItem
  const { addItem } = useLocalStorage("users", []);

  //useForm object being manipulated
  //In the destructuration we bring the new state of the form and of all its fields
  //In the args we set the initial state
  //If wanna see how useForm is being used, go to Hooks/useForm.js
  const {
    fullName,
    onInputChange,
    password,
    email,
    gender,
    location,
    documentNo,
    onResetForm,
    formState,
  } = useForm({
    fullName: "",
    password: "",
    email: "",
    documentNo: "",
    gender: "",
    location: "",
    //Student's role = 3
    roleId: 3,
  });

  //State for the initial password
  //in order to confirm if the user types the same pwd in both inputs
  const [initPsswd, setInitPsswd] = useState("");

  //For the countries dropdown list using thrid-party api
  const [countries, setCountries] = useState([]);

  //To bring the countries
  useEffect(() => {
    (async function () {
      const countries = await getCountries();
      setCountries(countries);
    })();
  }, []);

  //If using axios
  /**
     * 
     const handleSubmit = (e) => {
        e.preventDefault();

        //if in the formState there is an empty value, it will not be sent to the database
        //Also if you added another type of value, and you dont want it empty, 
        //add it to the conditional: Eg. || value === []      
        if (Object.values(formState).some(value => value === '')) {
                setNotFilled(true);
                return 
            } else {  
                setNotFilled(false);
                postData(formState, '/users')
                onResetForm();
                setIsSent(true);
            }
    }
     */

  //Comment this func if using axios
  const handleSubmit = (e) => {
    e.preventDefault();
    //if in the formState there is an empty value, it will not be sent to localStorage
    //Also if you added another type of value, and you dont want it empty,
    //add it to the conditional: Eg. || value === []
    if (Object.values(formState).some((value) => value === "")) {
      setNotFilled(true);
      return;
    } else {
      setNotFilled(false);
      addItem(formState);
      onResetForm();
      setIsSent(true);
    }
  };

  return (
    // <div className="comps-btw-lists">
    //   {isSent && <Succesfull text={"Created"} />}

    //   <div className="title">
    //     <h1>Creación de un nuevo estudiante </h1>
    //   </div>

    <form onSubmit={handleSubmit} method="post">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="fullName"
        >
          Name
        </label>
        <input
          placeholder="Full name"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${fullName === "" ? "empty" : ""}`}
          type="text"
          name="fullName"
          value={fullName}
          onChange={onInputChange}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="location"
        >
          Location
        </label>
        <select
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${location === "" ? "empty" : ""}`}
          name="location"
          value={location}
          onChange={onInputChange}
        >
          <option value="">Select country</option>
          {countries.map((country) => (
            <option key={country.country_name} value={country.country_name}>
              {country.country_name}
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-600 mt-2">{location}</p>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="init-psswdd"
        >
          Password
        </label>
        <input
          placeholder="Password"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${initPsswd !== password ? "error" : initPsswd === "" ? "empty" : ""}`}
          type="password"
          name="init-psswdd"
          onChange={(e) => setInitPsswd(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Confirm password
        </label>
        {password !== "" ? (
          initPsswd === password ? (
            <p className="text-green-500 text-xs italic">Passwords match</p>
          ) : (
            <p className="text-red-500 text-xs italic">Passwords don't match</p>
          )
        ) : null}
        <input
          placeholder="Confirm password"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${initPsswd !== password ? "error" : initPsswd === "" ? "empty" : ""}`}
          type="password"
          name="password"
          value={password}
          onChange={onInputChange}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          placeholder="Email"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${email === "" ? "empty" : ""}`}
          type="email"
          name="email"
          onChange={onInputChange}
          value={email}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="documentNo"
        >
          Document Number
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${documentNo === "" ? "empty" : ""}`}
          type="number"
          name="documentNo"
          value={documentNo}
          onChange={onInputChange}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="gender"
        >
          Gender
        </label>
        <select
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${gender === "" ? "empty" : ""}`}
          name="gender"
          value={gender}
          onChange={onInputChange}
        >
          <option value="">Select an option</option>
          <option value="F">Female</option>
          <option value="M">Male</option>
        </select>
      </div>

      {notFilled && (
        <p className="text-red-500 text-xs italic mb-4">Fill all the fields</p>
      )}

      <div className="flex justify-end">
        <button
          className="bg-primary-blue text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Crear
        </button>
      </div>
    </form>
    // </div>
  );
}
export { CreateStudent };
