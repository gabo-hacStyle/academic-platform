import {  useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
//import { getData } from "../../../Slices/dataSlice";
import { useEffect, useState } from "react";
import Loader from "../../Loader";
import './AllCourses.css';
import { setCourses } from "../../../Slices/dataSlice";
import useLocalStorage from "../../../Hooks/useLocalStorage";
import Empty from "../../Empty";

function AllCourses () {
    //React, Navigate and Redux tools needed
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //States stored in the Store (redux-toolkit)

    const courses = useSelector((state) => state.data.courses)
    const searchValue = useSelector((state) => state.data.searchValue);
    const loading = useSelector((state) => state.ui.loading)

    

    //To bring the data from users from localStorage
    const {data} = useLocalStorage('courses', [])
    
    //To filter all the programs that match with the searcher text
    
    
     
    useEffect(() => {
        dispatch(setCourses(data))
    })
    
    //State to check if there's no data


    //To filter all the courses that match with the searcher text
    const searchedCourses = courses.filter((course) => {
        const text = course.description.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return text.includes(searchText);
    }) 

    
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
            
            {courses.length === 0 && <Empty  text={"Courses"}/> }
                {
                    //If searcher has a value, it will render both searched: programs & courses
                    //If the searcher is empty, it will render only the programs with a dropdown
                    //button that shows each program's courses
                }
            

            { 
            
            searchValue ? 
                <>
                    <h3>Courses:</h3>
                        {
                                <ul className="item-courses-list">
                                {
                                    searchedCourses.map((course, index) => (
                                        <li key={index}>
                                            {course.description} - {course.code} :  👨🏻‍🏫 {course.teacher}
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
                       courses.map((course, index) => (
                                    <li key={index}>
                                            {course.description} - {course.code} :👨🏻‍🏫 {course.teacher}
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
        </>
    )
}
export {AllCourses}