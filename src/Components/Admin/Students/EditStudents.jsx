import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCountries } from "../../../Hooks/useFetchLocation";
import Succesfull from "../../Succesfull";
import useLocalStorage from "../../../Hooks/useLocalStorage";
import { useSelector } from "react-redux";
import { useForm } from "../../../Hooks/useForm";

//Uncomment next line if using axios
//import { editData, getItemById } from "../../../Hooks/useAxios";

//If you need to edit something else, for each field:
//-Add its own state
//-Update it when receiving the item
//-Put it inside the editedData object
//Copy and paste the sample jsx code of any field (like email)
//And fix it according to the field you need

//In this component I'm just editing three fields: FullName, location and Email
function EditStudent({ id, setIsSent }) {
  const navigate = useNavigate();

  const { editItem } = useLocalStorage("users");

  //Selecting the user id from the URL
  // const { id } = useParams();
  //Parsing id to number (with databases, you might delete this line)
  //Cuz the endpoint must be a string and the id's are mostly strings
  // const parsedId = parseInt(id);

  const users = useSelector((state) => state.data.users);
  const userToEdit = users.find((user) => user.id === id);

  //Using the useForm hook
  const { formState, onInputChange } = useForm(userToEdit);
  //States to check the form
  const [notFilled, setNotFilled] = useState(false);
  // const [isSent, setIsSent] = useState(false);

  //if using axios
  /**
      //To get the course as an object
    const [item, setItem] = useState({});
     * useEffect(() => {
        const fetchItem = async () => {
            const res = await getItemById('/users/' + id);
            setItem(res.data)
        };
        fetchItem();
    }, [id]);


    //Setting the fields with the values brought from the item
    useEffect(() => {
        setFullName(item.fullName);
        setLocation(item.location);
        setEmail(item.email);
      }, [item]);
    
    //When a field is changed, editedData Obj will update
    useEffect(() => {
      setEditedData({
        fullName,
        location,
        email
      })
    }, [fullName, location,  email])
     */

  //Using external api to get all locations arrount the world
  //Api accessable through axios, configure it in the 'Hooks/useAxios.js' file

  //For the countries and cities dropdown list
  const [countries, setCountries] = useState([]);

  //To bring the countries
  useEffect(() => {
    (async function () {
      const countries = await getCountries();
      setCountries(countries);
    })();
  }, []);

  //Submitting button using axios
  /**
        const handleSubmit = (e) => {
          e.preventDefault();
          //If in the formState there is an empty value, it will not be sent to the database
          if (Object.values(editedData).some(value => value === '' || value === 0)) {
            setNotFilled(true);
            return
          } else {
            setNotFilled(false);
            //Sending the new object to db
            editData(editedData, '/users/' + id)
            setIsSent(true);
          }
        }
      */

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit");
    //If in the formState there is an empty value, it will not be sent to the database
    if (Object.values(formState).some((value) => value === "" || value === 0)) {
      setNotFilled(true);
      return;
    } else {
      setNotFilled(false);
      //Sending the new object to localStorage
      editItem(id, formState);
      setIsSent(true);
    }
  };

  return (
    <>
      <div className="">
        {/* {isSent && <Succesfull text={"Edited"} />} */}

        <h1>Editiando: {formState.fullName} </h1>
        <form
          onSubmit={handleSubmit}
          className="w-[90%]  mx-auto mt-10 p-6 bg-white rounded-lg shadow-md relative"
        >
          {/* <button className="text-xs underline text-primary-blue/60 absolute top-0 left-4" onClick={() => navigate(-1)}>
    &lt; Admin
  </button> */}

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullName"
            >
              Name
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formState.fullName === "" ? "empty" : ""}`}
              type="text"
              name="fullName"
              id="fullName"
              value={formState.fullName}
              onChange={onInputChange}
            />
            <span className="text-sm text-gray-600">
              New name: {formState.fullName}
            </span>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formState.email === "" ? "empty" : ""}`}
              type="text"
              name="email"
              id="email"
              value={formState.email}
              onChange={onInputChange}
            />
            <span className="text-sm text-gray-600">
              New email: {formState.email}
            </span>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="location"
              id="location"
              value={formState.location}
              onChange={onInputChange}
            >
              <option value="">Select country</option>
              {countries.map((country) => (
                <option key={country.country_name} value={country.country_name}>
                  {country.country_name}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-600 mt-2">
              Location: {formState.location}
            </p>
          </div>

          {notFilled && (
            <p className="text-red-500 text-xs italic mb-4">
              Fill all the fields
            </p>
          )}

          <div className="flex justify-end">
            <button
              className="bg-primary-blue text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export { EditStudent };
