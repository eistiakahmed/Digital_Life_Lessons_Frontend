import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Routes/Router'
import { AuthContext } from './Context/AuthContext'
import ThemeProvider from './Context/ThemeProvider'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthContext>
        <RouterProvider router={router} />
      </AuthContext>
    </ThemeProvider>
  </StrictMode>
);
