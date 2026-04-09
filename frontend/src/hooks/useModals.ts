import { useState } from "react";
import type { Task } from "../types/Task";

// Custom hook to manage modal states (Add + Edit)
export function useModals() {

  // Add modal state
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Edit modal state (holds selected task)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Open Add modal
  const openAdd = () => setIsAddOpen(true);

  // Close Add modal
  const closeAdd = () => setIsAddOpen(false);

  // Open Edit modal with selected task
  const openEdit = (task: Task) => setSelectedTask(task);

  // Close Edit modal
  const closeEdit = () => setSelectedTask(null);

  return {
    isAddOpen,
    selectedTask,
    openAdd,
    closeAdd,
    openEdit,
    closeEdit,
  };
}