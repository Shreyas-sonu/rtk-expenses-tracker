import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/users/userSlice";

const store = configureStore({ reducer: { users: userReducer } });

export default store;
