import React, { useEffect, useState } from "react";
import { Task } from "./models/task";
import { changeState, deleteTask, fetchTasks } from "./services/TaskService";
import { WcsButton } from "wcs-react";
import Cards from "./Cards";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const goToAddTask = () => {
    navigate("/add-task");
  };

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        console.log(data);
        setTasks(data);
      } catch (err) {
        setError("Failed to fetch tasks");
        console.error(err);
      }
    };

    getTasks();
  }, []);

  const onDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    } catch (err) {
      setError("Failed to delete task");
      console.error(err);
    }
  };

  const onChangingState = async (id: number) => {
    try {
      await changeState(id);
    } catch (err) {
      setError("Failed to update");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Voici vos tâches :</h2>

      <>
        <WcsButton className="wcs-primary" shape="round" onClick={goToAddTask}>
          Ajouter une tâche
        </WcsButton>
      </>

      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Cards
            key={task.id}
            task={task}
            onDeleteTask={onDeleteTask}
            onChangingState={onChangingState}
          />
        ))
      ) : 
        <div>Vous n'avez pas encore de tâche prévue.</div>
      }
    </div>
  );
};

export default Home;
