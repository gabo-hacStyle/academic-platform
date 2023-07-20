import { ShowStudent } from "./ShowStudent.jsx";
//import {  useParams } from "react-router-dom";
import { Searcher } from "../Searcher.jsx";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { getData } from "../../Slices/dataSlice.js";
import { Filters } from "./Filters.jsx";
import Loader from "../Loader.jsx";


function Staff () {
    const dispatch = useDispatch();
   
    
    //State to open the view of a single item
    const [view, setView] = useState(false);
    //State to save the id of the item to view
    const [student, setStudent] = useState([]);

    //Bring the users from the store
    /*const users = useSelector((state) => state.data.users);
     */
    const students = ['Pedro', ' Mauricio', 'Bemjamin', 'posed' ];
    const loading = useSelector((state) => state.ui.loading);
    const searchValue = useSelector((state) => state.data.searchValue)

   
    /**
     * useEffect(() => {
        dispatch(getData('/users'));
    }, []);
     */
    

    const searchedStudents = students.filter((student) => {
        //const text = student.fullName.toLowerCase();
        const text = student.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return text.includes(searchText);
    }) 

    //Handle when click on an item, it opens the view and let many items to be viewed

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
                {
                   
                        searchValue ? searchedStudents.map((item, index )=> (
                            <>
                                <li
                                    key={index}
                                    >
                                    {item.fullName} 
                                    <span>
                                        {
                                            view && student.includes(item.id) ? (
                                                <button 
                                                className="clickable"
                                                onClick={() => handleClose(item.id) }>
                                                    Cerrar
                                                </button>
                                            ):
                                                <button 
                                                className="clickable"
                                                onClick={() => handleView(item.id) }>
                                                    Ver
                                                </button>
                                        }
                                    </span>
                                    
                                </li>
                                {view && student.includes(item.id) && (
                                        <ShowStudent
                                            id={item.id} 
                                            location={item.location}
                                            genre={item.genre}
                                            email={item.email}
                                            documentNo={item.documentNo}
                                            birthDate={item.birthDate}
                                        />
                                )}
                            </> 
                        )) 
                        : 
                        students.map((item, index )=> (
                            <>
                                <li
                                    key={index}
                                    >
                                    {item.fullName} 
                                    <span>
                                        {
                                            view && student.includes(item.id) ? (
                                                <button 
                                                className="clickable"
                                                onClick={() => handleClose(item.id) }>
                                                    Cerrar
                                                </button>
                                            ):
                                                <button 
                                                className="clickable"
                                                onClick={() => handleView(item.id) }>
                                                    Ver
                                                </button>
                                        }
                                       
                                    </span>
                                    
                                </li>
                                {view && student.includes(item.id) && (
                                    
                                        <ShowStudent
                                            id={item.id} 
                                            location={item.location}
                                            genre={item.genre}
                                            email={item.email}
                                            documentNo={item.documentNo}
                                            birthDate={item.birthDate}
                                        />
                                )}
                            </> 
                        ))
                }
                </div>
                
            </div>
        </>
    )
}

export {Staff}