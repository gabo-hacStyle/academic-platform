import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getData } from "../../../Slices/dataSlice";
import { useEffect } from "react";
import Loader from "../../Loader";

function AllUsers () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const users = useSelector((state) => state.data.users);
    const searchValue = useSelector((state) => state.data.searchValue)

    const loading = useSelector((state) => state.ui.loading);
    
    useEffect(() => {
        dispatch(getData('/users'));   
    }, []);

    
    const filteredUsers = users.filter((user) => {
        const text = user.fullName.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return text.includes(searchText);
    }) 
     
    
    
    return (
        <>
            {loading ? <Loader/> : <p
                style={{ marginBottom: '1rem' }}
            >*Para editar los estudiantes, dirigete a la pestaña de estudiantes</p>}
            
            {
                searchValue ? filteredUsers.map((item, index )=> (
                    <li
                        key={index}
                    >
                        {item.fullName}
                        {item.roleId != 3 ? 
                            <span><button 
                            className="clickable"
                            onClick={() => {
                                navigate('/admin/users/edit/' + item.id, {
                                    state: {
                                        id: item.id
                                    }
                                })
                            }}>Editar</button></span> : null
                        }
                        
                    </li>
                )) : users.map((item, index )=> (
                    <li
                        key={index}
                    >
                        {item.fullName} 
                        {item.roleId != 3 ? 
                            <span><button 
                            className="clickable"
                            onClick={() => {
                                navigate('/admin/users/edit/' + item.id, {
                                    state: {
                                        id: item.id
                                    }
                                })
                            }}>Editar</button></span> : null
                        }
                    </li>
                ))
            }
        </>
    )
}
export {AllUsers}