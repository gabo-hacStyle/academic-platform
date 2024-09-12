import { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Searcher } from "../Searcher.jsx";
import { ShowStudent } from "./ShowStudent.jsx";
import Loader from "../Loader.jsx";
import { setUsers } from "../../Slices/dataSlice.js";
import useLocalStorage from "../../Hooks/useLocalStorage.js";
import { setShowStudent, setItemId } from "../../Slices/uiSlice.js";
//Uncomment next line if using axios and you already configure it
//import { getData } from "../../Slices/dataSlice.js";

//This component is the main page the Staff will see,
//it's got the filters and searcher comps,
//then shows a list of all the 'students'
//and imports the <ShowStudent /> component that shows the details
//of a specific student

function Staff() {
  const dispatch = useDispatch();
  const showStudent = useSelector((state) => state.ui.showStudent);
  const student = useSelector((state) => state.data.users.find((user) => user.id === state.ui.itemId));



  const users = useSelector((state) => state.data.users);
  //The students are those which roleId is 3
  const students = users.filter((user) => user.roleId === 3);
  //Bring the users from the store
  const loading = useSelector((state) => state.ui.loading);
  const searchValue = useSelector((state) => state.data.searchValue);

  const { data } = useLocalStorage("users", []);

  useEffect(() => {
    dispatch(setUsers(data));
  }, [data, dispatch]);

  //If using axios
  /**
     * useEffect(() => {
        dispatch(getData('/users'));
    }, []);
     */

  //Filter all the student that match with the searcher's value
  const searchedStudents = students.filter((student) => {
    const text = student.fullName.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return text.includes(searchText);
  });



  //handle when click on the close button, it closes the view
  
  console.log(students);

  return (
    <>
      <div className="mb-7 w-full">
        <Searcher />
      </div>

      <div className="list-container">
        {loading && <Loader />}

        {
          //If view is true, render the ShowStudent component
          showStudent ? (
            <ShowStudent student={student} />
          ) : (<div className="app-list">
            {
              //If searcher has a value, render searchedStudents array
              //If the searcher is empty, render students array
            }
            {searchValue
              ? searchedStudents.map((item, index) => (
                  <>
                    <li key={index}>
                      {item.fullName}
                      <span>
                        
                          <button
                            className="clickable"
                            onClick={() => {
                              dispatch(setShowStudent(true));
                              dispatch(setItemId(item.id));
                            }}
                          >
                            Ver
                          </button>
                        
                      </span>
                    </li>
                   
                  </>
                ))
              : students.map((item, index) => (
                  <>
                    <li key={index}>
                      {item.fullName}
                      <span>
                        
                          <button
                            className="clickable"
                            onClick={() => {
                              dispatch(setShowStudent(true));
                              dispatch(setItemId(item.id));
                            }}
                          >
                            Ver
                          </button>
                        
                      </span>
                    </li>
                    
                  </>
                ))}
          </div>)
        }

        
      </div>
    </>
  );
}

export { Staff };
