import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loader from "./loader";
import adminSlice from "../redux/adminSlice";

const rootReducer = combineReducers({
  loader: loader,
  admin: adminSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
