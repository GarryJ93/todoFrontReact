import React, { useEffect, useState } from "react";
import { Task } from "../models/task";
import {
  changeState,
  changeTitle,
  deleteTask,
  fetchTasks,
} from "../services/TaskService";
import { WcsButton } from "wcs-react";
import Cards from "../components/Cards";
import { useNavigate } from "react-router-dom";
import SelectFilter from "../components/SelectFilter";

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
    <div>
      <WcsButton className="wcs-primary" shape="round" onClick={goToAddTask}>
        Ajouter une tâche
      </WcsButton>
      <h2>Voici vos tâches :</h2>
      <SelectFilter
        onSelectChange={handleSelectChange}
        selectedValue={selectedValue}
      />
      {tasksToDisplay.length > 0 ? (
        tasksToDisplay.map((task) => (
          <Cards
            key={task.id}
            task={task}
            onDeleteTask={onDeleteTask}
            onChangingState={onChangingState}
            onChangingTitle={onChangingTitle}
          />
        ))
      ) : (
        <div>Vous n'avez pas encore de tâche prévue.</div>
      )}
    </div>
  );
};

export default Home;
