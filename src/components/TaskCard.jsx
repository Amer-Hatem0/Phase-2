export default function TaskCard({ task }) {

  return (
    <div className="task-card">
      <p className="task-info">
        <span className="font-bold">Task ID:</span> {task.id}
      </p>
      <p className="task-info">
        <span className="font-bold">Task Name:</span> {task.title}
      </p>
      <p className="task-info">
        <span className="font-bold">Description:</span> {task.description}
      </p>
      <p className="task-info">
        <span className="font-bold">Assigned Student:</span> {task.assignedTo.username}
      </p>
      <p className="task-info">
        <span className="font-bold">Status:</span> {task.status}
      </p>
    </div>
  );
}