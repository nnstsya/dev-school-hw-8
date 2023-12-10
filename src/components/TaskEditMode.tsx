import Button from "react-bootstrap/Button";
import React from "react";

interface TaskEditMode {
    taskDescription: string;
    setTaskDescription: (value: string) => void;
    handleSave: () => void;
}

export const TaskEditMode: React.FC<TaskEditMode> = ({ taskDescription, setTaskDescription, handleSave }) => {
    return (
        <>
            <div className={"row task-info mt-4 mb-3"}>
                <label className={"mb-2"}><b>Description:</b></label>
                <input type="text" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}/>
            </div>
            <div className={"row"}>
                <Button className={"btn btn-primary"} onClick={handleSave}>Save</Button>
            </div>
        </>
    );
};
