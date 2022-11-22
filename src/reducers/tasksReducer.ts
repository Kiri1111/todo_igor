import React from "react";
import {TaskType} from "../Todolist";
import {v1} from "uuid";

export const tasksReducer = (state: TaskType[], action: TsarType) => {
    switch (action.type) {
        case'REMOVE-TASK': {
            //  let filteredTasks = tasks.filter(t => t.id != id);
            return state.filter(el => el.id !== action.payload.id)
        }
        case 'ADD-TASK': {
            let task = {id: v1(), title: action.payload.title, isDone: false};

            return [task, ...state]
        }
        default:
            return state
    }
}

type TsarType = RemoveTaskACType | addTaskACACType
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>


export const removeTaskAC = (id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {id}
    } as const
}
export type addTaskACACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title
        }
    } as const
}