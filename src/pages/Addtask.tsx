import React, { useState } from "react";
import { addTask } from "../services/TaskService";
import { WcsButton, WcsInput } from "wcs-react";
import { useNavigate } from "react-router-dom";
import './addTask.css';

const AddTaskComponent: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const navigate = useNavigate();

    const handleAddTask = async (title: string) => {
        console.log(title);
    if (typeof title === "string" && title.trim() !== "") {
      await addTask(title);
        setTitle("");
        navigate('/');
    }
  };

  return (
    <div className="add">
      <WcsButton class="wcs-light back" onClick={() => navigate("/")}>
        Retour
      </WcsButton>
      <h2>Veuillez saisir une tâche</h2>
      <WcsInput
        type="text"
        id="input-add"
        value={typeof title === "string" ? title : ""}
        placeholder="Enter task title"
        onWcsChange={(e) => setTitle(e.target.value as string)}
      />
      <WcsButton className="back" onClick={() => handleAddTask(title)}>
        Add Task
      </WcsButton>
    </div>
  );
};

export default AddTaskComponent;
