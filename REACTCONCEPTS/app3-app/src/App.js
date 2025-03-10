import { useState } from "react";
import "./styles.css";

function TaskInput({ addTask }) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (task.trim() !== "") {
      addTask(task);
      setTask("");
    }
  };

  return (
    <div className="task-input">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

function TaskList({ tasks, deleteTask }) {
  return (
    <ul className="task-list">
      {tasks.map((t, index) => (
        <li key={index} className="task-item">
          {t} <button onClick={() => deleteTask(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default function TodoList() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
}


