import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import App from './App.jsx'
import './index.css'
import { Homepage } from './page/Homepage.jsx';
import { Profile } from './page/Profile.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/home",
    element: <Homepage />
  },
  {
    path: "/profile",
    element: <Profile />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
