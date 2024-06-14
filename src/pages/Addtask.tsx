import React, { useState } from "react";
import { addTask } from "../services/TaskService";
import { WcsButton, WcsInput } from "wcs-react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <WcsInput
        type="text"
        value={typeof title === "string" ? title : ""}
        placeholder="Enter task title"
        onWcsChange={(e) => setTitle(e.target.value as string)}
      />
      <WcsButton onClick={() => handleAddTask(title)}>Add Task</WcsButton>
    </div>
  );
};

export default AddTaskComponent;
