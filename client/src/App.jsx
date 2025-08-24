import { useEffect, useState } from "react";

function App() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    fetch("/api/health")
      .then(r => r.json())
      .then(setHealth)
      .catch(console.error);
  }, []);

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <h1>React + Node Starter</h1>
      <pre>{JSON.stringify(health, null, 2)}</pre>
    </div>
  );
}
export default App;
