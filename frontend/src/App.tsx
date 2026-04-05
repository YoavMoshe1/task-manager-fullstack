import { useState, useEffect} from "react";
import "./App.css";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [search, setSearch] = useState("");

  // פונקציה שמשנה את הסטייט
  const toggleTask = (id: number) => {
    const updatedTasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    setTasks(updatedTasks); // מעדכן את ה־state
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
  
    try {
      const res = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTask }),
      });
  
      const data = await res.json();
  
      setTasks(prev => [...prev, data]); // מוסיף לרשימה
      setNewTask(""); // מנקה את השדה
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


  return (
    <div className="container">
      {/* Title */}
      <h1 className="title">
        Task Command Center
      </h1>
  
      {/* 🔥 Top Bar */}
      <div className="top-bar">
  
        {/* צד שמאל - Add */}
        <div className="left">
          <input
            type="text"
            placeholder="Add new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newTask.trim()) addTask();
            }}
            className="input"
          />
  
          <button onClick={addTask} className="button">
            Add
          </button>
        </div>
  
        {/* צד ימין - Search */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input search-input"
        />
  
      </div>
  
      {/* 🔄 Loading */}
      {isLoading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>Loading...</h2>
        </div>
      ) : (
  
        <div className="task-grid">
          {tasks
            .filter(task =>
              task.title.toLowerCase().includes(search.toLowerCase())
            )
            .map(task => (
              <div
                key={task.id}
                className="task-card"
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-8px) scale(1.02)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0px) scale(1)"}
              >
  
                {/* ✏️ Title / Edit */}
                {editingId === task.id ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        updateTaskTitle(task.id, editText);
                        setEditingId(null);
                      }
                    }}
                    autoFocus
                    className="edit-input"
                  />
                ) : (
                  <h3 className={`task-title ${task.completed ? "completed-title completed-animate" : ""}`}>
                    {task.title}
                  </h3>
                )}
  
                {/* ✅ Status */}
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
  
                {/* 🔘 Buttons */}
                <div className="actions">
  
                  <button
                    className="button edit-btn"
                    onClick={() => {
                      setEditingId(task.id);
                      setEditText(task.title);
                    }}
                  >
                    Edit
                  </button>
  
                  <button
                    className="button delete-btn"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
  
                </div>
  
              </div>
            ))}
        </div>
      )}
    </div>
  )};

export default App;