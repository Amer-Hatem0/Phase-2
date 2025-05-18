
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../styles/dashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || user.role !== "admin") {
      alert("Access denied!");
      navigate("/login");
    } else {
      document.getElementById("adminname").innerText = user.username;
    }

    const updateDateTime = () => {
      const dtEl = document.getElementById("datetime");
      if (dtEl) dtEl.innerText = new Date().toLocaleString();
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="dashboard-container min-h-screen bg-gray-900 text-white font-sans">
      {/* Navbar */}
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
      <div className="a flex min-h-[calc(100vh-3rem)]">
        {/* Sidebar */}
        <div className="sidebar w-64 bg-gray-800 p-4 border-r border-gray-700">
          <ul className="space-y-4">
            <li className="bg-blue-600 text-center py-2 rounded font-bold text-white"><a href="">Home</a></li>
            <li className="bg-gray-700 hover:bg-gray-600 text-center py-2 rounded"><a href="/projects">Projects</a></li>
            <li className="bg-gray-700 hover:bg-gray-600 text-center py-2 rounded"><a href="">Tasks</a></li>
            <li className="bg-gray-700 hover:bg-gray-600 text-center py-2 rounded"><a href="">Chat</a></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content flex-1 p-6 overflow-auto">
          <div className="header flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-500">Welcome to the Task Management System</h2>
            <span className="text-sm" id="datetime"></span>
          </div>

          {/* Stats */}
          <div className="stats grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="stat-box bg-gray-700 p-4 rounded shadow text-center">
              Number of Projects <br/><strong className="text-xl">5</strong>
            </div>
            <div className="stat-box bg-gray-700 p-4 rounded shadow text-center">
              Number of Students <br/><strong className="text-xl">20</strong>
            </div>
            <div className="stat-box bg-gray-700 p-4 rounded shadow text-center">
              Number of Tasks <br/><strong className="text-xl">10</strong>
            </div>
            <div className="stat-box bg-gray-700 p-4 rounded shadow text-center">
              Number of Finished Projects <br/><strong className="text-xl">2</strong>
            </div>
          </div>

          {/* Chart */}
          <div className="chart-container mt-8 bg-gray-800 p-4 rounded shadow">
            <canvas id="dashboardChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}