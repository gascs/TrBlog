import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';

// 页面懒加载
const HomePage = lazy(() => import('./pages/HomePage'));
const PostDetailPage = lazy(() => import('./pages/PostDetailPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const PostsPage = lazy(() => import('./pages/admin/PostsPage'));
const CategoriesPage = lazy(() => import('./pages/admin/CategoriesPage'));
const TagsPage = lazy(() => import('./pages/admin/TagsPage'));
const UsersPage = lazy(() => import('./pages/admin/UsersPage'));

// 加载状态组件
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const queryClient = new QueryClient();

const App: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');



  const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
    if (!user || user.role !== 'ADMIN') {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<Loading />}>
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
        </Suspense>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;