// import { useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';


// export default function ProtectedRoute({ children, role: requiredRole }) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       return navigate('/login', { replace: true });
//     }

//     try {
//       const decoded = jwtDecode(token);

   
//       if (requiredRole && decoded.role !== requiredRole) {
//         return navigate('/login', { replace: true });
//       }

  

//     } catch (err) {
//       console.error('Invalid token');
//       navigate('/login', { replace: true });
//     }
//   }, [navigate, location, requiredRole]);

//   return children;
// }

import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ role, children }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user || user.role !== role) {
    return <Navigate to="/login" />;
  }

  return children;
}