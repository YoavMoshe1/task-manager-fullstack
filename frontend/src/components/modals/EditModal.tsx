import { useState } from "react";
import type { Task } from "../../types/Task";

type Props = {
  task: Task;
  onClose: () => void;
  onSave: (title: string, description: string) => void;
};

export default function EditModal({ task, onClose, onSave }: Props) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Task</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="modal-input"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="modal-input"
        />

        <button
          className="button"
          onClick={() => {
            onSave(title, description);
            onClose();
          }}
        >
          Save
        </button>

        <button className="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}