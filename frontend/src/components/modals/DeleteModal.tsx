type Props = {
    onClose: () => void;
    onConfirm: () => void;
  };
  
  export default function DeleteModal({ onClose, onConfirm }: Props) {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h2>Delete Task</h2>
          <p>Are you sure you want to delete this task?</p>
          <div className="modal-buttons">
            <button className="button edit-btn" onClick={onConfirm}>
              Delete
            </button>
            <button className="button cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }