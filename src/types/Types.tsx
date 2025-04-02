export type Task = {
    id: number;
    name: string,
    isCompleted:boolean,
}

export interface InitialState {
    allTodo: Task[],
}