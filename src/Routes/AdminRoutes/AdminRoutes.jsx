import { Navigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Spinner from '../../Components/Spinner/Spinner';

const AdminRoutes = ({ children }) => {
  const { user, userDB, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="">
          <Spinner />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!userDB || userDB.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoutes;