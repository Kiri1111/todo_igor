import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";

type StateType = Array<TodolistType>
const initialState: Array<TodolistType> = []
export const todolistsReducer = (state = initialState, action: AllActionsType): StateType => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {

            const newTodoList: TodolistType = {id: action.payload.newId, title: action.payload.title, filter: "all"}
            return [...state, newTodoList]

        }

        case 'CHANGE-TODOLIST-TITLE': {
            const todoListWithTitle = state.find(s => s.id === action.payload.idTodo)
            if (todoListWithTitle)
                todoListWithTitle.title = action.payload.correctTitle
            return [...state]
        }
        case 'CHANGE-FILTER': {
            const todolistWithFilter = state.find(s => s.id === action.payload.idTodo)
            if (todolistWithFilter)
                todolistWithFilter.filter = action.payload.correctFilter
            return [...state]
        }
        default:
            return state
    }
}
export type AllActionsType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeFilterACType

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistId}
    } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            newId: v1()
        }
    } as const
}

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (idTodo: string, correctTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            correctTitle,
            idTodo
        }
    } as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (correctFilter: FilterValuesType, idTodo: string) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            correctFilter,
            idTodo
        }
    } as const
}