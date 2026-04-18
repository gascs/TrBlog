import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import RouteTransition from './components/RouteTransition';

// 页面懒加载
const HomePage = lazy(() => import('./pages/HomePage'));
const PostDetailPage = lazy(() => import('./pages/PostDetailPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const SetupPage = lazy(() => import('./pages/SetupPage'));
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
            <Route path="/login" element={<RouteTransition><LoginPage /></RouteTransition>} />
            <Route path="/register" element={<RouteTransition><RegisterPage /></RouteTransition>} />
            <Route path="/setup" element={<RouteTransition><SetupPage /></RouteTransition>} />
            <Route
              path="/"
              element={
                <Layout>
                  <RouteTransition>
                    <HomePage />
                  </RouteTransition>
                </Layout>
              }
            />
            <Route
              path="/search"
              element={
                <Layout>
                  <RouteTransition>
                    <SearchPage />
                  </RouteTransition>
                </Layout>
              }
            />
            <Route
              path="/posts/:id"
              element={
                <Layout>
                  <RouteTransition>
                    <PostDetailPage />
                  </RouteTransition>
                </Layout>
              }
            />
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminLayout>
                    <RouteTransition>
                      <AdminDashboard />
                    </RouteTransition>
                  </AdminLayout>
                </RequireAdmin>
              }
            />
            <Route
              path="/admin/posts"
              element={
                <RequireAdmin>
                  <AdminLayout>
                    <RouteTransition>
                      <PostsPage />
                    </RouteTransition>
                  </AdminLayout>
                </RequireAdmin>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <RequireAdmin>
                  <AdminLayout>
                    <RouteTransition>
                      <CategoriesPage />
                    </RouteTransition>
                  </AdminLayout>
                </RequireAdmin>
              }
            />
            <Route
              path="/admin/tags"
              element={
                <RequireAdmin>
                  <AdminLayout>
                    <RouteTransition>
                      <TagsPage />
                    </RouteTransition>
                  </AdminLayout>
                </RequireAdmin>
              }
            />
            <Route
              path="/admin/users"
              element={
                <RequireAdmin>
                  <AdminLayout>
                    <RouteTransition>
                      <UsersPage />
                    </RouteTransition>
                  </AdminLayout>
                </RequireAdmin>
              }
            />
            <Route path="*" element={<RouteTransition><Navigate to="/" replace /></RouteTransition>} />
          </Routes>
        </Suspense>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;