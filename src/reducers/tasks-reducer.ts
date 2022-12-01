import React from "react";
import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {TasksStateType} from "../App";
import {addTodolistACType} from "./todoLists-reducer";

export const tasksReducer = (state: TasksStateType, action: TsarType): TasksStateType => {
    switch (action.type) {
        case'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.idTodolist]: state[action.payload.idTodolist].filter(el => el.id !== action.payload.idTask)
            }
        }
        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.idTodolist]: [newTask, ...state[action.payload.idTodolist]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    isDone: action.payload.isDone
                } : el)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(el => el.id === action.payload.idTask ? {
                    ...el,
                    title: action.payload.newTitle
                } : el)
            }
        }
        case 'ADD-TODOLIST': {

            return {...state, [action.payload.newId]: []};
        }
        default:
            return state
    }
}

type TsarType = RemoveTaskACType | addTaskACType | changeTaskStatusACType | changeTaskTitleACType | addTodolistACType


// export const addTodolistAC = (title: string, newId: string) => {
//     return {
//         type: 'ADD-TODOLIST',
//         payload: {
//             title,
//             newId
//         }
//     } as const
// }

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (idTask: string, idTodolist: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            idTask,
            idTodolist
        }
    } as const
}

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, idTodolist: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            idTodolist
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
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (idTask: string, newTitle: string, todoListId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            idTask,
            newTitle,
            todoListId

        }
    } as const
}
