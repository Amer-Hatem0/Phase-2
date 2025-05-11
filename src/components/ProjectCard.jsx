import { useState } from 'react';

export default function ProjectCard({ project, onClick }) {
  return (
    <div 
      className="project-card bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-orange-400 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-blue-500 text-lg font-semibold mb-2">{project.title}</h3>
      <p className="mb-2"><span className="font-bold">Description:</span> {project.description}</p>
      <p className="mb-2"><span className="font-bold">Students:</span> {project.members.join(', ')}</p>
      <p className="mb-4"><span className="font-bold">Category:</span> {project.category}</p>
      
      <div className="progress-bar bg-gray-600 h-6 rounded-full mb-2 overflow-hidden">
        <div 
          className="progress-fill bg-blue-500 h-full flex items-center justify-center text-white text-sm"
          style={{ width: `${project.progress}%` }}
        >
          {project.progress}%
        </div>
      </div>
      
      <div className="flex justify-between text-sm">
        <span>{project.startDate}</span>
        <span>{project.endDate}</span>
      </div>
    </div>
  );
}