import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { getData } from "../../../Slices/dataSlice";
import { useEffect, useState } from "react";
import Loader from "../../Loader";
import useLocalStorage from "../../../Hooks/useLocalStorage";
import { setUsers } from "../../../Slices/dataSlice";
import Empty from "../../Empty";

function AllUsers() {
  const dispatch = useDispatch();
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
        <br />
        <br />

        {
          //If searcher has a value, render searchedUsers array,
          //If the searcher is empty, render students array
        }

        {searchValue
          ? searchedUsers.map((item, index) => (
              <>
                <li key={index}>
                  {item.fullName}
                  {
                    /*This list only allows to edit users, not students */
                    item.roleId != 3 ? (
                      <span>
                        <button
                          className="clickable"
                          onClick={() => {
                            navigate("/admin/users/edit/" + item.id, {
                              state: {
                                id: item.id,
                              },
                            });
                          }}
                        >
                          Editar
                        </button>
                      </span>
                    ) : null
                  }
                </li>
              </>
            ))
          : users.map((item, index) => (
              <>
                <li key={index}>
                  {item.fullName}
                  {
                    /*This list only allows to edit users, not students */
                    item.roleId != 3 ? (
                      <span>
                        <button
                          className="clickable"
                          onClick={() => {
                            navigate("/admin/users/edit/" + item.id, {
                              state: {
                                id: item.id,
                              },
                            });
                          }}
                        >
                          Editar
                        </button>
                      </span>
                    ) : null
                  }
                </li>
              </>
            ))}
      </>
    </>
  );
}
export { AllUsers };
