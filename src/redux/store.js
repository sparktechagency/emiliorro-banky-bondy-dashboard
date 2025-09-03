import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feature/auth/authSlice";
import userReducer from "./feature/user/userSlice";
import { baseApi } from "./feature/baseApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

// Optional but recommended for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);