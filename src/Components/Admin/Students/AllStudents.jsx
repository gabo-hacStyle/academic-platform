import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
//import { getData } from "../../../Slices/dataSlice";
//import { useEffect } from "react";
import Loader from "../../Loader";
import useLocalStorage from "../../../Hooks/useLocalStorage";
import { useEffect } from "react";
import { setUsers } from "../../../Slices/dataSlice";

function AllStudents () {

    //If using axios
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    //Bring the users from the store
    const users = useSelector((state) => state.data.users);
    //The students are those which roleId is 3
    const students = users.filter((user) => user.roleId === 3);

    const searchValue = useSelector((state) => state.data.searchValue);
    const loading = useSelector((state) => state.ui.loading)

    const {data} =useLocalStorage('users', [])

    useEffect(() => {
        dispatch(setUsers(data))
    }, [])

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
    }) 
        
    return ( 
        <>
            {loading && <Loader />}
                    {
                     //If searcher has a value, render searchedStudents array,
                     //If the searcher is empty, render students array
                    }
            {
                searchValue ? searchedStudents.map((item, index )=> (
                    <li key={index}>
                        {item.fullName} 
                            <span>
                                <button 
                                className="clickable"
                                onClick={() => {
                                    navigate('/admin/students/edit/' + item.id, {
                                        state: {
                                            id: item.id
                                        }
                                    })
                                }}>
                                    Editar
                                </button>
                            </span>
                    </li>
                )) : students.map((item, index )=> (
                    <li key={index}>
                        {item.fullName} 
                            <span>
                                <button 
                                className="clickable"
                                onClick={() => {
                                    navigate('/admin/students/edit/' + item.id, {
                                        state: {
                                            id: item.id
                                        }
                                    })
                                }}>
                                    Editar
                                </button>
                            </span>
                    </li>
                ))
            }
        </>
    )
}
export {AllStudents}