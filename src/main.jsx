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
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';

// Component to handle user sync
const AppWithSync = () => {
  useUserSync();
  return (
    <>
      <RouterProvider router={router} />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--color-base-100)',
            color: 'var(--color-base-content)',
            border: '1px solid var(--color-base-300)',
          },
          success: {
            iconTheme: {
              primary: 'var(--color-success)',
              secondary: 'var(--color-success-content)',
            },
          },
          error: {
            iconTheme: {
              primary: 'var(--color-error)',
              secondary: 'var(--color-error-content)',
            },
          },
        }}
      />
    </>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <AppWithSync />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
