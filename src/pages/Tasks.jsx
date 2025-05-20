import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MY_TASKS, GET_ALL_TASKS, GET_ME } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';
import './../styles/dashboard.css';
import './../styles/tasks.css';
import './../styles/general.css';
import './../styles/taskmodal.css';

export default function Tasks() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('status');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = useState('');

  const { data: userData } = useQuery(GET_ME);
  const { data, loading, error } = useQuery(
    userRole === 'admin' ? GET_ME : GET_ME,
    { fetchPolicy: 'network-only' }
  );

  const sortOptions = [
    { label: 'Task Status', value: 'status' },
    { label: 'Project', value: 'project' },
    { label: 'Due Date', value: 'dueDate' },
    { label: 'Assigned Student', value: 'assignedTo' },
  ];

  const sortedTasks = useMemo(() => {
    if (!data) return [];
    const tasks = userRole === 'admin' ? data?.getAllTasks || [] : data?.getMyTasks || [];
    return [...tasks].sort((a, b) => {
      const key = sortBy;
      const aValue = (a[key]?.toString() || '').toLowerCase();
      const bValue = (b[key]?.toString() || '').toLowerCase();
      if (key === 'dueDate') return new Date(aValue) - new Date(bValue);
      return aValue.localeCompare(bValue);
    });
  }, [data, sortBy, userRole]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="text-xl text-white">Loading tasks...</div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="text-xl text-red-500">Error: {error.message}</div>
    </div>
  );

  return (
    <div className="dashboard-container min-h-screen bg-gray-900 text-white font-sans">
      {/* Navbar */}
      <div className="nav flex justify-end items-center h-12 bg-gray-800 px-6 border-b border-gray-700">
        <div className="admin-info flex items-center space-x-4">
          <span className="text-lg font-semibold">
            {userRole.charAt(0).toUpperCase() + userRole.slice(1)}{' '}
            <span className="text-blue-400">{username}</span>
          </span>
          <button
            className="logout-btn bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            onClick={() => {
              localStorage.clear();
              navigate('/login');
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex min-h-[calc(100vh-3rem)]">
        {/* Sidebar */}
        <div className="sidebar w-64 bg-gray-800 p-4 border-r border-gray-700">
          <ul className="space-y-4">
            <li className="bg-gray-700 hover:bg-gray-600 text-center py-2 rounded">
              <a href={userRole === 'admin' ? "/admin/:id" : "/student"} className="block">Home</a>
            </li>
            <li className="bg-gray-700 hover:bg-gray-600 text-center py-2 rounded">
              <a href={userRole === 'admin' ? "/projects" : "/projects"} className="block">Projects</a>
            </li>
            <li className="bg-blue-600 text-white text-center py-2 rounded font-bold">
              <a href={userRole === 'admin' ? "/tasks" : "/tasks"} className="block">Tasks</a>
            </li>
            <li className="bg-gray-700 hover:bg-gray-600 text-center py-2 rounded">
              <a href={userRole === 'admin' ? "/chats" : "/student/chats"} className="block">Chat</a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Controls */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <label htmlFor="sort" className="whitespace-nowrap">Sort By:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-gray-700 text-white p-2 rounded"
              >
                {sortOptions.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            {userRole === 'admin' && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded"
              >
                Create New Task
              </button>
            )}
          </div>

          {/* Tasks Table */}
          <div className="p-6 overflow-auto">
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  {['Task ID', 'Project', 'Task Name', 'Description',
                    'Assigned Student', 'Status', 'Due Date'].map(h => (
                      <th key={h} className="px-4 py-2 text-left">{h}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {sortedTasks?.map(task => (
                  <tr key={task.id} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="px-4 py-2">{task.id}</td>
                    <td className="px-4 py-2">{task.project?.title || 'N/A'}</td>
                    <td className="px-4 py-2">{task.title}</td>
                    <td className="px-4 py-2">{task.description}</td>
                    <td className="px-4 py-2">
                      {task.assignedTo?.username || 'Unassigned'}
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-sm ${task.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' :
                          task.status === 'IN_PROGRESS' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                        }`}>
                        {task.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}