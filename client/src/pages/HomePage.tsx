import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Eye, MessageSquare, ArrowRight } from 'lucide-react';
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
  <article className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
    <Link to={`/posts/${post.id}`} className="block">
      {post.coverImage && (
        <div className="aspect-video overflow-hidden">
          <OptimizedImage
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-8">
        <div className="flex items-center gap-4 mb-6">
          {post.category && (
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-1.5 rounded-full">
              {post.category.name}
            </span>
          )}
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formatDate(post.createdAt)}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-tight">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-gray-600 dark:text-gray-400 text-base mb-8 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {post.author.username.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium">{post.author.username}</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <Eye className="w-5 h-5" />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-5 h-5" />
              <span>{post.comments?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </article>
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
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-10">
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
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 border-b border-gray-100 dark:border-gray-800 py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              分享知识，连接思想
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
              一个基于 React + NestJS 的现代化博客系统，为您提供优雅的写作和阅读体验。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link
                to="/categories"
                className="px-8 py-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg hover:shadow-xl"
              >
                浏览分类
              </Link>
              <Link
                to="/tags"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium shadow-sm hover:shadow-md"
              >
                查看标签
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            最新文章
          </h2>

          <div className="space-y-10">
            {data?.posts.map((post: Post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>

          {data?.pagination.total > page * limit && (
            <div className="mt-16 text-center">
              <button
                onClick={handleLoadMore}
                className="px-8 py-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                加载更多文章
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
