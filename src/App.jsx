import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './ProtectedRoute';
import Projects from './pages/Projects'
import Tasks from './pages/Tasks';
import Chats from './pages/Chats';
import ChatsStd from './pages/ChatsStd';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/student/:id"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/:id"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects"
        element={
          <ProtectedRoute role="admin">
            <Projects />
          </ProtectedRoute>
        }
      />

       <Route
        path="/tasks"
        element={
            <Tasks />
        }
      />
       <Route
        path="/chats"
        element={
            <Chats />
        }
      />
      <Route
        path="/student/chats"
        element={
            <ChatsStd />
        }
      />
    </Routes>
  );
}

export default App;
