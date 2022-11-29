import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";

type StateType = Array<TodolistType>

export const TodolistsReducer = (state: StateType, action: AllActionsType): StateType => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
            const newTodoListId = v1()
            const newTodoList: TodolistType = {id: newTodoListId, title: action.payload.title, filter: "all"}
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

type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
        }
    } as const
}

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (correctTitle: string, idTodo: string) => {
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