import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './Routes/Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

import ThemeProvider from './Context/ThemeProvider';
import AuthProvider from './Context/AuthProvider';
import { Toaster } from 'react-hot-toast';
import useUserSync from './hooks/useUserSync';

// Component to handle user sync
const AppWithSync = () => {
  useUserSync();
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AppWithSync />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
