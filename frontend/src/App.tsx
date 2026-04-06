import { useState, useEffect} from "react";
import "./App.css";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  description: string;
  createdAt: string;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [newTask, setNewTask] = useState("");
  const [editText, setEditText] = useState("");
  const [search, setSearch] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  
  // פונקציה שמשנה את הסטייט
  const toggleTask = (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
  
    const updatedCompleted = !task.completed;
  
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: updatedCompleted,
      }),
    });
  
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: updatedCompleted } : t
      )
    );
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
  
    try {
      const res = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTask,
          description: newDescription.trim() || "No description",
        })
      });
  
      const data = await res.json();
  
      setTasks(prev => [...prev, data]); // מוסיף לרשימה
      setNewTask(""); // מנקה את השדה
      setNewDescription(""); // מנקה את השדה
    } catch (error) {
        console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });
  
      // מעדכן את ה־state (מוחק מהמסך)
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTaskTitle = async (id: number, newTitle: string) => {
    if (!newTitle.trim()) return;
  
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle }),
      });
  
      // עדכון ה־UI
      setTasks(prev =>
        prev.map(task =>
          task.id === id ? { ...task, title: newTitle } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
  
          const res = await fetch("http://localhost:3000/tasks");
          const data = await res.json();
  
        setTasks(data);
      } catch (error) {
          console.error("Error fetching tasks:", error);
      } finally {
          setTimeout(() => setIsLoading(false), 500);
      }
    };
  
    fetchTasks();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
  
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };


  return (
    <div className="container">
      <h1 className="title">Task Command Center</h1>
  
      <div className="top-bar">
        <div className="left">
          <button onClick={() => setIsAddOpen(true)} className="button">
            Add
          </button>
        </div>
  
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input search-input"
        />
      </div>
  
      {isLoading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>Loading...</h2>
        </div>
      ) : (
        <>
          <div className="task-grid">
            {tasks
              .filter(task =>
                task.title.toLowerCase().includes(search.toLowerCase()) ||
                task.description.toLowerCase().includes(search.toLowerCase())
              )
              .sort((a, b) => Number(a.completed) - Number(b.completed))
              .map(task => (
                <div key={task.id} className="task-card">
                  <h3 className={`task-title ${task.completed ? "completed-title completed-animate" : ""}`}>
                    {task.title}
                  </h3>
  
                  <p className="task-desc">
                    {task.description || "No description"}
                  </p>
  
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="checkbox"
                  />
  
                  <p style={{
                    color: task.completed ? "#00ffcc" : "#ff5f5f",
                    marginBottom: "15px"
                  }}>
                    {task.completed ? "Completed ✔" : "Pending ✖"}
                  </p>
  
                  <div className="actions">
                    <button
                      className="button edit-btn"
                      onClick={() => {
                        setSelectedTask(task);
                        setEditText(task.title);
                        setEditDescription(task.description);
                        setIsModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
  
                    <button
                      className="button delete-btn"
                      onClick={() => {
                        setTaskToDelete(task.id);
                        setIsDeleteOpen(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
  
                  <p className="task-date">
                    Created: {formatDate(task.createdAt)}
                  </p>
                </div>
              ))}
          </div>
  
          {/* ✏️ EDIT MODAL */}
          {isModalOpen && selectedTask && (
            <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">Edit Task</h2>
  
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="modal-input"
                />
  
                <input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="modal-input"
                />
  
                <div className="modal-buttons">
                  <button
                    className="button save-btn"
                    onClick={() => {
                      fetch(`http://localhost:3000/tasks/${selectedTask.id}`, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          title: editText,
                          description: editDescription,
                        }),
                      });
  
                      setTasks(prev =>
                        prev.map(t =>
                          t.id === selectedTask.id
                            ? { ...t, title: editText, description: editDescription }
                            : t
                        )
                      );
  
                      setIsModalOpen(false);
                    }}
                  >
                    Save
                  </button>
  
                  <button
                    className="button cancel-btn"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
  
          {/* ➕ ADD MODAL */}
          {isAddOpen && (
            <div className="modal-overlay" onClick={() => setIsAddOpen(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">Add Task</h2>
  
                <input
                  type="text"
                  placeholder="Task title..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="modal-input"
                />
  
                <input
                  type="text"
                  placeholder="Task description..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="modal-input"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addTask();
                      setIsAddOpen(false);
                    }
                  }}
                />
  
                <div className="modal-buttons">
                  <button
                    className="button save-btn"
                    onClick={() => {
                      addTask();
                      setIsAddOpen(false);
                    }}
                  >
                    Save
                  </button>
  
                  <button
                    className="button cancel-btn"
                    onClick={() => setIsAddOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
  
          {/* ❌ DELETE MODAL */}
          {isDeleteOpen && (
            <div className="modal-overlay" onClick={() => setIsDeleteOpen(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">Delete Task</h2>
  
                <p style={{ marginBottom: "20px" }}>
                  Are you sure you want to delete this task?
                </p>
  
                <div className="modal-buttons">
                  <button
                    className="button save-btn"
                    onClick={() => {
                      if (taskToDelete !== null) {
                        deleteTask(taskToDelete);
                      }
                      setIsDeleteOpen(false);
                      setTaskToDelete(null);
                    }}
                  >
                    Yes
                  </button>
  
                  <button
                    className="button cancel-btn"
                    onClick={() => {
                      setIsDeleteOpen(false);
                      setTaskToDelete(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
  
        </>
      )}
    </div>
  )};

export default App;