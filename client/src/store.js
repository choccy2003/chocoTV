import { configureStore } from '@reduxjs/toolkit';
import userDataReducer from './redux-slice/userDataSlice';
import videoDataReducer from "./redux-slice/videoDataSlice"
const store = configureStore({
  reducer: {
    userData: userDataReducer,
    videoData: videoDataReducer
  },
});

export default store;