import type { Task } from "../types/Task";

// Custom hook for filtering tasks based on search input
export function useFilteredTasks(tasks: Task[], search: string) {
  const filtered = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase())
  );

  // 🔥 IMPORTANT: clone array before sort
  return filtered.slice().sort((a, b) => {
    if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
  });
}
