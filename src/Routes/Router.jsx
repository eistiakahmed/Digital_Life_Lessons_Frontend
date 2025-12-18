import { createBrowserRouter } from 'react-router';
import MainLayouts from '../Layouts/MainLayouts';
import Home from '../Pages/Home/Home';
import DashboardLayouts from '../Layouts/DashboardLayouts';
import Pricing from '../Pages/Pricing/Pricing';
import DashboardHome from '../Pages/Dashboard/DashboardHome/DashboardHome';
import UserDashboard from '../Pages/Dashboard/UserDashboard/UserDashboard';
import SmartDashboard from '../Pages/Dashboard/SmartDashboard';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import PublicLessons from '../Pages/PublicLessons/PublicLessons';
import AddLesson from '../Pages/Dashboard/Lessons/AddLesson';
import MyLessons from '../Pages/Dashboard/Lessons/MyLessons';
import UpdateLesson from '../Pages/Dashboard/Lessons/UpdateLesson';
import Profile from '../Pages/Dashboard/Profile/Profile';
import Favorites from '../Pages/Dashboard/Favorites/Favorites';
import LessonDetails from '../Pages/LessonDetails/LessonDetails';
import NotFound from '../Pages/NotFound/NotFound';
import PaymentSuccess from '../Pages/Dashboard/PaymentSuccess/PaymentSuccess';
import PaymentCancelled from '../Pages/Dashboard/PaymentCancelled/PaymentCancelled';
import PrivateRoutes from './PrivateRoutes/PrivateRoutes';
import AdminDashboard from '../Pages/Dashboard/Admin/AdminDashboard';
import ManageUsers from '../Pages/Dashboard/Admin/ManageUsers';
import ManageLessons from '../Pages/Dashboard/Admin/ManageLessons';
import ReportedLessons from '../Pages/Dashboard/Admin/ReportedLessons';
import AdminProfile from '../Pages/Dashboard/Admin/AdminProfile';
import AdminRoutes from './AdminRoutes/AdminRoutes';
import PublicProfile from '../Pages/PublicProfile/PublicProfile';
import React_Lottie from '../Components/React_Lottie/React_Lottie';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayouts />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/public_lessons',
        element: <PublicLessons />,
      },
      {
        path: '/lesson/:id',
        element: (
          <PrivateRoutes>
            <LessonDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: '/pricing',
        element: (
          <PrivateRoutes>
            <Pricing />
          </PrivateRoutes>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/profile/:email',
        element: <PublicProfile />,
      },
      {
        path: '/payment/success',
        element: (
          <PrivateRoutes>
            <PaymentSuccess />
          </PrivateRoutes>
        ),
      },
      {
        path: '/payment/cancel',
        element: (
          <PrivateRoutes>
            <PaymentCancelled />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoutes>
        <DashboardLayouts />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: <SmartDashboard />,
      },
      {
        path: 'add_lesson',
        element: <AddLesson />,
      },
      {
        path: 'my_lessons',
        element: <MyLessons />,
      },
      {
        path: 'update_lesson/:id',
        element: <UpdateLesson />,
      },
      {
        path: 'favorites',
        element: <Favorites />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'payment_success',
        element: <PaymentSuccess />,
      },
      {
        path: 'payment_cancelled',
        element: <PaymentCancelled />,
      },
      // Admin Routes
      {
        path: 'admin',
        element: (
          <AdminRoutes>
            <AdminDashboard />
          </AdminRoutes>
        ),
      },
      {
        path: 'admin/manage_users',
        element: (
          <AdminRoutes>
            <ManageUsers />
          </AdminRoutes>
        ),
      },
      {
        path: 'admin/manage_lessons',
        element: (
          <AdminRoutes>
            <ManageLessons />
          </AdminRoutes>
        ),
      },
      {
        path: 'admin/reported_lessons',
        element: (
          <AdminRoutes>
            <ReportedLessons />
          </AdminRoutes>
        ),
      },
      {
        path: 'admin/profile',
        element: (
          <AdminRoutes>
            <AdminProfile />
          </AdminRoutes>
        ),
      },
      {
        path: 'react_lottie',
        element: <React_Lottie />
      }
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
