import "../styles/projects.css"
export default function ProjectCard({ project, onClick }) {
  
  // Format dates as YYYY-MM-DD
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Not set';
    const date = new Date(Number(timestamp));
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="project-card" onClick={onClick}>
      <div className="card-header">
        <h3 className="project-title">{project.title}</h3>
      </div>
      <p><span className="font-bold">Description:</span> {project.description}</p>
      <p><span className="font-bold">Students:</span> {project.members?.join(', ') || 'None'}</p>
      <p><span className="font-bold">Category:</span> {project.category}</p>
      
      {/* Progress Bar with Centered Percentage */}
      {project.progress !== undefined && (
        <div className="relative mb-4 progress-bar-container">
          <div className="w-full bg-[#3a3a3a] h-6 rounded-full overflow-hidden progress-bar">
            <div 
              className="h-full bg-[#007bff] flex items-center justify-center transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            >
              <span className="text-white text-xs font-bold">
                {project.progress}%
              </span>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-between text-sm text-gray-400">
        <div>
          <span className="font-bold">Start:</span> {formatDate(project.startDate)}
        </div>
        <div>
          <span className="font-bold">End:</span> {formatDate(project.endDate)}
        </div>
      </div>
    </div>
  );
}