import {createSlice} from '@reduxjs/toolkit';
import {InitialState, Task} from "../../types/Types";

const initialState: InitialState = {
    allTodo: [{name: 'test', readinessStatus: false},
        {name:'test2',readinessStatus:true}],
};


export const usersSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {}


});

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;