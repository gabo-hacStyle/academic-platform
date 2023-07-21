import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
//import { getData } from "../../../Slices/dataSlice";
//import { useEffect } from "react";
import Loader from "../../Loader";

function AllUsers () {
    //If using axios
    //const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.data.users);
    const searchValue = useSelector((state) => state.data.searchValue)
    const loading = useSelector((state) => state.ui.loading);
    
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
    })   
    return (
        <>
            {
                loading ? <Loader/> 
                : 
                <> 
                    <p style={{ marginBottom: '1rem' }}>
                        *To edit the students, go to the students list
                    </p>

                    {
                     //If searcher has a value, render searchedUsers array,
                     //If the searcher is empty, render students array
                    }
                    
                    {
                        searchValue ? searchedUsers.map((item, index )=> (
                            <li key={index}>
                                    {item.fullName} 
                                    {
                                        /*This list only allows to edit users, not students */
                                        item.roleId != 3 ? 
                                            <span><button 
                                            className="clickable"
                                            onClick={() => {
                                                navigate('/admin/users/edit/' + item.id, {
                                                    state: {
                                                        id: item.id
                                                    }
                                                })
                                            }}>
                                                Editar
                                            </button></span> : null
                                    }
                                </li>
                        )) : users.map((item, index )=> (
                                <li key={index}>
                                    {item.fullName} 
                                    {
                                        item.roleId != 3 ? 
                                            <span><button 
                                            className="clickable"
                                            onClick={() => {
                                                navigate('/admin/users/edit/' + item.id, {
                                                    state: {
                                                        id: item.id
                                                    }
                                                })
                                            }}>
                                                Editar
                                            </button></span> : null
                                    }
                                </li>
                            ))
                    }
                </>
                
            }
                
            
        </>
    )
}
export {AllUsers}