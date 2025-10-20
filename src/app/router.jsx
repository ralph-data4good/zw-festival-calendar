import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from '../pages/Home';
import Calendar from '../pages/Calendar';
import MapGallery from '../pages/MapGallery';
import Register from '../pages/Register';
import EventDetail from '../pages/EventDetail';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminLayout from '../pages/admin/AdminLayout';
import AdminEvents from '../pages/admin/AdminEvents';
import AdminEventEdit from '../pages/admin/AdminEventEdit';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/calendar', element: <Calendar /> },
      { path: '/map', element: <MapGallery /> },
      { path: '/register', element: <Register /> },
      { path: '/event/:id', element: <EventDetail /> },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminEvents /> },
      { path: 'events/:status', element: <AdminEvents /> },
      { path: 'events/:id', element: <AdminEventEdit /> },
    ],
  },
], {
  basename: '/zw-festival-calendar'
});

