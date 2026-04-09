import TaskCard from "./TaskCard";
import type { Task } from "../types/Task";
import { EMPTY_STATE } from "../constants/texts";

// Props definition for TaskList component
type Props = {
  tasks: Task[];                         // array of tasks to display
  onToggle: (id: number) => void;        // toggle completed state
  onEdit: (task: Task) => void;          // open edit modal
  onDelete: (id: number) => void;        // delete task
};

export default function TaskList({
  tasks,
  onToggle,
  onEdit,
  onDelete,
}: Props) {

  // If no tasks exist (after filtering)
  if (tasks.length === 0) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        {EMPTY_STATE}
      </p>
    );
  }

  // Render list of tasks
  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}                  // unique key for React rendering
          task={task}                   // pass task data
          onToggle={onToggle}           // toggle handler
          onEdit={onEdit}               // edit handler
          onDelete={onDelete}           // delete handler
        />
      ))}
    </div>
  );
}