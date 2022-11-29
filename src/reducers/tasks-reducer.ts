import React from "react";
import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {TasksStateType} from "../App";

export const tasksReducer = (state: TasksStateType, action: TsarType) => {
    switch (action.type) {
        case'REMOVE-TASK': {
            //  let filteredTasks = tasks.filter(t => t.id != id);
            return state
        }
        // case 'ADD-TASK': {
        //     let task = {id: v1(), title: action.payload.title, isDone: false};
        //     return [task, ...state]
        //  }
        // case "CHANGE-TASK-STATUS":{
        //     let list=state.find(el=>el.id===action.payload.todolistId)
        //   let task=
        // }
        default:
            return state
    }
}

type TsarType = RemoveTaskACType | addTaskACType | changeTaskStatusACType

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistTasks: Array<TaskType>) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id,
            todolistTasks
        }
    } as const
}

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title
        }
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, todolistId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskId,
            todolistId,
            isDone
        }
    } as const
}


