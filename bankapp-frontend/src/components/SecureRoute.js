import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

const SecureRoute = ({ children }) => {
  const { user } = useUserAuth();

  if (!user) return <Navigate to="/login" />;
  return children;
};

export default SecureRoute;
