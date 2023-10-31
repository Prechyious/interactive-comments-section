import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";

// Load initial state from local storage (if available)
const loadState = () => {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch {
        // Ignore write errors
    }
};

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    preloadedState: loadState(),
});

// Subscribe to store updates to save state to local storage
store.subscribe(() => {
    saveState(store.getState());
});
