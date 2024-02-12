import { configureStore } from '@reduxjs/toolkit';
import userDataReducer from './redux-slice/userDataSlice';
const store = configureStore({
  reducer: {
    userData: userDataReducer
  },
});

export default store;