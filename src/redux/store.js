import { configureStore } from "@reduxjs/toolkit";
import { persistCombineReducers } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import authenticationReducer from "./authenticationSlice";
import channelDataReducer from "./channelDataSlice";

const persistConfig = {
    key: 'root',
    storage: storage,
};

const persistedReducer = persistCombineReducers(
    persistConfig, 
    {
        authentication: authenticationReducer,
        channelData: channelDataReducer
    }
); 

export const store = configureStore({
    reducer: persistedReducer
});