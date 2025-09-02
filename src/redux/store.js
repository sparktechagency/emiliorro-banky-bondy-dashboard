import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feature/auth/authSlice";
import userReducer from "./feature/user/userSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userReducer,
    },
});