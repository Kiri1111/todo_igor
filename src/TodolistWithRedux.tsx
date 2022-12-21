import React, {ChangeEvent, memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksStateType} from "./AppWithRedux";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {Task} from "./Task";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const TodolistWithRedux = React.memo((props: PropsType) => {
    console.log('todo')
    let tasks = useSelector<AppRootStateType, Array<TaskType>>((st) => st.tasks[props.id])

    if (props.filter === "active") {
        tasks = tasks.filter(t => t.isDone);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }
    const dispatch = useDispatch()

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.id));
    }, [props.id, dispatch])

    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistAC(props.id));
    }, [])

    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(props.id, title));
    }, [])

    const onAllClickHandler = () => dispatch(changeFilterAC("all", props.id));
    const onActiveClickHandler = () => dispatch(changeFilterAC("active", props.id));
    const onCompletedClickHandler = () => dispatch(changeFilterAC("completed", props.id));
    const onClickHandler = (taskId: string) => dispatch(removeTaskAC(taskId, props.id))

    const onChangeHandler = (taskId: string, newIsDone: boolean) => {
        dispatch(changeTaskStatusAC(taskId, props.id, newIsDone));
    }

    const onTitleChangeHandler = (taskId: string, newValue: string) => {
        dispatch(changeTaskTitleAC(taskId, newValue, props.id));
    }
    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map((t: TaskType) => {
                    // const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id))
                    //
                    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    //     let newIsDoneValue = e.currentTarget.checked;
                    //     dispatch(changeTaskStatusAC(t.id, props.id, newIsDoneValue));
                    // }
                    //
                    // const onTitleChangeHandler = (newValue: string) => {
                    //     dispatch(changeTaskTitleAC(t.id, newValue, props.id));
                    // }
                    return <Task task={t} removeTask={onClickHandler} ChangeTaskStatus={onChangeHandler}
                                 changeTaskTitle={onTitleChangeHandler}/>

                    // return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                    //     <Checkbox
                    //         checked={         t.isDone}
                    //         color="primary"
                    //         onChange={onChangeHandler}
                    //     />
                    //
                    //     <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                    //     <IconButton onClick={onClickHandler}>
                    //         <Delete/>
                    //     </IconButton>
                    // </div>
                })
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


