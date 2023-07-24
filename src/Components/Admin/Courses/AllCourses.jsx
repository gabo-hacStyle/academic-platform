import {  useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
//import { getData } from "../../../Slices/dataSlice";
import { useEffect, useState } from "react";
import Loader from "../../Loader";
import './AllCourses.css';
import { setCourses } from "../../../Slices/dataSlice";
import useLocalStorage from "../../../Hooks/useLocalStorage";

function AllCourses () {
    //React, Navigate and Redux tools needed
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //States stored in the Store (redux-toolkit)
    const programs = useSelector((state) => state.data.programs);
    const courses = useSelector((state) => state.data.courses)
    const searchValue = useSelector((state) => state.data.searchValue);
    const loading = useSelector((state) => state.ui.loading)

    //To bring the data from users from localStorage
    const {data} = useLocalStorage('courses', [])
    
    //To filter all the programs that match with the searcher text
    
    const searchedPrograms = programs.filter((program) => {
        const text = program.description.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return text.includes(searchText);
    })
     
    useEffect(() => {
        dispatch(setCourses(data))
    })
    
    //To filter all the courses that match with the searcher text
    const searchedCourses = courses.filter((course) => {
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
    
    //If using axios 
    /*
    useEffect(() => {
        dispatch(getData('/programs'));
        dispatch(getData('/courses'))
    }, []);
     */
    

    return (
        <>
            {loading && <Loader />}

                {
                    //If searcher has a value, it will render both searched: programs & courses
                    //If the searcher is empty, it will render only the programs with a dropdown
                    //button that shows each program's courses
                }

            { 
            searchValue ? 
                <>
                    <h3> Programs:</h3>
                        {
                            searchedPrograms.map((item, index) => (
                                    <li key={index}>
                                        {item.description}
                                    </li>
                            )) 
                        }
                    <h3>Courses:</h3>
                        {
                                <ul className="item-courses-list">
                                {
                                    searchedCourses.map((course, index) => (
                                        <li key={index}>
                                            {course.description}
                                            <span>
                                                <button
                                                    className="clickable"
                                                    onClick={() => {
                                                    navigate('/admin/courses/edit/' + course.id, {
                                                            state: {
                                                                id: course.id
                                                            }
                                                        })
                                                    }}
                                                >Edit
                                                </button>
                                            </span>
                                            
                                        </li>
                                    ))
                                }
                                </ul>
                        }
                </>  
            : 
            programs.map((item) => (
                <>
                    <li key={item.id}>
                        {item.description}
                        <span className="dropdown-menu">
                            <button
                                className="dropdown-toggle clickable"
                                onClick={() => togglePrograms(item.id)}
                            >See courses
                            </button>         
                        </span>
                    </li> 
                    {openPrograms.includes(item.id) && (
                            <ul className="item-courses-list dropdown-items">
                            {
                                courses.filter(course => course.ProgramId === item.id)
                                .map((course, index) => (
                                    <li key={index}>
                                        {course.description}
                                        <span>
                                            <button
                                                className="clickable"
                                                onClick={() => {
                                                navigate('/admin/courses/edit/' + course.id, {
                                                    state: {
                                                        id: course.id
                                                    }
                                                })
                                                }}>
                                            Edit
                                            </button>
                                        </span>
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