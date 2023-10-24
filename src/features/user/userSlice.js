import { createSlice } from "@reduxjs/toolkit";
import { currentUser, comments } from "../../data/data.json";

const initialState = {
    isLoading: true,
    currentUser,
    comments,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
});

export default userSlice.reducer;
