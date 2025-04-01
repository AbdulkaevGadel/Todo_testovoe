export type Task = {
    name: string| null,
    readinessStatus:boolean,
}

export interface InitialState {
    allTodo: Task[],
}