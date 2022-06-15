import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    isLoggedIn: false
}

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        login: (state, action) => {
            state.username = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.username = initialState.username;
            state.isLoggedIn = initialState.isLoggedIn;
        }
    }
});

export const { login, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
