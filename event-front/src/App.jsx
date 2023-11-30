import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import CreateEvent from "./pages/CreateEvent";
import Galleries from "./pages/Galleries";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageError from "./pages/PageError";
import Services from "./pages/Services";
import Signup from "./pages/Signup";
import DashClient from "./pages/DashClient";
import './styles/App.css';
import {jwtDecode} from "jwt-decode";

const token = sessionStorage.getItem('jwt');
  
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.id : null;
  const userRole = decodedToken ? decodedToken.role : null;
  const userName = decodedToken ? decodedToken.nom : null;
  //console.log(userName);
const router = createBrowserRouter([
  // ... (autres configurations de route)

  // Route principale avec le Navbar partagé
  {
    path: "/",
    element: (
      <Navbar>
        <Home />
      </Navbar>
    ),
    children: [
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
    ],
  },
]);

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <RouterProvider router={router}>
      {/* Navbar à la racine de l'application */}
      <Navbar isLoggedIn={isLoggedIn} />

      {/* Reste de l'application */}
      <div>
        <Outlet />
        {/* ... (autres composants et éléments de l'application) */}
      </div>
    </RouterProvider>
  );
}

export default App;
