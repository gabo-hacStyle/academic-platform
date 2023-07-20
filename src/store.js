import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './Slices/dataSlice';
import uiReducer from './Slices/uiSlice';
import filtersReducer from './Slices/filtersSlice';
//Slices que creemos

export const store = configureStore({
  reducer: {
    data: dataReducer,
    ui: uiReducer,
    filters: filtersReducer,
  },
});


//Probably the next lines will be for Typescript


// Infer the `RootState` and `AppDispatch` types from the store itself
//export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
//export type AppDispatch = typeof store.dispatch;//