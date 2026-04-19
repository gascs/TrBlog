import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Eye, MessageSquare, ArrowRight } from 'lucide-react';
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
      id: '1', name: '技术',
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
  <article className="border-b border-gray-200 dark:border-gray-800 pb-8 last:border-b-0">
    <Link to={`/posts/${post.id}`} className="block group">
      <div className="flex flex-col md:flex-row gap-6">
        {post.coverImage && (
          <div className="md:w-64 flex-shrink-0">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              <OptimizedImage
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {post.category && (
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                {post.category.name}
              </span>
            )}
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.createdAt)}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-snug">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center gap-5 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{post.comments?.length || 0}</span>
            </div>
            <span className="text-gray-500 dark:text-gray-400">
              {post.author.username}
            </span>
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
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
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

      {/* Main Content */}
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                最新文章
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                分享知识，连接思想
              </p>
            </div>

            {/* Posts */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8">
              {data?.posts.map((post: Post) => (
                <PostItem key={post.id} post={post} />
              ))}

              {data?.pagination.total > page * limit && (
                <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center">
                  <button
                    onClick={handleLoadMore}
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium inline-flex items-center gap-2"
                  >
                    加载更多
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;