import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import taskReducer from "./taskSlice";
import layoutReducer from "./layoutSlice.js";
// Save state to localStorage
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (error) {
    console.error("Could not save state", error);
  }
};

// Load state from localStorage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Could not load state", error);
    return undefined;
  }
};

const preloadedState = loadStateFromLocalStorage();

const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    tasks: taskReducer,
  },
  preloadedState,
});

// Subscribe to store updates
store.subscribe(() => {
  saveStateToLocalStorage({
    auth: store.getState().auth,
    tasks: store.getState().tasks,
  });
});

export default store;
