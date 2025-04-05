import React from 'react';
import './App.css';
import Main from "./components/main/Main";
import {useSelector} from "react-redux";
import {selectUsersState} from "./selectors/selectors";
import {Task} from "./types/Types";


function App() {

    const allTodo: Task[] = useSelector(selectUsersState)

    return (
        <div>
            <Main allTodo={allTodo}/>
        </div>
    );
}

export default App;
