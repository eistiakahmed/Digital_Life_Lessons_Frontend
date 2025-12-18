import { Navigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import UserDashboard from './UserDashboard/UserDashboard';
import AdminDashboard from './Admin/AdminDashboard';
import Spinner from '../../Components/Spinner/Spinner';

const SmartDashboard = () => {
  const { userDB, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="">
          <Spinner />
        </div>
      </div>
    );
  }

  if (userDB?.role === 'admin') {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
};

export default SmartDashboard;
