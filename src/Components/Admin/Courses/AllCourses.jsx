import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getData } from "../../../Slices/dataSlice";
import { useEffect, useState } from "react";
import Loader from "../../Loader";
import './AllCourses.css';

function AllCourses () {
    //React, Navigate and Redux tools needed
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //States stored in the Store (redux-toolkit)
    const programs = useSelector((state) => state.data.programs, shallowEqual);
    const searchValue = useSelector((state) => state.data.searchValue);
    const courses = useSelector((state) => state.data.courses)
    const loading = useSelector((state) => state.ui.loading)
    
    //To filter all the programs that match with the searcher text
    const filteredPrograms = programs.filter((program) => {
        const text = program.description.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return text.includes(searchText);
    })
    //To filter all the courses that match with the searcher text
    const filteredCourses = courses.filter((course) => {
        const text = course.description.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return text.includes(searchText);
    }) 


    //Dropdown logic
    const [openPrograms, setOpenPrograms] = useState([]);
    const togglePrograms = (programId) => {
        const programsToDropdown = openPrograms.includes(programId)
        ? openPrograms.filter((id) => id !== programId) 
        : [...openPrograms, programId];
        
        setOpenPrograms(programsToDropdown)
    }
    
    useEffect(() => {
        dispatch(getData('/programs'));
        dispatch(getData('/courses'))
    }, []);

    return (
        <>
            {loading && <Loader />}
            { searchValue ? 
                <>
                    <h3> Programas:</h3>
                    {
                        filteredPrograms.map((item, index) => (
                                <li 
                                key={index}
                                >{item.description}
                                </li>
                        )) 
                    }
                    <h3>Cursos:</h3>
                    {
                            <ul className="item-courses-list">
                            {filteredCourses.map((course, index) => (
                                <li
                                    key={index}

                                >{course.description}
                                    <span><button
                                        className="clickable"
                                        onClick={() => {
                                        navigate('/admin/courses/edit/' + course.id, {
                                            state: {
                                                id: course.id
                                            }
                                        })
                                    }}>Editar</button></span>
                                    
                                </li>
                                ))
                            }
                            </ul>
                    }
                </>  
        : 
        programs.map((item) => (
            <>
                <li 
                key={item.id}
                >{item.description}
                <span className="dropdown-menu"><button
                        className="dropdown-toggle clickable"
                        onClick={() => togglePrograms(item.id)}
                        >Ver cursos</button></span>
                </li> 
                {openPrograms.includes(item.id) && (
                        <ul className="item-courses-list dropdown-items">
                        {item.Courses.map((course, index) => (
                            <li
                                key={index}
            
                            >{course.description}
                                <span><button
                                    className="clickable"
                                    onClick={() => {
                                    navigate('/admin/courses/edit/' + course.id, {
                                        state: {
                                            id: course.id
                                        }
                                    })
                                }}>Editar</button></span>
                                
                            </li>
                            ))
                        }
                        </ul>
                )}
            
            </>
        )) 
        }
        </>
    )
}
export {AllCourses}