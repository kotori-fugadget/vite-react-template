import { configureStore } from "@reduxjs/toolkit";
import { lpReducer } from "../lp/slices";

export const store = configureStore({
    reducer: {
        lp: lpReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;