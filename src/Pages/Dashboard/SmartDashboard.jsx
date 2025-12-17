import { Navigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import UserDashboard from './UserDashboard/UserDashboard';
import AdminDashboard from './Admin/AdminDashboard';

const SmartDashboard = () => {
  const { userDB, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  
  if (userDB?.role === 'admin') {
    return <AdminDashboard />;
  }

  
  return <UserDashboard />;
};

export default SmartDashboard;