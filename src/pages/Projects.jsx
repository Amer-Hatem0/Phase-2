import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../graphql/queries';
import ProjectCard from '../components/ProjectCard';
import ProjectDetailsSidebar from '../components/ProjectDetailsSidebar';
import AddProjectModal from '../components/AddProjectModal';

export default function Projects() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  
  // Fetch projects from backend
  const { loading, error, data } = useQuery(GET_PROJECTS);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || user.role !== "admin") {
      alert("Access denied!");
      navigate("/login");
    } else {
      document.getElementById("adminname").innerText = user.username;
    }
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Filter projects based on search and status filter
  const filteredProjects = data.projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Statuses' || 
                         project.status === statusFilter.toUpperCase().replace(' ', '_');
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dashboard-container min-h-screen bg-gray-900 text-white font-sans">
      {/* Navbar - Same as AdminDashboard */}
      <div className="nav flex justify-end items-center h-12 bg-gray-800 px-6 border-b border-gray-700">
        <div className="admin-info flex items-center space-x-4">
          <span id="admin-name" className="text-lg font-semibold">
            Admin <span id="adminname" className="text-blue-400"></span>
          </span>
          <button
            className="logout-btn bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            onClick={() => {
              localStorage.removeItem("currentUser");
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="flex min-h-[calc(100vh-3rem)]">
        {/* Sidebar */}
        <div className="sidebar w-64 bg-gray-800 p-4 border-r border-gray-700">
          <ul className="space-y-4">
            <li className="bg-gray-700 hover:bg-gray-600 text-center py-2 rounded"><a href="/admin">Home</a></li>
            <li className="bg-blue-600 text-center py-2 rounded font-bold text-white"><a href="/projects">Projects</a></li>
            <li className="bg-gray-700 hover:bg-gray-600 text-center py-2 rounded"><a href="">Tasks</a></li>
            <li className="bg-gray-700 hover:bg-gray-600 text-center py-2 rounded"><a href="">Chat</a></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content flex-1 p-6 overflow-auto">
          <div className="header flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Projects Overview</h2>
          </div>

          {/* Add Project and Search */}
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add New Project
            </button>
            
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search projects by title or description"
                className="bg-gray-700 text-white px-4 py-2 rounded w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <select 
                className="bg-gray-700 text-white px-4 py-2 rounded"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All Statuses</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>On Hold</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>

        {/* Project Details Sidebar */}
        {selectedProject && (
          <ProjectDetailsSidebar 
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

        {/* Add Project Modal */}
        {isAddModalOpen && (
          <AddProjectModal 
            onClose={() => setIsAddModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}