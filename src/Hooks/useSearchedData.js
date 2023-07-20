import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../Slices/dataSlice";


function searchedData () {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.data.users, shallowEqual);
    const programs = useSelector((state) => state.data.users, shallowEqual);
    const students = users.filter(user => user.roleId === 3);

    const searchValue = useSelector((state) => state.data.searchValue)
   dispatch(setUsers(users.filter((item) => {
        const text = item.fullName.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return text.includes(searchText)
    })
   )) 
} 