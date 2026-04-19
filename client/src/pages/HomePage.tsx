import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Eye, MessageSquare, ArrowRight, Clock, Heart, Star, Play, Pause } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import api from '../services/api';
import { Post } from '../types';
import { SkeletonPostCard } from '../components/Skeleton';
import OptimizedImage from '../components/OptimizedImage';
import Typewriter from '../components/Typewriter';
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
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="border-b border-gray-200 dark:border-gray-800 pb-8 last:border-b-0"
  >
    <Link to={`/posts/${post.id}`} className="block group">
      {post.coverImage && (
        <div className="mb-4">
          <div className="aspect-[16/9] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <OptimizedImage
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          </div>
        </div>
      )}
      <div>
        <div className="flex items-center gap-3 mb-3">
          {post.category && (
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full">
              {post.category.name}
            </span>
          )}
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formatDate(post.createdAt)}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors leading-tight">
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
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
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
          <div className="flex items-center gap-1.5 ml-auto">
            <Clock className="w-4 h-4" />
            <span>{post.readTime || 5} 分钟</span>
          </div>
        </div>
      </div>
    </Link>
  </motion.article>
);

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [typewriterEnabled, setTypewriterEnabled] = useState(true); // 默认开启
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
        className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-16 mb-12"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {typewriterEnabled ? (
                  <Typewriter 
                    text={siteConfig.title} 
                    speed={150} 
                    className="inline-block"
                  />
                ) : (
                  <span>{siteConfig.title}</span>
                )}
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto leading-relaxed">
                {typewriterEnabled ? (
                  <Typewriter 
                    text={siteConfig.description} 
                    speed={80} 
                    delay={1000} 
                    className="inline-block"
                  />
                ) : (
                  <span>{siteConfig.description}</span>
                )}
              </p>
              

            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                最新文章
              </h1>
              <div className="w-16 h-1 bg-indigo-500 rounded-full mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                分享知识，连接思想
              </p>
            </motion.div>

            {/* Posts */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              {data?.posts.map((post: Post, index: number) => (
                <PostItem key={post.id} post={post} index={index} />
              ))}

              {data?.pagination.total > page * limit && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="pt-8 text-center"
                >
                  <button
                    onClick={handleLoadMore}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-sm font-medium inline-flex items-center gap-2"
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