import TaskCard from './TaskCard';

export default function ProjectDetailsSidebar({ project, onClose }) {
  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-gray-800 border-l border-gray-700 overflow-y-auto">
      <div className="p-6">
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white mb-4"
        >
          &times; Close
        </button>
        
        <h3 className="text-cyan-400 text-xl font-bold mb-4">{project.title}</h3>
        
        <div className="project-info mb-6">
          <p className="mb-2"><span className="font-bold">Category:</span> {project.category}</p>
          <p className="mb-2"><span className="font-bold">Description:</span> {project.description}</p>
          <p className="mb-2"><span className="font-bold">Students:</span> 
            {project.members.map(member => member.username).join(', ')}
          </p>
          <p className="mb-2"><span className="font-bold">Start Date:</span> {project.startDate}</p>
          <p className="mb-2"><span className="font-bold">End Date:</span> {project.endDate}</p>
        </div>
        
        <h4 className="text-cyan-400 text-lg font-semibold mb-3">Tasks</h4>
        <div className="tasks-list">
          {project.tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}