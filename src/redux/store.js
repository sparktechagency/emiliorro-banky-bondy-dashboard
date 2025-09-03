import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feature/auth/authSlice";
import { baseApi } from "./feature/baseApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

// Optional but recommended for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);