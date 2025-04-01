import { combineReducers, configureStore } from "@reduxjs/toolkit";
import allTodoReducer from "./reducers/AllTodo_reducer";

let reducers = combineReducers({
    allTodoReducer
});

let store = configureStore({ reducer: reducers });

// window.store = store;


export type RootState = ReturnType<typeof store.getState>;
export default store;
