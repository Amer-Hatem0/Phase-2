export default function TaskCard({ task }) {
  return (
    <div className="task-card">
      <p className="task-info">
        <span className="task-label">Task ID:</span> {task.id}
      </p>
      <p className="task-info">
        <span className="task-label">Task Name:</span> {task.title}
      </p>
      <p className="task-info">
        <span className="task-label">Description:</span> {task.description}
      </p>
      <p className="task-info">
        <span className="task-label">Assigned Student:</span> {task.assignedTo.username}
      </p>
      <p className="task-info">
        <span className="task-label">Status:</span> {task.status}
      </p>
    </div>
  );
}