import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS, GET_ME } from '../graphql/queries';
import ProjectCard from '../components/ProjectCard';
import ProjectDetailsSidebar from '../components/ProjectDetailsSidebar';
import AddProjectModal from '../components/AddProjectModal';
import "../styles/projects.css"
export default function Projects() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [adminname, setAdminName] = useState('');
  // Fetch current user and projects
  const { data: userData } = useQuery(GET_ME);
  const { loading, error, data } = useQuery(GET_PROJECTS, {
    fetchPolicy: 'network-only'
  });
  
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("currentUser"));
  //   if (!user || user.role !== "admin") {
  //     alert("Access denied!");
  //     navigate("/login");
  //   } else {
  //     document.getElementById("adminname").innerText = user.username;
  //   }
  // }, [navigate]);
  useEffect(() => {
    if (userData?.me) {
      if (userData.me.role === "admin") {
        setAdminName(userData.me.username);
      } else {
        navigate("/login");
      }
    }
  }, [userData, navigate]);

if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-xl">Loading projects...</div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-xl text-red-500">Error: {error.message}</div>
    </div>
  );

  // Filter projects based on search and status filter
  // const filteredProjects = data.projects.filter(project => {
  //   const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
  //                        project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
  //   const matchesStatus = statusFilter === 'All Statuses' || 
  //                        project.status === statusFilter.toUpperCase().replace(' ', '_');
    
  //   return matchesSearch && matchesStatus;
  // });

  // Filter projects based on search and status filter
  const filteredProjects = data?.getProjects?.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Statuses' || 
                         project.status === statusFilter.toUpperCase().replace(' ', '_');
    
    return matchesSearch && matchesStatus;
  }) || [];

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container min-h-screen bg-gray-900 text-white font-sans">
      {/* Navbar - Same as AdminDashboard */}
      <div className="nav flex justify-end items-center h-12 bg-gray-800 px-6 border-b border-gray-700">
        <div className="admin-info flex items-center space-x-4">
          {/* <span id="admin-name" className="text-lg font-semibold">
            Admin <span id="adminname" className="text-blue-400"></span>
          </span> */}
          <span className="text-lg font-semibold">
            Admin <span className="text-blue-400">{adminname}</span>
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
            <li><a href="/admin/:id">Home</a></li>
            <li className="active"><a href="/projects">Projects</a></li>
            <li><a href="">Tasks</a></li>
            <li><a href="">Chat</a></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="header">
            <h2 className="text-2xl font-bold text-blue-500">Projects Overview</h2>
          </div>

          {/* Add Project and Search */}
          <div id="searchDiv">
            <button 
              type="button" 
              id="openProjectModal" 
              onClick={() => setIsAddModalOpen(true)}
            >
              Add New Project
            </button>
            <div className="filters">
              <input 
                type="text" 
                placeholder="Search projects by title or description..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select 
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
          <div id="projectsContainer">
            {filteredProjects.map(project => (
              <ProjectCard 
              key={project.id} 
              project={{
                ...project,
                members: project.members?.map(member => member.username), // Extract usernames
                category: project.category?.name || 'Uncategorized', // Add fallback
                progress: project.progress || 0 // Add fallback
              }}
              // project ={project}
              onClick={() => setSelectedProject(project)}
            />
            ))}
          </div>
          {/* ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-400 text-lg">
                {searchTerm || statusFilter !== 'All Statuses' 
                  ? "No projects match your search criteria" 
                  : "No projects found"}
              </p>
            </div>
          )} */}
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