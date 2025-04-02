import {FC, useState} from "react";
import {Task} from "../../types/Types";
import {useDispatch} from "react-redux";
import styles from '../main/main.module.css'
import {usersActions} from "../../redux/reducers/AllTodo_reducer";

interface MainProps {
    allTodo: Task[]
}

const generateId = (todos: Task[]): number => {
    let maxId = 0;

    todos.forEach(todo => {
        if (todo.id >= maxId) {
            maxId = todo.id
        }
    })

    return maxId + 1;
}

const Main: FC<MainProps> = (props) => {
    const dispatch = useDispatch()
    const [selectedTodoStatus, setSelectedTodoStatus] = useState<string>('all')


    const todoElements = props.allTodo
        .filter((todo) => selectedTodoStatus === 'all'
            || (selectedTodoStatus === 'completed' && todo.isCompleted)
            || (selectedTodoStatus === 'active' && !todo.isCompleted))
        .map((task: Task) => {
            return (
                <div>
                    <form>
                        <input id={task.id.toString()} checked={task.isCompleted} type="checkbox" onChange={(e) => {
                            dispatch(usersActions.editTask({id: task.id, isCompleted: e.target.checked}))

                        }}/>
                        <label htmlFor={task.id.toString()}
                               className={task.isCompleted ? styles.red : styles.blue}> {task.name}</label>
                    </form>
                </div>)
        })

    const totalActive = props.allTodo.filter(todo => !todo.isCompleted).length


    return (
        <div className={styles.wrapper}>
            TODOS
            <input placeholder='What needs to be done?' onKeyPress={(e) => {

                if (e.key === 'Enter') {
                    dispatch(usersActions.addTodo({
                        id: generateId(props.allTodo),
                        name: e.currentTarget.value,
                        isCompleted: false
                    }))

                    e.currentTarget.value = ""
                }
            }}/>
            {todoElements}
            <div>
                {totalActive} items left
                <div>
                    <button type='button' onClick={() => setSelectedTodoStatus('all')}>all</button>
                    <button type='button' onClick={() => setSelectedTodoStatus('active')}>active</button>
                    <button type='button' onClick={() => setSelectedTodoStatus('completed')}>completed</button>
                    <button type='button' onClick={() => {
                        dispatch(usersActions.deleteTasks(props.allTodo))
                    }}>clear completed
                    </button>
                </div>
            </div>
        </div>
    )
}


export default Main;