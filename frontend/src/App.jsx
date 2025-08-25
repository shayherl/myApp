import { useState } from "react";
import TaskFilter from './components/TaskFilter.jsx';
import TaskList from "./components/TaskList.jsx";
import { useEffect } from "react";
import { fetchTasks } from "./services/api.js";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
      (async () => {
        try {
          const data = await fetchTasks();
          setTasks(data || []);
          setFilteredTasks(data);
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

  if (loading) return <div>Loading…</div>;

  return (
    <div>
      <h1>Tasks:</h1>
      <TaskFilter value={filter} onChange={setFilter}/>
      {tasks.length === 0 ? 'No tasks to show' : <TaskList tasks={filteredTasks} onChange={setTasks}/>}
    </div>
  );
}
export default App;
