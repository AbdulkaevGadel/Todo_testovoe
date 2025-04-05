import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {InitialState, Task} from "../../types/Types";

const initialState: InitialState = {
    allTodo: [
        {id: 0, name: 'test', isCompleted: false,},
        {id: 1, name: 'test2', isCompleted: true,}
    ],
};


export const usersSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        editTask: (state, action: PayloadAction<{ id: Task['id'], isCompleted: Task['isCompleted'] }>) => {
            state.allTodo = state.allTodo.map(task => task.id === action.payload.id
                ? {...task, isCompleted: action.payload.isCompleted}
                : task
            )
        },
        addTodo: (state, action: PayloadAction<Task>) => {
            state.allTodo = [...state.allTodo, action.payload]
        },
        deleteTasks :(state) =>{
            state.allTodo = state.allTodo.filter(task => !task.isCompleted)
        },

    }
});

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;