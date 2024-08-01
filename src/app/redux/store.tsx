import { configureStore } from "@reduxjs/toolkit";
import emailReducers from "./emailSlice";
import userReducers from "./userSlice";

export const store = configureStore({
    reducer: {
        emailData: emailReducers,
        userData: userReducers
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
