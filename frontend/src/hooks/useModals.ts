import { useState } from "react";
import type { Task } from "../types/Task";

export function useModals() {
  // Add modal
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Edit modal
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // 🔥 Delete modal
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);

  // Add handlers
  const openAdd = () => setIsAddOpen(true);
  const closeAdd = () => setIsAddOpen(false);

  // Edit handlers
  const openEdit = (task: Task) => setSelectedTask(task);
  const closeEdit = () => setSelectedTask(null);

  // 🔥 Delete handlers
  const openDelete = (id: number) => setDeleteTaskId(id);
  const closeDelete = () => setDeleteTaskId(null);

  return {
    // Add
    isAddOpen,
    openAdd,
    closeAdd,

    // Edit
    selectedTask,
    openEdit,
    closeEdit,

    // 🔥 Delete
    deleteTaskId,
    openDelete,
    closeDelete,
  };
}