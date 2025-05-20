import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import '../styles/addmodal.css';
import { CREATE_PROJECT } from '../graphql/operations';
import { GET_STUDENT_OPTIONS, GET_ALL_CATEGORIES } from '../graphql/queries'

export default function AddProjectModal({ onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    startDate: '',
    endDate: '',
    members: []
  });

  const [createProject] = useMutation(CREATE_PROJECT, {
    variables: {
      title: formData.title,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      memberIds: formData.members
    },
    onCompleted: () => {
      onClose();
      // Optionally refetch queries here
    },
    onError: (error) => {
      console.error("Error creating project:", error);
      // Handle error (show toast, etc.)
    }
  });

  const { data: studentsData } = useQuery(GET_STUDENT_OPTIONS);
  const { data: categoriesData } = useQuery(GET_ALL_CATEGORIES);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   createProject({ variables: formData });
  // };
  const handleSubmit = async (formData) => {
    try {
      await createProject({
        variables: {
          title: formData.title,
          description: formData.description,
          categoryName: formData.categoryName,
          status: formData.status,
          startDate: formData.startDate,
          endDate: formData.endDate,
          memberUsernames: formData.memberUsernames
        },
        // Optional: Update cache after mutation
        update(cache, { data: { createProject } }) {
          cache.modify({
            fields: {
              getProjects(existingProjects = []) {
                return [...existingProjects, createProject];
              }
            }
          });
        }
      });
      onClose();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close" onClick={onClose}>&times;</span>
        <h2 className="modal-title">Add New Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Project Title:</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          
          <div className="form-row">
            <label>Project Description:</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="form-row">
            <label>Students List:</label>
            <select
              multiple
              value={formData.members}
              onChange={(e) => {
                const options = Array.from(e.target.selectedOptions, option => option.value);
                setFormData({...formData, memberUsernames: options});
              }}
              required
            >
              {studentsData?.getStudentOptions?.map(student => (
                <option key={student.id} value={student.username}>
                  {student.username}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-row">
            <label>Project Category:</label>
            <select
              value={formData.categoryName}
              onChange={(e) => setFormData({...formData, categoryName: e.target.value})}
              required
            >
              <option value="">Select a category</option>
              {categoriesData?.getAllCategories?.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label>Start Date:</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
            />
          </div>
          
          <div className="form-row">
            <label>End Date:</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
            />
          </div>

          <div className="form-row">
            <label>Project Status:</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              required
            >
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="PENDING">Pending</option>
              <option value="ON_HOLD">On Hold</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          
          <button type="submit" id="addProjectBtn">Add Project</button>
        </form>
      </div>
    </div>
  );
}