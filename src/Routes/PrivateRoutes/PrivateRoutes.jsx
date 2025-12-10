import React from 'react';
// // import useAuth from '../Hooks/useAuth';
// import { ClimbingBoxLoader } from 'react-spinners';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        {/* <ClimbingBoxLoader /> */}
        <p className="">
          Loading....
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate state={location?.pathname} to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRoutes;
