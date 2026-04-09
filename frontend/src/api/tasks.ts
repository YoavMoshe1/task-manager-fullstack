const BASE_URL = "http://localhost:3000/tasks";

export const getTasks = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const addTaskApi = async (task: { title: string; description: string }) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const deleteTaskApi = async (id: number) => {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};

export const updateTaskApi = async (id: number, data: any) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};