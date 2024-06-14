import React, { useEffect, useState } from "react";
import { Task } from "../models/task";
import {
  changeState,
  changeTitle,
  deleteTask,
  fetchTasks,
  sortByBoolean,
} from "../services/TaskService";
import { WcsButton, WcsMatIcon } from "wcs-react";
import Cards from "../components/Cards";
import { useNavigate } from "react-router-dom";
import SelectFilter from "../components/SelectFilter";
import './home.css';

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [, setError] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>("1");
  const [tasksToDisplay, setTasksToDisplay] = useState<Task[]>([]);
  const [, setFiltered] = useState<boolean>(false);
  const navigate = useNavigate();

  const goToAddTask = () => {
    navigate("/add-task");
  };

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data: Task[] = await fetchTasks();
        const tasksWithEditingFlag = data.map((task: Task) => ({
          ...task,
          isEditing: false,
        }));
        sortByBoolean(tasksWithEditingFlag);
        setTasks(tasksWithEditingFlag);
        applyFilter(tasksWithEditingFlag, selectedValue);
      } catch (err) {
        setError("Failed to fetch tasks");
        console.error(err);
      }
    };

    getTasks();
  }, [selectedValue]);

  const onDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      applyFilter(updatedTasks, selectedValue);
    } catch (err) {
      setError("Failed to delete task");
      console.error(err);
    }
  };

  const onChangingState = async (id: number) => {
    try {
      await changeState(id);
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      );
      sortByBoolean(updatedTasks);
      setTasks(updatedTasks);
      applyFilter(updatedTasks, selectedValue);
    } catch (err) {
      setError("Failed to update");
      console.error(err);
    }
  };

  const onChangingTitle = async (id: number, newTitle: string) => {
    try {
      await changeTitle(id, newTitle);
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle, isEditing: false } : task
      );
      setTasks(updatedTasks);
      applyFilter(updatedTasks, selectedValue);
    } catch (err) {
      setError("Failed to update");
      console.error(err);
    }
  };

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    applyFilter(tasks, value);
  };

  const applyFilter = (tasks: Task[], filter: string) => {
    let updatedTasksToDisplay = [...tasks];

    if (filter === "1") {
      setFiltered(false);
    } else if (filter === "2") {
      setFiltered(true);
      updatedTasksToDisplay = tasks.filter((task) => !task.done);
    } else if (filter === "3") {
      setFiltered(true);
      updatedTasksToDisplay = tasks.filter((task) => task.done);
    }

    setTasksToDisplay(updatedTasksToDisplay);
  };

  return (
    <div className="home">
      <WcsButton className="wcs-primary btn-add" onClick={goToAddTask}>
        <WcsMatIcon
          size="s"
          icon="add_task"
          family="filled"
        ></WcsMatIcon>
        <span className="btn-name">Ajouter une tâche</span>
        
      </WcsButton>
      <h2>Voici vos tâches :</h2>
      <SelectFilter
        onSelectChange={handleSelectChange}
        selectedValue={selectedValue}
      />
      <div className="flex">
        {tasksToDisplay.length > 0 ? (
          tasksToDisplay.map((task) => (
            <div className="card-container" key={task.id}>
              <Cards
                key={task.id}
                task={task}
                onDeleteTask={onDeleteTask}
                onChangingState={onChangingState}
                onChangingTitle={onChangingTitle}
              />
            </div>
          ))
        ) : (
          <div className="no-task">Vous n'avez pas encore de tâche prévue.</div>
        )}
      </div>
    </div>
  );
};

export default Home;
