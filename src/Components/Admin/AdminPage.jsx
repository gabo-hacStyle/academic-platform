import { useState } from "react";
import React from "react";
import {Searcher} from '../Searcher.jsx'
import './Users/AllUsers.css'
import { useNavigate } from "react-router-dom";
import { AllUsers } from "./Users/AllUsers";
import { AllCourses } from "./Courses/AllCourses";
import { AllStudents } from "./Students/AllStudents";
import { shallowEqual, useSelector } from "react-redux";

function AdminPage () {
    const [modal, setModal] = useState(false)
    const navigate = useNavigate();
    const list = useSelector((state) => state.ui.adminList, shallowEqual);

    const handleClick = () => {
        setModal(!modal)
    }
    return (
        
            <div>
                <div className="comps-btw-lists ">
                    <div className="search-and-new">
                        <Searcher />
                        <button
                            onClick={() => handleClick()}
                            className="btn-for-new clickable"
                        >+</button>
                    </div>  
                {modal && 
                <div className="modal-new-items">
                    <ul className="modal-list-container">
                        <li className="clickable new-items" onClick={() => navigate('/admin/students/new')}>+ Estudiante</li>
                        <li className="clickable new-items" onClick={() => navigate('/admin/courses/new')}>+ Curso</li>
                        <li className="clickable new-items" onClick={() => navigate('/admin/users/new')}>+ Usuario</li>
                    </ul>
                </div>
                }
                </div>
            
            
            <ul className="list-container app-list">
            {
                list === 'courses' ? 
                    <AllCourses />
                : list === 'users' ? 
                <AllUsers />
                : <AllStudents/>
            }
            </ul>
            </div>
        
    )
}
export {AdminPage}