import React from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass, faPlus} from "@fortawesome/free-solid-svg-icons";

interface InputForTaskProps {
    taskName: string;
    handleKeyUp: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
    handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
    setTaskName: (taskName: string) => void;
    changeSearchMode: () => void;
    searchInputMode: boolean;
    searchTasks: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputForTask: React.FC<InputForTaskProps> = ({ taskName, handleKeyUp, handleSubmit, setTaskName, changeSearchMode, searchInputMode, searchTasks }) => {
    return (
        <div className={"container"}>
            <div className="row input-search mb-4">
                <div className={"col-md-11 col-10 p-0"}>
                    {searchInputMode ? (
                        <InputGroup className={"task-input"} onKeyUp={handleKeyUp}>
                            <Form.Control
                                placeholder={"Search tasks..."}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => searchTasks(event)}
                            />
                        </InputGroup>
                    ) : (
                        <InputGroup className={"task-input"} onKeyUp={handleKeyUp}>
                            <Form.Control
                                placeholder={"Enter new task..."}
                                value={ taskName }
                                onChange={(event) => setTaskName(event.target.value)}
                            />
                            <Button className={"btn btn-primary"} onClick={handleSubmit}>
                                Done
                            </Button>
                        </InputGroup>
                    )}
                </div>
                <div className={"col-1 p-md-0 px-1 input-icon"}>
                    { searchInputMode ? <FontAwesomeIcon icon={faPlus} className={"search-todos-icon"} onClick={changeSearchMode}/>
                        : <FontAwesomeIcon icon={faMagnifyingGlass} className={"search-todos-icon"} onClick={changeSearchMode}/> }
                </div>
            </div>
        </div>
    );
};
