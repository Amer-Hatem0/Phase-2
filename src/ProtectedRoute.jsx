import { useQuery } from '@apollo/client';
import { GET_ME } from './graphql/queries';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ requiredRole, children }) {
  const { data, loading, error } = useQuery(GET_ME, {
    fetchPolicy: 'network-only' // Always check with server
  });

  if (loading) return <div>Loading...</div>;
  if (error || !data?.me) {
    sessionStorage.removeItem('token');
    return <Navigate to="/login" />;
  }
  if (data.me.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}