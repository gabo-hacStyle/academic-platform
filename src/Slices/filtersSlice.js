import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLocations } from "../Hooks/useAxios";
import { setLoading } from "./uiSlice";


//Create an async thunk for the filters
/**
 * const  getFilters  = createAsyncThunk(
    'filters/setFilters',
    async (_, {dispatch}) => {
        dispatch(setLoading(true))
        dispatch(setLocations((await getLocations()).data))
        dispatch(setLoading(false))
    }
)
 */

        
const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        locations: [2, 23 ,3, 4],
        genders: ['M', 'F'],
        ages: ['30-50', '51-70'],
        filters: {
            locations : [],
            genders: [],
            ages : [],
            courses: [],
            programs: []
        }
    },
    reducers: {
        setLocations: (state, action) => {
            state.locations = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        }
    }
})
export const {
    setLocations,
    setCourses,
    setFilters,
} = filtersSlice.actions;
//export { getFilters };
export default filtersSlice.reducer;
