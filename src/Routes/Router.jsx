import { createBrowserRouter } from 'react-router';
import MainLayouts from '../Layouts/MainLayouts';
import Home from '../Pages/Home/Home';
import DashboardLayouts from '../Layouts/DashboardLayouts';
import PublicLessons from '../Pages/Lessons/PublicLessons';
import Pricing from '../Pages/Pricing/Pricing';
import DashboardHome from '../Pages/Dashboard/DashboardHome/DashboardHome';
import AddLesson from '../Pages/Lessons/AddLesson';
import MyLessons from '../Pages/Lessons/MyLessons';

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
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayouts />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: 'add_lesson',
        element: <AddLesson />
      },
      {
        path: 'my_lessons',
        element: <MyLessons />
      }
    ],
  },
]);
