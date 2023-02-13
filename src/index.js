import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './LoginForm';
import Nav from './Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <Nav/>
      <Outlet/>
    </>,
    errorElement: <p>Page Not Found</p>,
    children: [
      {
        path: "/",
        element: <p>Movie List Component</p>,
      },
      {
        path: "/profile",
        element: <Profile/>,
        // element: !localStorage.getItem("SID") ? <Profile/> : <Navigate replace to ="/login"/>,
      }
    ],
  },
  {
    path: "/login",
    element: <LoginForm/>,
    errorElement: <p>Page Not Found</p>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} /> 
);