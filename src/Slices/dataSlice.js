import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCourses, getUsers, getPrograms } from "../Hooks/useAxios";
import { setLoading } from "./uiSlice";


/**
 * const  getData  = createAsyncThunk(
    'data/setData',
    async (endpoint, {dispatch}) => {
        dispatch(setLoading(true))
        //If endpoint includes the word '/users' then it will fetch users
        if (endpoint.includes('/users') ) {
            dispatch(setUsers((await getUsers(endpoint)).data))
        } else if (endpoint === '/courses') {
            dispatch(setCourses((await getCourses()).data))
        } else if (endpoint === '/programs'){
            dispatch(setPrograms((await getPrograms()).data))
        }
            dispatch(setLoading(false))
    }
)
 */



const initialState =  {
    users: [],
    courses: [],
    programs: [],
    
    searchValue: '',
}


export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setCourses: (state, action) => {
            state.courses = action.payload;
        },
        setPrograms: (state, action) => {
            state.programs = action.payload;
        },
        setUsersFiltered: (state, action) => {
            state.usersFiltered = action.payload;
        },
    }
})


export const {
    setSearchValue,
    setUsers, setPrograms, setCourses,
    
    setUsersFiltered,
} = dataSlice.actions;

export default dataSlice.reducer;
//export {getData}