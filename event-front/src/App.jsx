import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import CreateEvent from "./pages/CreateEvent";
import Galleries from "./pages/Galleries";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageError from "./pages/PageError";
import Services from "./pages/Services";
import Signup from "./pages/Signup";
import './styles/App.css';




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
  // routes here...
  {
    path: "/",
    element: <Navbar/>,
    errorElement : <PageError />,
    children : [
      {
        path : 'pages/Home',
        element:<Home />
      },
      {
        path : 'pages/Services',
        element:<Services />
      },
      {
        path : 'pages/Galleries',
        element  :  <Galleries/>
      },
      {
        path : 'pages/CreateEvent',
        element  :  <CreateEvent/>
      },
      {
        path : 'pages/Login',
        element  :  <Login/>
      },
      {
        path : 'pages/Signup',
        element  :  <Signup/>
      },
    ],
  },

])

/* Components of our pages */





/*----------------------------------------- */

function App() {
  return <RouterProvider router={router} />
}

export default App;
