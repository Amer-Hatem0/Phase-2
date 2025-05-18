import { useEffect, useRef } from 'react';
import TaskCard from './TaskCard';
import "../styles/projectdetails.css";

export default function ProjectDetailsSidebar({ project, onClose }) {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="project-details-container" ref={sidebarRef}>
      <div className="project-details-content">
        <h3 className="project-details-title">{project.title}</h3>
        
        <div className="project-meta">
          <p className="project-meta-item">
            <span className="project-meta-label">Description: </span> 
            {project.description}
          </p>
          <p className="project-meta-item">
            <span className="project-meta-label">Category: </span> 
            {project.category?.name || 'Uncategorized'}
          </p>
          <p className="project-meta-item">
            <span className="project-meta-label">Students: </span> 
            {project.members?.map(m => m.username).join(', ') || 'None'}
          </p>
          <p className="project-meta-item">
            <span className="project-meta-label">Start Date: </span> 
            {project.startDate}
          </p>
          <p className="project-meta-item">
            <span className="project-meta-label">End Date: </span> 
            {project.endDate}
          </p>
        </div>
        
        <h4 className="project-tasks-header">Tasks</h4>
        <div className="project-tasks-list">
          {project.tasks?.length > 0 ? (
            project.tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <p className="project-no-tasks">No tasks yet</p>
          )}
        </div>
      </div>
    </div>
  );
}