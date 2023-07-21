import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Filters } from "./Filters.jsx";
import { Searcher } from "../Searcher.jsx";
import { ShowStudent } from "./ShowStudent.jsx";
import Loader from "../Loader.jsx";
//Uncomment next line if using axios and you already configure it 
//import { getData } from "../../Slices/dataSlice.js";


//This component is the main page the Staff will see, 
//it's got the filters and searcher comps,
//then shows a list of all the 'students'
//and imports the <ShowStudent /> component that shows the details
//of a specific student 

function Staff () {
    //If using axios
    //const dispatch = useDispatch();
   
    
    //State to open the view of a single item
    const [view, setView] = useState(false);
    //State to save the id of the item to view
    const [student, setStudent] = useState([]);

    //Bring the users from the store
    const users = useSelector((state) => state.data.users);
    //The students are those which roleId is 3
    const students = users.filter((user) => user.roleId === 3);
    const loading = useSelector((state) => state.ui.loading);
    const searchValue = useSelector((state) => state.data.searchValue);

   //If using axios 

    /**
     * useEffect(() => {
        dispatch(getData('/users'));
    }, []);
     */
    
    //Filter all the student that match with the searcher's value
    const searchedStudents = students.filter((student) => {
        //const text = student.fullName.toLowerCase();
        const text = student.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return text.includes(searchText);
    }) 

    //Handle when click on an item, it opens the view
    //many items can be seen simontaneously
    const handleView = (id) => {
        setView(true);
        setStudent([...student, id]);
    }

    //handle when click on the close button, it closes the view
    const handleClose = (id) => {
        //Deletes the id from the array
        setStudent(student.filter((item) => item !== id));
        //If the array is empty, it closes the view
        if(id.length === 0) {
            setView(false);
        }
    }

    return (
        <>
            <Filters />

            <Searcher />

            <div className="list-container">

                {loading && <Loader />}
                
                <div className="app-list">
                    {//If searcher has a value, render searchedStudents array 
                    //If the searcher is empty, render students array
                    }
                {
                    searchValue ? searchedStudents.map((item, index )=> (
                        <>
                            <li key={index}>
                                {item.fullName} 
                                <span>
                                    {
                                        view && student.includes(item.id) ? (
                                            <button 
                                            className="clickable"
                                            onClick={() => handleClose(item.id) }>
                                                Cerrar
                                            </button>
                                        ) :
                                            <button 
                                            className="clickable"
                                            onClick={() => handleView(item.id) }>
                                                 Ver
                                            </button>
                                    }
                                </span>
                            </li>
                                    {
                                        view && student.includes(item.id) && (
                                            <ShowStudent
                                                id={item.id} 
                                                location={item.location}
                                                genre={item.genre}
                                                email={item.email}
                                                documentNo={item.documentNo}
                                                birthDate={item.birthDate}
                                            />
                                        )
                                    }
                        </> 
                    )) 
                    : 
                    students.map((item, index )=> (
                        <>
                            <li key={index}>
                                {item.fullName} 
                                <span>
                                    {
                                        view && student.includes(item.id) ? (
                                            <button 
                                            className="clickable"
                                            onClick={() => handleClose(item.id) }>
                                                Cerrar
                                            </button>
                                        ) :
                                            <button 
                                            className="clickable"
                                            onClick={() => handleView(item.id) }>
                                                Ver
                                            </button>
                                    }                       
                                </span>    
                            </li>
                                    {
                                        view && student.includes(item.id) && (
                                            <ShowStudent
                                                id={item.id} 
                                                location={item.location}
                                                genre={item.genre}
                                                email={item.email}
                                                documentNo={item.documentNo}
                                                birthDate={item.birthDate}
                                            />
                                        )
                                    }
                        </> 
                    ))
                }
                </div>
            </div>
        </>
    )
}

export {Staff}