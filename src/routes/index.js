import Layout from '@/components/Layout';
import Information from '@/pages/Information';
import NotFound from '@/pages/NotFound';
import { Navigate } from 'react-router-dom';

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
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
export default routeConfig;
