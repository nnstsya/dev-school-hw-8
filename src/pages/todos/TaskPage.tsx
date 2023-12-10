import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/App.sass';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Task } from '../../types/Task'
import { Container } from "react-bootstrap";
import {TaskViewMode} from "@/components/TaskViewMode";
import {TaskEditMode} from "@/components/TaskEditMode";
import {TaskHeader} from "@/components/TaskHeader";

const TaskPage = () => {
    const router = useRouter();
    const receivedData = router.query.data;

    const [task, setTask] = useState<Task|null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [taskDescription, setTaskDescription] = useState<string>("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (typeof receivedData === 'string' && receivedData) {
                setTask(JSON.parse(decodeURIComponent(receivedData)));
            }
        }, 500);
        return () => clearTimeout(timeout);
    }, [receivedData]);

    const handleSave = (): void => {
        setTask({id: task!.id, name: task!.name, isChecked: task!.isChecked, time: task!.time, description: taskDescription});
        setEditMode(false);
    }

    useEffect(() => {
        const description = localStorage.getItem(`description_${task?.id}`);
        if (description) {
            setTaskDescription(description);
        }
    }, [task]);

    useEffect(() => {
        if (task) {
            localStorage.setItem(`description_${task.id}`, taskDescription);
        }
    }, [taskDescription, task]);

    return (
        <Container className={ "todo-list-container w-50 p-5" }>
            {task && (
                <div className={"container"}>
                    <TaskHeader task={ task } />
                    {editMode ?
                        <>
                            <TaskEditMode taskDescription={ taskDescription } setTaskDescription={ setTaskDescription } handleSave={ handleSave } />
                        </>
                        :
                        <>
                            <TaskViewMode task={ task } taskDescription={ taskDescription } setEditMode={ setEditMode } />
                        </>
                    }
                </div>
            )}
        </Container>
    );
}

export default TaskPage;
