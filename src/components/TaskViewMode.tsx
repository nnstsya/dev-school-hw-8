import React from "react";
import Button from "react-bootstrap/Button";
import { Task } from "@/types/Task";

interface TaskViewMode {
    task: Task;
    taskDescription: string;
    setEditMode: (value: boolean) => void;
}

export const TaskViewMode: React.FC<TaskViewMode> = ({ task, taskDescription, setEditMode }) => {
    return (
        <>
            <div className={"row task-info mt-4"}>
                <p><b>Added:</b> { task.time }</p>
                <p><b>Description:</b> {taskDescription}</p>
            </div>
            <div className={"row"}>
                <Button className={"btn btn-primary"} onClick={() => setEditMode(true)}>Edit</Button>
            </div>
        </>
    );
};
