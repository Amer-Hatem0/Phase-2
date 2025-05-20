import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_TASK } from '../graphql/operations';
import { GET_PROJECT_OPTIONS, GET_STUDENT_OPTIONS } from '../graphql/queries';
import '../styles/taskmodal.css';

export default function AddTaskModal({ onClose }) {
  const [formData, setFormData] = useState({
    projectTitle: '',
    title: '',
    description: '',
    assignedToUsername: '',
    status: 'IN_PROGRESS',
    dueDate: ''
  });

  const [createTask] = useMutation(CREATE_TASK);
  const { data: projectsData } = useQuery(GET_PROJECT_OPTIONS);
  const { data: studentsData } = useQuery(GET_STUDENT_OPTIONS, {
    skip: !formData.projectTitle // Skip if no project selected
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask({
        variables: {
          title: formData.title,
          description: formData.description,
          projectTitle: formData.projectTitle,
          assignedToUsername: formData.assignedToUsername,
          status: formData.status,
          dueDate: formData.dueDate
        }
      });
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Create New Task</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <label>Project Title:</label>
            <select
              value={formData.projectTitle}
              onChange={(e) => setFormData({...formData, projectTitle: e.target.value})}
              required
            >
              <option value="">Select a project</option>
              {projectsData?.getProjectOptions?.map(project => (
                <option key={project.id} value={project.title}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-row">
            <label>Task Name:</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Enter task name"
              required
            />
          </div>
          
          <div className="form-row">
            <label>Description:</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Enter task description"
              required
            />
          </div>
          
          <div className="form-row">
            <label>Assigned Student:</label>
            <select
              value={formData.assignedToUsername}
              onChange={(e) => setFormData({...formData, assignedToUsername: e.target.value})}
              required
              disabled={!formData.projectTitle}
            >
              <option value="">Select a student</option>
              {studentsData?.getStudentOptions?.map(student => (
                <option key={student.id} value={student.username}>
                  {student.username}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-row">
            <label>Status:</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="PENDING">Pending</option>
              <option value="ON_HOLD">On Hold</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          
          <div className="form-row">
            <label>Due Date:</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
            />
          </div>
          
          <button type="submit" className="submit-btn">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}