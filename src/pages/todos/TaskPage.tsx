import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/App.sass';
import React, { useEffect, useState } from "react";

import { Container } from "react-bootstrap";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Button from "react-bootstrap/Button";

import { Task } from '../../types/Task'

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
                    <div className={"row header-container"}>
                        <Link href={{pathname: '/Main'}} className={"col-1"}>
                            <FontAwesomeIcon icon={ faArrowLeft } className={"back-to-main-icon"}/>
                        </Link>
                        <h1 className={"col-10 todo-list-heading"}>{ task.name }</h1>
                    </div>
                    {editMode ?
                        <>
                            <div className={"row task-info mt-4 mb-3"}>
                                <label className={"mb-2"}><b>Description:</b></label>
                                <input type="text" value={ taskDescription } onChange={(e) => setTaskDescription(e.target.value)} />
                            </div>
                            <div className={"row"}>
                                <Button className={"btn btn-primary"} onClick={handleSave}>Save</Button>
                            </div>
                        </>
                        :
                        <>
                            <div className={"row task-info mt-4"}>
                                <p><b>Added:</b> {task.time}</p>
                                <p><b>Description:</b> { taskDescription }</p>
                            </div>
                            <div className={"row"}>
                                <Button className={"btn btn-primary"} onClick={() => setEditMode(true)}>Edit</Button>
                            </div>
                        </>
                    }
                </div>
            )}
        </Container>
    );
}

export default TaskPage;
