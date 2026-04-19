import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';

const HomePage = lazy(() => import('./pages/HomePage'));
const PostDetailPage = lazy(() => import('./pages/PostDetailPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const SetupPage = lazy(() => import('./pages/SetupPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const OpenSourcePage = lazy(() => import('./pages/OpenSourcePage'));
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const CategoryDetailPage = lazy(() => import('./pages/CategoryDetailPage'));
const TagsPage = lazy(() => import('./pages/TagsPage'));
const TagDetailPage = lazy(() => import('./pages/TagDetailPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminPostsPage = lazy(() => import('./pages/admin/PostsPage'));
const AdminEditPostPage = lazy(() => import('./pages/admin/EditPostPage'));
const AdminCategoriesPage = lazy(() => import('./pages/admin/CategoriesPage'));
const AdminTagsPage = lazy(() => import('./pages/admin/TagsPage'));
const AdminUsersPage = lazy(() => import('./pages/admin/UsersPage'));
const AdminSiteSettingsPage = lazy(() => import('./pages/admin/SiteSettingsPage'));
const AdminMigrationPage = lazy(() => import('./pages/admin/MigrationPage'));

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
  </div>
);

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Pages without Layout */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/setup" element={<SetupPage />} />

            {/* Pages with Layout */}
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/posts/:id" element={<Layout><PostDetailPage /></Layout>} />
            <Route path="/search" element={<Layout><SearchPage /></Layout>} />
            <Route path="/categories" element={<Layout><CategoriesPage /></Layout>} />
            <Route path="/categories/:id" element={<Layout><CategoryDetailPage /></Layout>} />
            <Route path="/tags" element={<Layout><TagsPage /></Layout>} />
            <Route path="/tags/:id" element={<Layout><TagDetailPage /></Layout>} />
            <Route path="/privacy" element={<Layout><PrivacyPolicyPage /></Layout>} />
            <Route path="/open-source" element={<Layout><OpenSourcePage /></Layout>} />
            <Route path="/disclaimer" element={<Layout><DisclaimerPage /></Layout>} />
            <Route path="/about" element={<Layout><AboutPage /></Layout>} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/posts" element={<AdminLayout><AdminPostsPage /></AdminLayout>} />
            <Route path="/admin/posts/new" element={<AdminLayout><AdminEditPostPage /></AdminLayout>} />
            <Route path="/admin/posts/edit/:id" element={<AdminLayout><AdminEditPostPage /></AdminLayout>} />
            <Route path="/admin/categories" element={<AdminLayout><AdminCategoriesPage /></AdminLayout>} />
            <Route path="/admin/tags" element={<AdminLayout><AdminTagsPage /></AdminLayout>} />
            <Route path="/admin/users" element={<AdminLayout><AdminUsersPage /></AdminLayout>} />
            <Route path="/admin/settings" element={<AdminLayout><AdminSiteSettingsPage /></AdminLayout>} />
            <Route path="/admin/migration" element={<AdminLayout><AdminMigrationPage /></AdminLayout>} />
            
            <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
          </Routes>
        </Suspense>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
