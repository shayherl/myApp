import { useState } from "react";
import TaskFilter from './components/TaskFilter.jsx';
import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskeForm.jsx";
import { useEffect } from "react";
import { fetchTasks, createTask } from "./services/api.js";


function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() =>{
      (async () => {
        try {
          setError("");
          const data = await fetchTasks();
          setTasks(data || []);
          setFilteredTasks(data);
        } catch (e) {
          setError(e.message || "Failed to load tasks");
        } finally {
          setLoading(false);
        }
      })();
  },[]);

  useEffect(() => {
      if (filter === 'completed'){
        setFilteredTasks(tasks.filter(t => t.completed));
      }
      else if (filter === 'pending'){
        setFilteredTasks(tasks.filter(t => !t.completed));
      }
      else{
        setFilteredTasks(tasks);
      }
    }, [tasks,filter]);

  const handleCreate = async (payload) => {
    const newTask = await createTask(payload);
    setTasks((prev) => [...prev, newTask]);
    setShowForm(false);
  };

  if (loading) return <div>Loading…</div>;
  return (
    <div>
      <h1>Tasks:</h1>
      <TaskFilter value={filter} onChange={setFilter}/>
      <button onClick={() => setShowForm(true)}>+ New Task</button>
      {error && <div className="error">{error}</div>}
      {tasks.length === 0 ? 'No tasks to show' : <TaskList tasks={filteredTasks} onChange={setTasks}/>}
      {showForm && (
        <TaskForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
export default App;
