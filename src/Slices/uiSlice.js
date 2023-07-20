import { createSlice } from "@reduxjs/toolkit"

const initialState =  {
    adminList: 'users',
    loading: false
}
//Inside this slice, we will have the state of the UI, like the current adminList, and the loading state of the app.

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setAdminList: (state, action) => {
            state.adminList = action.payload;
        },
        setLoading: (state, action) => {  
            state.loading = action.payload;
        }
    }
});
export const {
    setAdminList,
    setLoading
} = uiSlice.actions;
export default uiSlice.reducer;