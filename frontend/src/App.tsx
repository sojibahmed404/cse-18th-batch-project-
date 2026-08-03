import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import { store } from './store';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import NoticesPage from './pages/NoticesPage';
import RoutinesPage from './pages/RoutinesPage';
import CoverPagePage from './pages/assignments/CoverPagePage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* Public Auth Route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Student Portal Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="courses" element={<CoursesPage />} />
                <Route path="notices" element={<NoticesPage />} />
                <Route path="routines" element={<RoutinesPage />} />
                <Route path="cover-page" element={<CoverPagePage />} />
                <Route path="assignments" element={<CoverPagePage />} />
                <Route path="publish/*" element={<DashboardPage />} />
                <Route path="semesters" element={<CoursesPage />} />
                <Route path="events" element={<NoticesPage />} />
                <Route path="gallery" element={<DashboardPage />} />
                <Route path="downloads" element={<CoursesPage />} />
                <Route path="search" element={<DashboardPage />} />
              </Route>
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>

          <Toaster 
            position="top-right" 
            toastOptions={{ 
              style: { 
                background: '#0B2D3B', 
                color: '#F5F7FA', 
                border: '1px solid rgba(0, 184, 148, 0.3)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)' 
              } 
            }} 
          />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}
