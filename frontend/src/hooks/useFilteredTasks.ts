import type { Task } from "../types/Task";

// Custom hook for filtering tasks based on search input
export function useFilteredTasks(tasks: Task[], search: string) {
  
  // Case-insensitive filtering by title or description
  return tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase())
  );
}