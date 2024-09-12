import { createSlice } from "@reduxjs/toolkit";

//Inside this slice, we will update the state of the UI, like the current adminList, and the loading state of the app.

const initialState = {
  adminList: "users",
  loading: false,
  formToRender: null,
  itemId: null,
  showStudent: false,
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
    setFormToRender: (state, action) => {
      state.formToRender = action.payload;
    },
    setItemId: (state, action) => {
      state.itemId = action.payload;
    },
    setShowStudent: (state, action) => {
      state.showStudent = action.payload;
    },
  },
});
export const { setAdminList, setLoading, setFormToRender, setItemId, setShowStudent } =
  uiSlice.actions;
export default uiSlice.reducer;
