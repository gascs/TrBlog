import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Eye, MessageSquare, ArrowRight, Search, Clock, Heart, Star } from 'lucide-react';
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
    likeCount: 45,
    readTime: 5,
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
    likeCount: 123,
    readTime: 8,
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

const PostItem: React.FC<{ post: Post; index: number }> = ({ post, index }) => (
  <motion.article 
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    whileHover={{ y: -4 }}
    className="border-b border-gray-200 dark:border-gray-800 pb-8 last:border-b-0"
  >
    <Link to={`/posts/${post.id}`} className="block group">
      <div className="flex flex-col md:flex-row gap-6">
        {post.coverImage && (
          <div className="md:w-72 flex-shrink-0">
            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm group-hover:shadow-md transition-shadow duration-300">
              <OptimizedImage
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            {post.category && (
              <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                {post.category.name}
              </span>
            )}
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.createdAt)}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-snug">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
          )}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags?.slice(0, 3).map((tag) => (
              <span key={tag.id} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                {tag.name}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                <span>{post.views}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" />
                <span>{post.comments?.length || 0}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4" />
                <span>{post.likeCount || 0}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{post.readTime || 5} 分钟</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </motion.article>
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

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 text-white shadow-xl relative overflow-hidden mb-16"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <div className="w-full h-full bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/4" />
        </div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 opacity-10">
          <div className="w-full h-full bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 leading-tight">欢迎来到 {siteConfig.title}</h1>
          <p className="text-xl opacity-90 mb-8 max-w-2xl">{siteConfig.description}</p>
          <div className="max-w-md">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const searchTerm = e.target[0].value;
                if (searchTerm) {
                  window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
                }
              }}
              className="relative"
            >
              <input 
                type="text" 
                placeholder="搜索文章..." 
                className="w-full px-5 py-4 pl-12 rounded-xl text-gray-900 focus:outline-none focus:ring-3 focus:ring-white/30 shadow-lg transition-all duration-300"
              />
              <Search className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
            </form>
          </div>
          
          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8">
            <div className="flex flex-col">
              <div className="text-3xl font-bold">100+</div>
              <div className="text-sm opacity-80">文章</div>
            </div>
            <div className="flex flex-col">
              <div className="text-3xl font-bold">50k+</div>
              <div className="text-sm opacity-80">阅读量</div>
            </div>
            <div className="flex flex-col">
              <div className="text-3xl font-bold">10+</div>
              <div className="text-sm opacity-80">分类</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                最新文章
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                分享知识，连接思想
              </p>
            </motion.div>

            {/* Posts */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm"
            >
              {data?.posts.map((post: Post, index: number) => (
                <PostItem key={post.id} post={post} index={index} />
              ))}

              {data?.pagination.total > page * limit && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center"
                >
                  <button
                    onClick={handleLoadMore}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm font-medium inline-flex items-center gap-2"
                  >
                    加载更多
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;