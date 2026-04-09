import { useState } from "react";
import "./App.css";

// UI Components
import TaskList from "./components/TaskList";
import TopBar from "./components/TopBar";
import AddModal from "./components/modals/AddModal";
import EditModal from "./components/modals/EditModal";
import DeleteModal from "./components/modals/DeleteModal";
import PageHeader from "./components/PageHeader";

// Custom Hooks (logic separation)
import { useTasks } from "./hooks/useTasks";
import { useFilteredTasks } from "./hooks/useFilteredTasks";
import { useModals } from "./hooks/useModals";

// Constants (centralized UI text)
import { LOADING } from "./constants/texts";

function App() {
  // Main data and actions (CRUD + loading state)
  const {
    tasks,
    isLoading,
    toggleTask,
    addTask,
    deleteTask,
    updateTask,
  } = useTasks();

  // Modal state management (Add + Edit + Delete)
  const {
    isAddOpen,
    selectedTask,
    deleteTaskId,
    openAdd,
    closeAdd,
    openEdit,
    closeEdit,
    openDelete,
    closeDelete,
  } = useModals();

  // Controlled input for search
  const [search, setSearch] = useState("");

  // Apply filtering logic via custom hook
  const filteredTasks = useFilteredTasks(tasks, search);

  return (
    <div className="container">

      {/* Page title component */}
      <PageHeader />

      {/* Top controls: Add button + Search input */}
      <TopBar
        onAddClick={openAdd}
        search={search}
        setSearch={setSearch}
      />

      {/* Conditional rendering: loading vs task list */}
      {isLoading ? (
        <h2>{LOADING}</h2>
      ) : (
        <TaskList
          tasks={filteredTasks}     // already filtered data
          onToggle={toggleTask}     // toggle completed state
          onEdit={openEdit}         // open edit modal
          onDelete={openDelete}     // 🔥 open delete modal instead of direct delete
        />
      )}

      {/* Add Task modal */}
      {isAddOpen && (
        <AddModal
          onClose={closeAdd}
          onAdd={(title, desc) => addTask(title, desc)}
        />
      )}

      {/* Edit Task modal */}
      {selectedTask && (
        <EditModal
          task={selectedTask}
          onClose={closeEdit}
          onSave={(title, desc) =>
            updateTask(selectedTask.id, title, desc)
          }
        />
      )}

      {/* 🔥 Delete Task modal */}
      {deleteTaskId && (
        <DeleteModal
          onClose={closeDelete}
          onConfirm={() => {
            deleteTask(deleteTaskId);
            closeDelete();
          }}
        />
      )}
    </div>
  );
}

export default App;