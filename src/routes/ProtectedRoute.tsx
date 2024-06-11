import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }:ProtectedRouteProps) => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    // Redirect to login page if no token
    return <Navigate to="/" replace />;
  }

  // Render the child component if token exists
  return children;
};

export default ProtectedRoute;
