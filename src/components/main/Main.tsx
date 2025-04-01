import {FC} from "react";
import {InitialState, Task} from "../../types/Types";
import {useSelector} from "react-redux";
import styles from '../main/main.module.css'

interface MainProps {
    allTodo: Task[]
}


const Main: FC<MainProps> = (props) => {

    const todoElements = props.allTodo.map((task: Task) => {
        return (
            <div>
                {task.readinessStatus && <div className={styles.red}> {task.name}</div>}
                {task.readinessStatus || <div className={styles.blue}>{task.name}</div>}
            </div>)
    })

    const unfulfilledTodoFilter = props.allTodo.filter((task: Task) => {
        if(task.readinessStatus)
        return task
    })

   const total:number = unfulfilledTodoFilter.length

    // console.log(unfulfilledTodo)

    // const unfulfilledTodo = props.allTodo.map((task:Task) =>{
    //     return (
    //         <div>
    //             {unfulfilledTodoFilter.length} items left
    //         </div>
    //     )
    // })



    return (
        <div>
            <form>
                <input/>
                {todoElements}
                <div>
                    {total} items left
                <div>
                    <button></button>
                    <button></button>
                    <button></button>
                    <button></button>
                </div>
                </div>
            </form>
        </div>
    )
}


export default Main;