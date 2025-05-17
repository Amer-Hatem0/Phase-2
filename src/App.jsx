import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './ProtectedRoute';
import TasksPage from './pages/TasksPage';
import Chats from './pages/Chats';
function App() {
  return (

    <>
      <TasksPage />
      <Chats />
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
      </Routes>
    </>
  );
}

export default App;
