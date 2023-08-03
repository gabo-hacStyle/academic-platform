import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


//Uncomment the next lines if you are using your api,
//the reducers (add any if you need) and the exportations

//import { getAnything } from "../Hooks/useAxios";
//import { setLoading } from "./uiSlice";

;

//Create an async thunk to get anything needed for your filters
//for example, bringing all the locations of your db:
    /**
     * const  getFilters  = createAsyncThunk(
        'filters/setFilters',
        async (_, {dispatch}) => {
            dispatch(setLoading(true))
            dispatch(setLocations((await getAnything('/options/locations')).data))
            dispatch(setLoading(false))
        }
    )
    */

//If bringing data from somewhere else, intialState is an empty array
//Eg. locations: []

const initialState =  {
    locations: [],
    genders: ['M', 'F'],
    
    filters: {
        locations : [],
        genders: [],
        ages : [],
        courses: [],
        programs: []
    }
}
const filtersSlice = createSlice({
    name: 'filters',
    initialState: initialState,
    reducers: {
        /**
         *  setLocations: (state, action) => {
                state.locations = action.payload;
            },
         *
        */
        setFilters: (state, action) => {
            state.filters = action.payload;
        }
    }
})
export const {
   //setLocations,
    setFilters,
} = filtersSlice.actions;
//export { getFilters };
export default filtersSlice.reducer;
