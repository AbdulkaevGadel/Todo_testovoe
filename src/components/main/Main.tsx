import {FC, useState} from "react";
import {Task} from "../../types/Types";
import {useDispatch} from "react-redux";
import styles from '../main/main.module.css'
import {usersActions} from "../../redux/reducers/AllTodo_reducer";
import '../../index.css'

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
                <div className={styles.taskItem}>
                    <form>
                        <input id={task.id.toString()} checked={task.isCompleted} type="checkbox" onChange={(e) => {
                            dispatch(usersActions.editTask({id: task.id, isCompleted: e.target.checked}))

                        }}></input>
                        <label htmlFor={task.id.toString()}
                               className={task.isCompleted ? styles.red : styles.blue}> {task.name}</label>
                    </form>
                </div>)
        })

    const totalActive = props.allTodo.filter(todo => !todo.isCompleted).length


    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                TODOS
            </div>
            <div className={styles.todo_container}>
                <div>
                    <div className={styles.wrapper_input_border}>
                        <input className={styles.todoInput} placeholder='What needs to be done?' onKeyPress={(e) => {

                            if (e.key === 'Enter') {
                                dispatch(usersActions.addTodo({
                                    id: generateId(props.allTodo),
                                    name: e.currentTarget.value,
                                    isCompleted: false
                                }))

                                e.currentTarget.value = ""
                            }
                        }}/>
                    </div>
                    {todoElements}
                </div>
                <div className={styles.wrapper_footer}>
                    {totalActive} items left
                    <div className={styles.wrapper_button}>
                        <button className={`${styles.filter_btn} ${selectedTodoStatus === 'all' ? styles.active : ''}`}
                                type='button'
                                onClick={() => setSelectedTodoStatus('all')}>all
                        </button>
                        <button className={`${styles.filter_btn} ${selectedTodoStatus === 'active' ? styles.active : ''}`}
                                type='button' onClick={() => setSelectedTodoStatus('active')}>active
                        </button>
                        <button className={`${styles.filter_btn} ${selectedTodoStatus === 'completed' ? styles.active : ''}`}
                            type='button' onClick={() => setSelectedTodoStatus('completed')}>completed
                        </button>
                        <button className={styles.filter_btn} type='button' onClick={() => {
                            dispatch(usersActions.deleteTasks())
                        }}>clear completed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Main;