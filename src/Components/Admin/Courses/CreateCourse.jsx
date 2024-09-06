import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
//File to manage a creation form
import { useForm } from "../../../Hooks/useForm";
import Succesfull from "../../Succesfull";
import { useEffect } from "react";
import useLocalStorage from "../../../Hooks/useLocalStorage";
//Uncomment next line if using axios
//import { postData, getAnything } from "../../../Hooks/useAxios";

//If you need to create one more field or fix your fields to your needs:
//Manage them where the useForm is being manipulated:
//-Add the fields´ name in the destructuration
//-Inside the function´s argument ({}) set the field and the type of variable
//Eg: teacher: '',
//If the value is a number, go to Hooks/useForm.js and add it in the conditional
//Copy and paste the sample jsx code of any field (like description)
//And fix it according to the field you need

function CreateCourse() {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  //Brining programs to choose the new course's program
  //States to check the form
  const [notFilled, setNotFilled] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const { addItem } = useLocalStorage("courses", []);

  //useForm object being manipulated
  //In the destructuration we bring the new state of the form and of all its fields
  //In the args we set the initial state
  //If wanna see how useForm is being used, go to Hooks/useForm.js
  const { description, code, teacher, onInputChange, onResetForm, formState } =
    useForm({
      description: "",
      code: "",
      teacher: "",
    });

  //If using axios
  /**
     * To get the programs
     * useEffect(() => {
        dispatch(getAnything('/programs'))
    }, [])
     */
  /**
     * const handleSubmit = (e) => {
        e.preventDefault();
        //if in the formState there is an empty value, it will not be sent to the database
        //Also if you added another type of value, and you dont want it empty, 
        //add it to the conditional: Eg. || value === []
        if (Object.values(formState).some(value => value === '' || value === 0)) {
            setNotFilled(true);
            return 
        } else {  
            setNotFilled(false);
            postData(formState, '/courses')
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
    <div className="comps-btw-lists">
      {isSent && <Succesfull text={"Created"} />}

      <button className="back-button" onClick={() => navigate(-1)}>
        &lt;
      </button>

      <div className="title">
        <h1>New Course</h1>
      </div>

      <form onSubmit={handleSubmit} className="create-form" method="post">
        <h2>Name:</h2>
        <input
          className={description === "" ? "empty" : ""}
          type="text"
          name="description"
          value={description}
          onChange={onInputChange}
        />

        <h2>Code:</h2>

        <input
          className={code === "" ? "empty" : ""}
          type="text"
          name="code"
          value={code}
          onChange={onInputChange}
        />

        <h2>Teacher: </h2>

        <input
          className={teacher === "" ? "empty" : ""}
          type="text"
          name="teacher"
          value={teacher}
          onChange={onInputChange}
        />

        {notFilled && <p className="error">Fill all the fields</p>}

        <button className="clickable" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
export { CreateCourse };
