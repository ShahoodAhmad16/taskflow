function Task({ id, title, completed, deleteTask, updateTask }) {
    return (
        <div className={`task-card ${completed ? "completed" : ""}`}>
            <h3>{title}</h3>

            <div className="task-details">
                <p>
                    Status: {completed ? "Completed" : "Not completed"}
                </p>

                <div className="task-actions">
                    <button
                        className="complete-btn"
                        onClick={() => updateTask(id, completed)}
                    >
                        {completed ? "Mark incomplete" : "Complete"}
                    </button>

                    <button
                        className="delete-btn"
                        onClick={() => deleteTask(id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Task;