export default function TaskCard({ task }) {
    return (
      <div className="task-card bg-gray-800 p-3 rounded-lg border border-cyan-700 mb-3">
        <p className="mb-1"><span className="font-bold">Task ID:</span> {task.id}</p>
        <p className="mb-1"><span className="font-bold">Task Name:</span> {task.title}</p>
        <p className="mb-1"><span className="font-bold">Description:</span> {task.description}</p>
        <p className="mb-1"><span className="font-bold">Assigned Student:</span> 
           {task.assignedTo.username}
        </p>
        <p className="mb-1"><span className="font-bold">Status:</span> 
           {task.status}
        </p>
      </div>
    );
  }