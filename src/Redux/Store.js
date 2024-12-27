import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../Redux/postSlice';

const store = configureStore({
  reducer: {
    post: postReducer,
  },
});

export default store;
