import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getData } from "../../../Slices/dataSlice";
import { useEffect } from "react";
import Loader from "../../Loader";

function AllStudents () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const users = useSelector((state) => state.data.users, shallowEqual);
    const students = users.filter(user => user.roleId === 3);
    const searchValue = useSelector((state) => state.data.searchValue);
    const loading = useSelector((state) => state.ui.loading)

    const filteredStudents = students.filter((student) => {
        const text = student.fullName.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return text.includes(searchText);
    }) 


    console.log(students)
    useEffect(() => {
        dispatch(getData('/users'));
    }, []);


    
    return ( 
        <>
            {loading && <Loader />}
            {
                searchValue ? filteredStudents.map((item, index )=> (
                    <li
                        key={index}
                    >
                        {item.fullName} 
                        <span><button 
                            className="clickable"
                            onClick={() => {
                            navigate('/admin/students/edit/' + item.id, {
                                state: {
                                    id: item.id
                                }
                            })
                        }}>Editar</button></span>
                    </li>
                )) : students.map((item, index )=> (
                    <li
                        key={index}
                    >
                        {item.fullName} 
                        <span><button 
                            className="clickable"
                            onClick={() => {
                            navigate('/admin/students/edit/' + item.id, {
                                state: {
                                    id: item.id
                                }
                            })
                        }}>Editar</button></span>
                    </li>
                ))
            }
        </>
    )
}
export {AllStudents}