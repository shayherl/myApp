export default function TaskFilter({value, onChange}){
    return(
        <>
            <p>Filter by:</p>
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                <option value={"all"}>All</option>
                <option value={"completed"}>Completed</option>
                <option value={"pending"}>Pending</option>
            </select>
        </>
    )
};