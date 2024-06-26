import axios from 'axios'
import { Task } from '../models/task';




export const sortByBoolean = (taskArray: Task[]) : Task[] =>{
    taskArray = taskArray.sort(function (a, b) {
      return a.done > b.done ? 0 : a ? -1 : 0;
    });
    return taskArray
  }

export const fetchTasks = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/task');
    return response.data;
  } catch (err) {
    console.error('Error fetching tasks:', err);
    throw err;
  }
};

export const addTask = async (title: string): Promise<void> => {
  console.log("service" + title)
  try {
    const response = await axios.post('http://localhost:8080/api/task', { title: title }, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(response.data);
  } catch (error) {
    console.error('There was an error adding the task!', error);
  }
};
export const deleteTask = async (id: number) => {
    try {
      const response = await axios.delete("http://localhost:8080/api/task/" + id);
      return response.data;
    } catch (err) {
      console.error("Error deleting:", err);
      throw err;
    }
};
  
export const changeState = async (id: number) => {
  try {
    const response = await axios.patch("http://localhost:8080/api/task/" + id);
    return response.data;
  } catch (err) {
    console.error("Error changing state:", err);
    throw err;
  }
};

export const changeTitle = async (id: number, title: string) => {
  try {
    const response = await axios.patch(`http://localhost:8080/api/title/${id}`, {
      title: title,
    });
    return response.data;
  } catch (err) {
    console.error("Error changing title:", err);
    throw err;
  }
};
