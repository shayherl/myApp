import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api/tasks'
});

export async function fetchTasks() {
    const { data } = await api.get("/");
    return data;
}

export async function createTask(payload) {
    const { data } = await api.post('/', payload);
    return data;
}

export async function updateTask(id, payload) {
    const { data } = await api.put(`/${id}`, payload);
    return data;
}

export async function deleteTask(id) {
    await api.delete(`/${id}`);
    return {ok:true}
}

export async function toggleTask(id) {
    const { data } = await api.patch(`/${id}/toggle`);
    return data;
}