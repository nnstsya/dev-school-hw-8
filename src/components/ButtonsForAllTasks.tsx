import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

interface ButtonsForAllTasksProps {
    toggleCheckAllTasks: (checked: boolean) => void;
    handleDeleteAllTask: () => void
}

export const ButtonsForAllTasks: React.FC<ButtonsForAllTasksProps> = ({ toggleCheckAllTasks, handleDeleteAllTask }) => {
    return (
        <Container className={ "select-all-container mb-2" }>
            <Button
                className={ "btn btn-secondary btn-sm check-all-tasks-button" }
                onClick={ () => toggleCheckAllTasks(true) }
            >
                Check all
            </Button>
            <Button
                className={ "btn btn-secondary btn-sm uncheck-all-tasks-button" }
                onClick={ () => toggleCheckAllTasks(false) }
            >
                Uncheck all
            </Button>
            <Button className={ "btn btn-danger btn-sm" } onClick={ handleDeleteAllTask }>
                Delete all
            </Button>
        </Container>
    );
};