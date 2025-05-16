import { useState, useEffect, useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { GET_MY_TASKS } from '../graphql/queries'
import { useNavigate } from 'react-router-dom'

export default function TasksPage() {
  const navigate = useNavigate()


  const [isModalOpen, setIsModalOpen] = useState(false)


  const sortOptions = [
    { label: 'Task Status', value: 'status' },
    { label: 'Project', value: 'project' },
    { label: 'Due Date', value: 'dueDate' },
    { label: 'Assigned Student', value: 'assignedTo' },
  ]
  const [sortBy, setSortBy] = useState('status')


  const { data, loading, error } = useQuery(GET_MY_TASKS, {
    fetchPolicy: 'network-only'
  })


  const tempTasks = [
    {
      id: '1',
      project: { id: 'p1', title: 'Website Redesign' },
      title: 'Design Homepage',
      description: 'Create a responsive design for the homepage.',
      assignedTo: { id: 'u1', username: 'Ali Yaseen' },
      status: 'IN_PROGRESS',
      dueDate: '2023-04-22'
    },
    {
      id: '2',
      project: { id: 'p1', title: 'Website Redesign' },
      title: 'Develop API',
      description: 'Set up the backend API for the project.',
      assignedTo: { id: 'u2', username: 'Braa Aeesh' },
      status: 'COMPLETED',
      dueDate: '2023-01-16'
    },
    {
      id: '3',
      project: { id: 'p2', title: 'Mobile App Development' },
      title: 'Write Documentation',
      description: 'Document the project setup and usage.',
      assignedTo: { id: 'u3', username: 'Ibn Al-Jawzee' },
      status: 'PENDING',
      dueDate: '2023-03-15'
    },
    {
      id: '4',
      project: { id: 'p2', title: 'Mobile App Development' },
      title: 'Testing',
      description: 'Conduct testing for all features.',
      assignedTo: { id: 'u4', username: 'Ibn Malik' },
      status: 'IN_PROGRESS',
      dueDate: '2023-11-29'
    },
    {
      id: '5',
      project: { id: 'p3', title: 'E-commerce Platform' },
      title: 'Deploy Application',
      description: 'Deploy the application to the production server.',
      assignedTo: { id: 'u5', username: 'Ayman Outom' },
      status: 'PENDING',
      dueDate: '2023-03-24'
    },
  ]


  const tasks = useMemo(() => {
    if (loading || error || !data?.tasks?.length) {
      return tempTasks
    }
    return data.tasks.map(t => ({
      ...t,
      dueDate: t.dueDate?.slice(0, 10),
    }))
  }, [loading, error, data])


  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      const key = sortBy
      const fa = (a[key] || '').toString().toLowerCase()
      const fb = (b[key] || '').toString().toLowerCase()

      if (key === 'dueDate') return new Date(fa) - new Date(fb)
      return fa.localeCompare(fb)
    })
  }, [tasks, sortBy])


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    if (!user || user.role !== 'admin') {
      navigate('/login')
    }
  }, [navigate])

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">


      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-12 bg-gray-800 flex items-center justify-end px-6 border-b border-gray-700">
          <span className="mr-4">Admin <strong id="adminname"></strong></span>
          <button
            onClick={() => {
              localStorage.clear()
              navigate('/login')
            }}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
          >
            Logout
          </button>
        </header>

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
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded"
          >
            Create a New Task
          </button>
        </div>

        {/* Table */}
        <div className="p-6 overflow-auto">
          <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                {['Task ID', 'Project', 'Task Name', 'Description', 'Assigned Student', 'Status', 'Due Date'].map(h => (
                  <th key={h} className="px-4 py-2 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedTasks.map(t => (
                <tr key={t.id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="px-4 py-2">{t.id}</td>
                  <td className="px-4 py-2">{t.project.title}</td>
                  <td className="px-4 py-2">{t.title}</td>
                  <td className="px-4 py-2">{t.description}</td>
                  <td className="px-4 py-2">{t.assignedTo.username}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-sm ${t.status === 'COMPLETED'
                          ? 'text-green-400'
                          : t.status === 'IN_PROGRESS'
                            ? 'text-yellow-400'
                            : 'text-red-400'
                        }`}
                    >
                      {t.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-2">{t.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  )
}
