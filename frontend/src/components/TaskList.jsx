import { useState } from "react";
import TaskItem from "./TaskItem";
import { deleteTask, toggleTask } from '../services/api'

export default function TaskList({tasks, onChange}){
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTask = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tasks.length);
  };
  console.log(tasks)
  const prevTask = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + tasks.length) % tasks.length);
  };

    const handleToggle = async (id) => {
    try {
      const updated = await toggleTask(id); 
      onChange(prev =>
        prev.map(t => (t.id === id ? updated : t))
      );
    } catch (e) {
      console.error(e);
      alert("Toggle failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      onChange(prev => prev.filter(t => t.id !== id));
    } catch (e) {
      console.error(e);
      alert("Delete failed");
    }
  };

  return (
    
    <div style={{ position: 'relative', width: '600px', margin: 'auto', display: "flex", justifyContent: "center", alignItems: "center" }}>
      <button onClick={prevTask} style={{ position: 'absolute', top: '50%', left: '10px' }}>
        {'<'}
      </button>
      <TaskItem
        task={tasks[currentIndex]}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
      <button onClick={nextTask} style={{ position: 'absolute', top: '50%', right: '10px' }}>
        {'>'}
      </button>
    </div>
  );
}