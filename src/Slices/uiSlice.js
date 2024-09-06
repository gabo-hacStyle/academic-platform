import { createSlice } from "@reduxjs/toolkit";

//Inside this slice, we will update the state of the UI, like the current adminList, and the loading state of the app.

const initialState = {
  adminList: "users",
  loading: false,
};
export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAdminList: (state, action) => {
      state.adminList = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const { setAdminList, setLoading } = uiSlice.actions;
export default uiSlice.reducer;
