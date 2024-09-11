import { useState } from "react";
import React from "react";
import { Searcher } from "../Searcher.jsx";
import "./Users/AllUsers.css";
import { useNavigate } from "react-router-dom";
import { AllUsers } from "./Users/AllUsers";
import { AllCourses } from "./Courses/AllCourses";
import { AllStudents } from "./Students/AllStudents";
import { shallowEqual, useSelector } from "react-redux";

//This component is the main page the admin will see.
//It's got a searcher,a modal to create new items
//and lists that would be rendered according to the state stored in ui.slice

function AdminPage() {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  //Bringing the list which will be rendered, configured in the ui.slice
  const list = useSelector((state) => state.ui.adminList, shallowEqual);

  const handleClick = () => {
    setModal(!modal);
  };
  return (
    <>
      <div >
        <div className="flex items-center w-full mb-6 gap-3">
          <Searcher />
          <button
            onClick={() => handleClick()}
            className="btn-for-new clickable"
          >
            <span className="hidden md:inline">Nuevo </span>+
          </button>
        </div>
        {modal && (
          <div className="modal-new-items">
            <ul className="modal-list-container">
              <li
                className="clickable new-items"
                onClick={() => navigate("/admin/students/new")}
              >
                + Student
              </li>
              <li
                className="clickable new-items"
                onClick={() => navigate("/admin/courses/new")}
              >
                + Course
              </li>
              <li
                className="clickable new-items"
                onClick={() => navigate("/admin/users/new")}
              >
                + User
              </li>
            </ul>
          </div>
        )}
      </div>

      <ul className="list-container app-list">
        {list === "courses" ? (
          <AllCourses />
        ) : list === "users" ? (
          <AllUsers />
        ) : (
          <AllStudents />
        )}
      </ul>
    </>
  );
}
export { AdminPage };
