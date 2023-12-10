import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowUpRightFromSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import { Form } from "react-bootstrap";

import Link from 'next/link';
import { Task } from '../types/Task'

interface TaskItemProps {
    task: Task;
    handleCheckOneTask: (id: number) => void;
    handleDeleteOneTask: (id: number) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, handleCheckOneTask, handleDeleteOneTask }) => {
    const data = JSON.stringify(task);

    return (
        <form className="container my-2" key={ task.id }>
            <div className="row task-container">
                <input
                    type="checkbox"
                    className="form-check-input form-check col-1 px-0"
                    checked={ task.isChecked }
                    onChange={() => handleCheckOneTask(task.id)}
                />
                <div className="task-name-container col-lg-9 col-md-8 col-7">
                    <Form.Text className={`task-name ${task.isChecked ? "checked" : ""}`}>
                        { task.name }
                    </Form.Text>
                </div>
                <div className={"task-buttons col-2 container column-gap-3 m-0"}>
                    <Link href={{ pathname: '/todos/TaskPage', query: { data: encodeURIComponent(data) } }}>
                        <FontAwesomeIcon
                            className="new-page-icon col"
                            icon={ faArrowUpRightFromSquare }
                        />
                    </Link>
                    <FontAwesomeIcon
                        type="button"
                        className="delete-icon col"
                        icon={faTrash}
                        onClick={() => handleDeleteOneTask(task.id)}
                    />
                </div>
            </div>
        </form>
    );
};
