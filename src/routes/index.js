import Layout from '@/components/Layout';
import Information from '@/pages/Information';
import Test from '@/pages/Test';
import NotFound from '@/pages/NotFound';
import { Navigate } from 'react-router-dom';
import MemberManager from '@/pages/Member';
import Movie from '@/pages/Movie';

const routeConfig = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />,
      },
      {
        path: '/home',
        element: <Information />,
      },
      {
        path: '/member',
        element: <MemberManager />,
      },
      {
        path: '/movie',
        element: <Movie />,
      },
      {
        path: '/movieShelf',
        element: <Test />,
      },
      {
        path: '/theater',
        element: <Test />,
      },
      {
        path: '/room',
        element: <Test />,
      },
      {
        path: '/seat',
        element: <Test />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
export default routeConfig;
