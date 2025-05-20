// 📁 src/pages/StudentDashboard.jsx
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const [taskStats, setTaskStats] = useState({ assigned: 0, completed: 0, pending: 0 });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || user.role !== "student") {
      alert("Access denied!");
      navigate("/login");
    } else {
      document.getElementById("studentname").innerText = user.username;
      fetchTaskData(user.id);
    }

    const updateDateTime = () => {
      const dtEl = document.getElementById("datetime");
      if (dtEl) dtEl.innerText = new Date().toLocaleString();
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  const fetchTaskData = async (userId) => {
    try {
      const response = await fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          query: `
            query GetStudentTaskStats($id: ID!) {
              studentTaskStats(id: $id) {
                assigned
                completed
                pending
              }
            }
          `,
          variables: { id: userId }
        })
      });
      const result = await response.json();
      setTaskStats(result.data.studentTaskStats);
      renderChart(result.data.studentTaskStats);
    } catch (error) {
      console.error("Failed to load chart data", error);
    }
  };

  const renderChart = (data) => {
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;

    import('chart.js/auto').then(({ default: Chart }) => {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Assigned', 'Completed', 'Pending'],
          datasets: [{
            label: 'Tasks',
            data: [data.assigned, data.completed, data.pending],
            backgroundColor: ['#1E90FF', '#28A745', '#FFC107']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: 'Student Task Overview' }
          }
        }
      });
    });
  };

  return (
    <div className="dashboard-container">
      <div className="nav">
        <div className="admin-info">
          <span id="admin-name">Student <span id="studentname"></span></span>
          <button
            className="logout-btn"
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

      <div className="a">
        <div className="sidebar">
          <ul>
            <li className="active"><a href="/student">Home</a></li>
            <li><a href="/student/projects">My Projects</a></li>
            <li><a href="/tasks">My Tasks</a></li>
            <li><a href="/student/chats">Chat</a></li>
          </ul>
        </div>

        <div className="main-content">
          <div className="header">
            <h2>Welcome to Your Student Dashboard</h2>
            <span className="date-time timeSpan" id="datetime"></span>
          </div>

          <div className="stats">
            <div className="stat-box">Number of Assigned Tasks <br/><strong>{taskStats.assigned}</strong></div>
            <div className="stat-box">Completed Tasks <br/><strong>{taskStats.completed}</strong></div>
            <div className="stat-box">Pending Tasks <br/><strong>{taskStats.pending}</strong></div>
          </div>

          <div className="chart-container">
            <canvas id="dashboardChart" ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}
