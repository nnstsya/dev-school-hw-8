import { InputForTask } from '../components/InputForTask';
import { ButtonsForAllTasks } from '../components/ButtonsForAllTasks';
import { TaskItem } from '../components/TaskItem';

import { Container } from "react-bootstrap";
import React, {useEffect, useState} from "react";
import { Task } from '../types/Task'

const Main = () => {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [searchedTasks, setSearchedTasks] = useState<Task[]>([]);
    const [taskName, setTaskName] = useState<string>("");
    const [searchInputMode, toggleSearchMode] = useState<boolean>(false);
    const [searchIsNull, setSearchIsNull] = useState<boolean>(true);

    const currentTime = (): string => {
        return new Date().toLocaleString([], {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleKeyUp = (event: React.KeyboardEvent): void => {
        if(event.key === 'Enter' && taskName.trim() !== ''){
            setTasks([...tasks, {id: new Date().getTime(), name: taskName, isChecked: false, time: currentTime(), description: ""}]);
            setTaskName('');
        }
    }

    const handleSubmit = (): void => {
        if(taskName.trim() !== ''){
            setTasks([...tasks, {id: new Date().getTime(), name: taskName, isChecked: false, time: currentTime(), description: ""}]);
            setTaskName('');
        }
    }

    const handleCheckOneTask = (id: number): void => {
        const updatedTasks = tasks.map((task: Task): Task => {
            if (task.id === id) {
                return {...task, isChecked: !task.isChecked};
            }
            return task;
        })
        setTasks(updatedTasks);
    }

    const toggleCheckAllTasks = (check: boolean): void => {
        const updatedTasks = tasks.map((task: Task): Task => {
            return {...task, isChecked: check};
        })
        setTasks(updatedTasks);
    }

    const handleDeleteOneTask = (id: number): void => {
        const updatedTasks = tasks.filter((task) => task.id !== id)
        setTasks(updatedTasks);
    }

    const handleDeleteAllTask = (): void => {
        setTasks([]);
    }

    const searchTasks = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchedTasks(tasks.filter((task) => task.name.toLowerCase().includes(searchTerm)));
        setSearchIsNull(searchTerm.length === 0);
    };

    const changeSearchMode = (): void => {
        toggleSearchMode(!searchInputMode);
    }

    const tasksToRender = (searchInputMode && !searchIsNull) ? searchedTasks : tasks;

    const tasksTemplate = tasksToRender.map((task: Task) => {
        return <TaskItem task={ task } handleCheckOneTask={ handleCheckOneTask } handleDeleteOneTask={ handleDeleteOneTask }/>
    });

    return (
        <Container className={ "todo-list-container w-50 p-5" }>
            <h1 className={ "todo-list-heading" }>ToDo List</h1>
            <InputForTask taskName={ taskName }
                          handleKeyUp={ handleKeyUp }
                          handleSubmit={ handleSubmit }
                          setTaskName={ setTaskName }
                          changeSearchMode={ changeSearchMode }
                          searchInputMode={ searchInputMode }
                          searchTasks={ searchTasks }
            ></InputForTask>
            <ButtonsForAllTasks toggleCheckAllTasks={toggleCheckAllTasks} handleDeleteAllTask={handleDeleteAllTask}></ButtonsForAllTasks>
            { tasksTemplate }
        </Container>
    );
}

export default Main;