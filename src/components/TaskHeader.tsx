import React from "react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Task} from "@/types/Task";

export const TaskHeader = ({ task } : { task: Task }) => {
    return (
        <div className={"row header-container"}>
            <Link href={{pathname: '/Main'}} className={"col-1"}>
                <FontAwesomeIcon icon={faArrowLeft} className={"back-to-main-icon"}/>
            </Link>
            <h1 className={"col-10 todo-list-heading"}>{task.name}</h1>
        </div>
    );
};
