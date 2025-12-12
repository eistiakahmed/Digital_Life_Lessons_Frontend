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
import UpdateLesson from '../Pages/Dashboard/Lessons/UpdateLesson';
import Profile from '../Pages/Dashboard/Profile/Profile';
import Favorites from '../Pages/Dashboard/Favorites/Favorites';
import LessonDetails from '../Pages/LessonDetails/LessonDetails';
import NotFound from '../Pages/NotFound/NotFound';
import PaymentSuccess from '../Pages/Dashboard/PaymentSuccess/PaymentSuccess';
import PaymentCancelled from '../Pages/Dashboard/PaymentCancelled/PaymentCancelled';
import PrivateRoutes from './PrivateRoutes/PrivateRoutes';

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
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
