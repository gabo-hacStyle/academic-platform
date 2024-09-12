import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { getData } from "../../../Slices/dataSlice";
//import { useEffect } from "react";
import Loader from "../../Loader";
import useLocalStorage from "../../../Hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { setUsers } from "../../../Slices/dataSlice";
import Empty from "../../Empty";

import ListItem from "../../shared/ListItem";
import ShowItemDetails from "../shared/ShowItemDetails";

function AllStudents() {
  //If using axios
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Bring the users from the store
  const users = useSelector((state) => state.data.users);
  //The students are those which roleId is 3
  const students = users.filter((user) => user.roleId === 3);

  const searchValue = useSelector((state) => state.data.searchValue);
  const loading = useSelector((state) => state.ui.loading);

  //Estados para abrir la vista de un solo item
  const [view, setView] = useState(false);
  //Estados para guardar el id del item a ver
  const [itemsToShow, setItemsToShow] = useState([]);

  //State to check if there's no data

  const { data } = useLocalStorage("users", []);

  useEffect(() => {
    dispatch(setUsers(data));
  }, []);

  //If using axios
  /**
            useEffect(() => {
                dispatch(getData('/users'));
            }, []);
        */

  //Filter all the Students that match with the searcher's value
  const searchedStudents = students.filter((student) => {
    const text = student.fullName.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return text.includes(searchText);
  });
  console.log(view);
  console.log(itemsToShow);
  return (
    <>
      {loading && <Loader />}
      {students.length === 0 && <Empty text={"Students"} />}
      {
        //If searcher has a value, render searchedStudents array,
        //If the searcher is empty, render students array
      }
      {searchValue
        ? searchedStudents.map((item, index) => (
            <>
              <ListItem
                key={index}
                item={item}
                view={view}
                formToRender={"editStudent"}
                itemsToShow={itemsToShow}
                setItemsToShow={setItemsToShow}
                setView={setView}
              />
              {
                //If view is true, it will render the view of the item
                view && itemsToShow.includes(item.id) && (
                  <ShowItemDetails
                    id={item.id}
                    location={item.location}
                    gender={item.gender}
                    email={item.email}
                    documentNo={item.documentNo}
                    birthDate={item.birthDate}
                  />
                )
              }
            </>
          ))
        : students.map((item, index) => (
            <>
              <ListItem
                key={index}
                item={item}
                view={view}
                formToRender={"editStudent"}
                itemsToShow={itemsToShow}
                setItemsToShow={setItemsToShow}
                setView={setView}
              />
              {
                //If view is true, it will render the view of the item
                view && itemsToShow.includes(item.id) && (
                  <ShowItemDetails
                    id={item.id}
                    location={item.location}
                    gender={item.gender}
                    email={item.email}
                    documentNo={item.documentNo}
                    birthDate={item.birthDate}
                  />
                )
              }
            </>
          ))}
    </>
  );
}
export { AllStudents };
