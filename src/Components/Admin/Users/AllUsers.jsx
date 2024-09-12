import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { getData } from "../../../Slices/dataSlice";
import { useEffect, useState } from "react";
import Loader from "../../Loader";
import useLocalStorage from "../../../Hooks/useLocalStorage";
import { setUsers } from "../../../Slices/dataSlice";
import Empty from "../../Empty";
import { setItemId, setFormToRender } from "../../../Slices/uiSlice";
import ListItem from "../../shared/ListItem";
import ShowItemDetails from "../shared/ShowItemDetails";

function AllUsers() {
  const dispatch = useDispatch();

  const [view, setView] = useState(false);
  //Estados para guardar el id del item a ver
  const [itemsToShow, setItemsToShow] = useState([]);

  //If using axios
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const people = useSelector((state) => state.data.users);
  const users = people.filter((person) => person.roleId !== 3);
  const searchValue = useSelector((state) => state.data.searchValue);
  const loading = useSelector((state) => state.ui.loading);
  //To bring the data from users from localStorage
  const { data } = useLocalStorage("users", []);

  useEffect(() => {
    dispatch(setUsers(data));
  }, []);

  //If using axios
  /*
            useEffect(() => {
                dispatch(getData('/users'));   
            }, []);
        */

  //Filter all the users that match with the searcher's value
  const searchedUsers = users.filter((user) => {
    const text = user.fullName.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return text.includes(searchText);
  });

  return (
    <>
      {loading && <Loader />}

      {users.length === 0 && (
        <div style={{ display: "flex" }}>
          <Empty text={"Users"} />

          <span> Users: staff or teachers</span>
        </div>
      )}

      <>
        {
          //If searcher has a value, render searchedUsers array,
          //If the searcher is empty, render students array
        }

        {searchValue
          ? searchedUsers.map((item, index) => (
              <>
                <ListItem
                  key={index}
                  item={item}
                  formToRender={"editUser"}
                  view={view}
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
          : users.map((item, index) => (
              <>
                <ListItem
                  key={index}
                  item={item}
                  formToRender={"editUser"}
                  view={view}
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
    </>
  );
}
export { AllUsers };
