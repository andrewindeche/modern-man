import React from 'react';
import "../style.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from "../Homepage/HomePage";

const router = createBrowserRouter([
    {
    path: '/',
    element: <Homepage />,
    },
    ]
 );

const App = () => {
    return(
        <RouterProvider router={router} />
    );
  };
export default App;
