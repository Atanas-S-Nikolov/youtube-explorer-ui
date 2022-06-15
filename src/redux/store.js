import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authenticationSlice";
import channelDataReducer from "./channelDataSlice"

export const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        channelData: channelDataReducer
    }
});