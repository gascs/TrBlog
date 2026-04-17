import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import HomePage from './pages/HomePage';
import PostDetailPage from './pages/PostDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import PostsPage from './pages/admin/PostsPage';
import CategoriesPage from './pages/admin/CategoriesPage';
import TagsPage from './pages/admin/TagsPage';
import UsersPage from './pages/admin/UsersPage';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
    if (!user || user.role !== 'ADMIN') {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/posts/:id"
            element={
              <Layout>
                <PostDetailPage />
              </Layout>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/posts"
            element={
              <RequireAdmin>
                <AdminLayout>
                  <PostsPage />
                </AdminLayout>
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <RequireAdmin>
                <AdminLayout>
                  <CategoriesPage />
                </AdminLayout>
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/tags"
            element={
              <RequireAdmin>
                <AdminLayout>
                  <TagsPage />
                </AdminLayout>
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/users"
            element={
              <RequireAdmin>
                <AdminLayout>
                  <UsersPage />
                </AdminLayout>
              </RequireAdmin>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;