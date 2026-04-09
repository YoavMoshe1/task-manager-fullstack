import type { Task } from "../types/Task";
import { formatDate } from "../utils/formatDate";

type Props = {
  task: Task;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
};

export default function TaskCard({ task, onToggle, onEdit, onDelete }: Props) {
  return (
    <div className="task-card">
      
      <h3 className={`task-title ${task.completed ? "completed-title completed-animate" : ""}`}>
        {task.title}
      </h3>

      <p className="task-desc">{task.description}</p>

      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="checkbox"
      />

      <p
        style={{
          color: task.completed ? "#00ffcc" : "#ff5f5f",
          marginBottom: "15px",
        }}
      >
        {task.completed ? "Completed ✔" : "Pending ✖"}
      </p>

      <div className="actions">
        <button
          className="button edit-btn"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          className="button delete-btn"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>

      {/* 🔥 התאריך עכשיו בתוך הכרטיס */}
      <p className="task-date">
        Created: {formatDate(task.createdAt)}
      </p>

    </div>
  );
}