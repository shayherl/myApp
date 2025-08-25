export default function TaskItem({task, onToggle, onDelete}){

    const created = task.createdAt
        ? new Date(task.createdAt).toLocaleString()
        : "";

    return(
        <div className="card" style={{
            width: "100%",
            maxWidth: "550px",
            margin: "0 auto",
            padding: "20px",
            textAlign: "center"
        }}>
            <h3>{task.title}</h3>

            <div style={{ marginBottom: "10px" }}>
                <span style={{ marginRight: "10px" }}>{created}</span>
                <span style={{ marginRight: "10px" }}>{task.priority}</span>
                {task.completed ? <span className="badge">done</span> : <span className="badge">pending</span>}
            </div>

            {task.description && <p className="desc">{task.description}</p>}

            <div style={{ display: "flex", justifyContent: "space-between"}}>
                <button className="btn" onClick={() => onToggle(task.id)}>
                Toggle completion
                </button>
                <button className="btn" onClick={() => onDelete(task.id)}>
                Delete task
                </button>
            </div>
        </div>
    )
};