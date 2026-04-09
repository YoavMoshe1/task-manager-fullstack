import { useState } from "react";

type Props = {
  onClose: () => void;
  onAdd: (title: string, description: string) => void;
};

export default function AddModal({ onClose, onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Add Task</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="modal-input"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="modal-input"
        />

        <button
          className="button"
          onClick={() => {
            onAdd(title, description);
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