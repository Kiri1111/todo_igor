import React, {ChangeEvent} from 'react';
import {TaskType} from "./TodolistWithRedux";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";

type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    ChangeTaskStatus: (taskId: string, newIsDone: boolean) => void
    changeTaskTitle: (taskId: string, newValue: string) => void
}
export const Task = (props: TaskPropsType) => {
    const removeTask = () => {
        props.removeTask(props.task.id)
    }
    const ChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.ChangeTaskStatus(props.task.id, e.currentTarget.checked)
    }
    const changeTaskTitle = (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue)
    }
    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.task.isDone}
            color="primary"
            onChange={ChangeTaskStatus}
        />

        <EditableSpan value={props.task.title} onChange={changeTaskTitle}/>
        <IconButton onClick={removeTask}>
            <Delete/>
        </IconButton>
    </div>
};

