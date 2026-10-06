import "./App.css";
import { useEffect, useState } from "react";
import Task from "./Task";
function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/tasks/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load tasks");
        }

        return response.json();
      })
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load tasks. Please try again.");
        setLoading(false);
      });
  }, []);
  const addTask = () => {
    if (title.trim() === "") {
      return;
    }

    fetch("http://127.0.0.1:8000/api/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        completed: false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks([...tasks, data]);
        setTitle("");
      })
      .catch(() => {
        setError("Unable to add task. Please try again.");
      });
  };
  const deleteTask = (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch(() => {
        setError("Unable to delete task. Please try again.");
      });
  };
  const updateTask = (id, completed) => {
    fetch(`http://127.0.0.1:8000/api/tasks/${id}/update/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !completed,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            task.id === data.id ? data : task
          )
        );
      })
      .catch(() => {
        setError("Unable to update task. Please try again.");
      });
  };

  let filteredTasks = tasks;

  if (filter === "active") {
    filteredTasks = tasks.filter((task) => !task.completed);
  }

  if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }
  const completedTasks = tasks.filter((task) => task.completed).length;
  return (
    <div className="app-container">
      <div className="header">
        <h1>TaskFlow</h1>
        <p>Stay organized. Get things done.</p>
        <span>
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </span>
      </div>

      <div className="add-task">
        <input
          type="text"
          placeholder="Enter task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={addTask}
          disabled={title.trim() === ""}
        >
          Add Task
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <p className="summary">
        {completedTasks} of {tasks.length}{" "}
        {tasks.length === 1 ? "task" : "tasks"} completed
      </p>
      <div className="filters">
        <button
          className={filter === "all" ? "active-filter" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={filter === "active" ? "active-filter" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>

        <button
          className={filter === "completed" ? "active-filter" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      {loading ? (
        <div className="empty-state">
          <h2>Loading tasks...</h2>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">✓</div>
          <h2>No tasks yet</h2>
          <p>Add your first task to get started.</p>
        </div>
      ) : (
        filteredTasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            completed={task.completed}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))
      )}
    </div>
  );
}

export default App;