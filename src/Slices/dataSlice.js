import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//All items from the useLocalStorage file
//import { data } from "../Hooks/useLocalStorage"

//Uncomment the next lines if you are using your api,
//the reducers (add any if you need) and the exportations

//import { getAnything } from "../Hooks/useAxios";
//import { setLoading } from "./uiSlice";



/**
 * const  getData  = createAsyncThunk(
    'data/setData',

    //The endpoint is sent from List Components:
    //Staff/index.jsx || Admin/AllStudents || Admin/AllUsers || Admin/AllCourses

    async (endpoint, {dispatch}) => {
        dispatch(setLoading(true))
            //If endpoint includes the word '/users' then it will fetch users
            if (endpoint.includes('/users') ) {
                dispatch(setUsers((await getAnything(endpoint)).data))
            } else if (endpoint.includes('/courses')) {
                dispatch(setCourses((await getAnything(endpoint)).data))
            } else if (endpoint.includes('/programs')){
                dispatch(setPrograms((await getAnything(endpoint)).data))
            }
        dispatch(setLoading(false))
    }
)
 */



const initialState =  {
    users: [],
    courses: [],
    programs: [
        {
            description: 'Eternidad', 
            id: 1
        },
        {
            id: 2,
            description: 'Sanidad'
        }, 
        {
            id: 3,
            description: 'Verguenza'
        }, 
        {
            id: 4,
            description: 'Sapos'
        }, 
    ],
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
        
        
    }
})


export const {
    setSearchValue,
    setUsers, setPrograms, setCourses,
} = dataSlice.actions;

export default dataSlice.reducer;
//export {getData}