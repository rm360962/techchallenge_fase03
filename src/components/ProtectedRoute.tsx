import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { SessionContext } from '../sessionContext';

const ProtectedRoute = ({ children }) => {
  const context = useContext(SessionContext);

  if (!context.sessao.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
