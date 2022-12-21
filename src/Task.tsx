import React from 'react';
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
    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.task.isDone}
            color="primary"
            onChange={() => {
                props.ChangeTaskStatus(props.task.id, true)
            }}
        />

        <EditableSpan value={props.task.title} onChange={() => {
            props.changeTaskTitle(props.task.id, '')
        }}/>
        <IconButton onClick={() => {
            props.removeTask(props.task.id)
        }}>
            <Delete/>
        </IconButton>
    </div>
};

