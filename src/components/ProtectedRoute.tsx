import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ usuarioLogado, children }) => {
  if (!usuarioLogado) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
