import {RootState} from "../redux/store";

export const selectUsersState = (state:RootState) => state.allTodoReducer.allTodo;