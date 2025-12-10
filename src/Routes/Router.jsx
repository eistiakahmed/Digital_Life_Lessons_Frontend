import { createBrowserRouter } from 'react-router';
import MainLayouts from '../Layouts/MainLayouts';
import Home from '../Pages/Home/Home';
import DashboardLayouts from '../Layouts/DashboardLayouts';
import Pricing from '../Pages/Pricing/Pricing';
import DashboardHome from '../Pages/Dashboard/DashboardHome/DashboardHome';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import PublicLessons from '../Pages/PublicLessons/PublicLessons';
import AddLesson from '../Pages/Dashboard/Lessons/AddLesson';
import MyLessons from '../Pages/Dashboard/Lessons/MyLessons';
import Profile from '../Pages/Dashboard/Profile/Profile';
import PrivateRoutes from './PrivateRoutes/PrivateRoutes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayouts />,
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
        path: '/pricing',
        element: <Pricing />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
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
        element: <DashboardHome />,
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
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);
