import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../graphql/mutations';

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
    onCompleted: () => {
      onClose();
      // Optionally refetch projects here
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createProject({ variables: formData });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Add New Project</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Title</label>
              <input
                type="text"
                className="w-full bg-gray-700 rounded px-3 py-2"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block mb-1">Description</label>
              <textarea
                className="w-full bg-gray-700 rounded px-3 py-2"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block mb-1">Category</label>
              <input
                type="text"
                className="w-full bg-gray-700 rounded px-3 py-2"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Start Date</label>
                <input
                  type="date"
                  className="w-full bg-gray-700 rounded px-3 py-2"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block mb-1">End Date</label>
                <input
                  type="date"
                  className="w-full bg-gray-700 rounded px-3 py-2"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="block mb-1">Members</label>
              <select
                multiple
                className="w-full bg-gray-700 rounded px-3 py-2"
                value={formData.members}
                onChange={(e) => setFormData({
                  ...formData, 
                  members: Array.from(e.target.selectedOptions, option => option.value)
                })}
              >
                {/* Populate with students from backend */}
                <option value="student1">Student 1</option>
                <option value="student2">Student 2</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 rounded"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}