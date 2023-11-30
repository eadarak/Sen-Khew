import { jwtDecode } from "jwt-decode";
import React from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from "./Navbar";
import CreateEvent from "./pages/CreateEvent";
import DashClient from "./pages/DashClient";
import Galleries from "./pages/Galleries";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageError from "./pages/PageError";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import Signup from "./pages/Signup";


import './styles/App.css';

const token = sessionStorage.getItem('jwt');
  
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.id : null;
  const userRole = decodedToken ? decodedToken.role : null;
  const userName = decodedToken ? decodedToken.nom : null;
  //console.log(userName);
const router = createBrowserRouter([
  {
    path: "/", // Route racine
    element: (
      <>
      <Navbar/>
      <Home />
      </>
    ), // Page d'accueil
  },
  {
    path: "/",
    element: <Navbar/>,
    errorElement : <PageError />,
    children : [
      {
        path: 'pages/Home',
        element: <Home />
      },
      {
        path: 'pages/Services',
        element: <Services />
      },
      {
        path: 'pages/Galleries',
        element: <Galleries />
      },
      {
        path: 'pages/CreateEvent',
        element: <CreateEvent />
      },
      {
        path: 'pages/Login',
        element: <Login />
      },
      {
        path: 'pages/Signup',
        element: <Signup />
      },
      {
        path: 'pages/DashClient',
        element: <DashClient />
      },
      {
        path: 'pages/Profile',
        element: <Profile />
      },
    ],
  },
]);


function App() {
  return <RouterProvider router={router} />
}


export default App;
