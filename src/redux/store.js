import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./feature/baseApi";
import { authSliceReducer } from "./feature/auth/authSlice";
import { skillSliceReducer } from "./feature/skill/skillSlice";

export const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        skill: skillSliceReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

// Optional but recommended for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);