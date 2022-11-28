import {v1} from "uuid";

type StateType = Array<{ id: string, title: string, filter: string }>

// type ActionType = {
//     type: string
//     idTodo: string
//     newTitle: string
//     correctTitle: string
//     correctFilter: string
// }


export const todoListReducer = (state: StateType, action: AllActionsType): StateType => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.idTodo)
        }
        case 'ADD-TODOLIST': {
            const newTodoListId = v1()
            const newTodoList = {id: newTodoListId, title: action.payload.newTitle, filter: 'all'}
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
export type AllActionsType = removeTodoListACType | addTodolistACType | changeTodolistTitleACType | changeFilterACType

type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (idTodo: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {idTodo}
    } as const
}
type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTitle
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
export const changeFilterAC = (correctFilter: string, idTodo: string) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            correctFilter,
            idTodo
        }
    } as const
}