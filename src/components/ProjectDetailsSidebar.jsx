import { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import TaskCard from './TaskCard';
import "../styles/projectdetails.css";
import { GET_PROJECT_TASKS } from '../graphql/queries';

const formatDate = (timestamp) => {
  if (!timestamp) return 'Not set';
  const date = new Date(Number(timestamp));
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function ProjectDetailsSidebar({ project, onClose }) {
  const sidebarRef = useRef(null);
  const { data } = useQuery(GET_PROJECT_TASKS, {
  variables: { projectId: project.id },
  skip: !project.id
  });

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

  // Handle loading and error states
  // if (loading) return <div className="loading-tasks">Loading tasks...</div>;
  // if (error) return <div className="error-tasks">Error loading tasks: {error.message}</div>;

  const tasks = data?.getProjectTasks || [];

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
            {formatDate(project.startDate)}
          </p>
          <p className="project-meta-item">
            <span className="project-meta-label">End Date: </span> 
            {formatDate(project.endDate)}
          </p>
        </div>
        
        <h4 className="project-tasks-header">Tasks</h4>
        <div className="project-tasks-list">
          {tasks?.length > 0 ? (
            tasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={{
                  ...task,
                  assignedTo: task.assignedTo || { username: 'Unassigned' } // Fallback
                }} 
              />
            ))
          ) : (
            <p className="project-no-tasks">No tasks yet</p>
          )}
        </div>
      </div>
    </div>
  );
}