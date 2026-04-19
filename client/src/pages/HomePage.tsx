import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Eye, MessageSquare, ArrowRight, TrendingUp, BookOpen, Tag } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import api from '../services/api';
import { Post } from '../types';
import { SkeletonPostCard } from '../components/Skeleton';
import OptimizedImage from '../components/OptimizedImage';
import { siteConfig } from '../config/site';

const fallbackPosts: Post[] = [
  {
    id: '1',
    title: '欢迎使用 TrBlog',
    slug: 'welcome-to-trblog',
    content: '# 欢迎使用 TrBlog\n\n这是一个基于 React + NestJS 的博客系统。',
    excerpt: '这是一个基于 React + NestJS 的博客系统，包含文章管理、评论系统、用户认证等功能。',
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20blog%20website%20header%20with%20code%20and%20technology&image_size=landscape_16_9',
    published: true,
    views: 123,
    authorId: '1',
    categoryId: '1',
    author: {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      role: 'ADMIN',
      createdAt: '2026-04-01T00:00:00Z',
      updatedAt: '2026-04-01T00:00:00Z'
    },
    category: {
      id: '1',
      name: '技术',
      slug: 'technology'
    },
    tags: [
      { id: '1', name: 'React', slug: 'react' },
      { id: '2', name: 'NestJS', slug: 'nestjs' }
    ],
    comments: [],
    createdAt: '2026-04-17T00:00:00Z',
    updatedAt: '2026-04-17T00:00:00Z'
  },
  {
    id: '2',
    title: 'TypeScript 入门指南',
    slug: 'typescript-getting-started',
    content: '# TypeScript 入门指南\n\nTypeScript 是 JavaScript 的超集，添加了类型系统。',
    excerpt: 'TypeScript 是 JavaScript 的超集，添加了类型系统，使代码更加健壮。',
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=typescript%20code%20on%20dark%20background&image_size=landscape_16_9',
    published: true,
    views: 456,
    authorId: '1',
    categoryId: '1',
    author: {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      role: 'ADMIN',
      createdAt: '2026-04-01T00:00:00Z',
      updatedAt: '2026-04-01T00:00:00Z'
    },
    category: {
      id: '1',
      name: '技术',
      slug: 'technology'
    },
    tags: [
      { id: '3', name: 'TypeScript', slug: 'typescript' },
      { id: '4', name: '前端', slug: 'frontend' }
    ],
    comments: [],
    createdAt: '2026-04-16T00:00:00Z',
    updatedAt: '2026-04-16T00:00:00Z'
  }
];

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const PostItem: React.FC<{ post: Post }> = ({ post }) => (
  <article className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
    <Link to={`/posts/${post.id}`} className="block">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {post.coverImage && (
          <div className="md:col-span-1 overflow-hidden rounded-2xl">
            <OptimizedImage
              src={post.coverImage}
              alt={post.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        )}
        <div className={`p-6 ${post.coverImage ? 'md:col-span-2' : 'md:col-span-3'}`}>
          <div className="flex items-center gap-3 mb-4">
            {post.category && (
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full">
                {post.category.name}
              </span>
            )}
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.createdAt)}
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors leading-tight">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                {post.author.username.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                {post.author.username}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{post.views}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                <span>{post.comments?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </article>
);

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}> = ({ icon, title, description, link }) => (
  <Link to={link} className="group">
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-900">
      <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <div className="text-indigo-600 dark:text-indigo-400">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  </Link>
);

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
      navigate('/setup');
    }
  }, [navigate]);

  const { data, isLoading } = useQuery({
    queryKey: ['posts', page, limit],
    queryFn: async () => {
      try {
        const response = await api.get('/posts', {
          params: { page, limit },
        }) as any;
        return response.data;
      } catch (err) {
        return {
          posts: fallbackPosts,
          pagination: {
            total: fallbackPosts.length,
            page: 1,
            limit: 10,
            totalPages: 1
          }
        };
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto space-y-8">
          {[1, 2, 3].map((i) => (
            <SkeletonPostCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{siteConfig.title} - 分享知识，连接思想</title>
        <meta name="description" content={siteConfig.description} />
        <meta name="keywords" content={siteConfig.keywords.join(',')} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5"></div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              分享知识，<span className="text-indigo-600 dark:text-indigo-400">连接思想</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-3xl mx-auto">
              一个基于 React + NestJS 的现代化博客系统，为您提供优雅的写作和阅读体验。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/categories"
                className="px-6 py-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-lg hover:shadow-xl"
              >
                浏览文章
              </Link>
              <Link
                to="/tags"
                className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium shadow-sm hover:shadow-md"
              >
                探索标签
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<TrendingUp className="w-6 h-6" />}
                title="最新文章"
                description="浏览最新发布的技术文章和教程，获取前沿知识"
                link="/"
              />
              <FeatureCard
                icon={<BookOpen className="w-6 h-6" />}
                title="分类浏览"
                description="按照不同分类浏览文章，快速找到感兴趣的内容"
                link="/categories"
              />
              <FeatureCard
                icon={<Tag className="w-6 h-6" />}
                title="标签系统"
                description="通过标签系统发现相关主题的文章"
                link="/tags"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                最新文章
              </h2>
              <Link
                to="/categories"
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                查看全部 →
              </Link>
            </div>

            <div className="space-y-8">
              {data?.posts.map((post: Post) => (
                <PostItem key={post.id} post={post} />
              ))}
            </div>

            {data?.pagination.total > page * limit && (
              <div className="mt-12 text-center">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-medium shadow-sm hover:shadow-md inline-flex items-center gap-2"
                >
                  加载更多
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
