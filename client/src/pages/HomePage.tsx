import React, { useState, memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, MessageSquare, Eye } from 'lucide-react';
import api from '../services/api';
import { Post } from '../types';
import { SkeletonPostCard } from '../components/Skeleton';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const PostItem = memo(({ post, index }: { post: Post; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="group"
  >
    <Link to={`/posts/${post.id}`} className="block">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-8 border-b border-gray-100">
        {post.coverImage && (
          <motion.div 
            className="md:col-span-4 relative aspect-[4/3] overflow-hidden rounded-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        )}
        <div className={`flex flex-col justify-center ${post.coverImage ? 'md:col-span-8' : 'md:col-span-12'}`}>
          <div className="flex items-center gap-3 mb-3">
            {post.category && (
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                {post.category.name}
              </span>
            )}
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-gray-600 text-lg mb-4 line-clamp-2">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500">
              <User className="w-4 h-4" />
              <span className="text-sm">{post.author.username}</span>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span className="text-sm">{post.views}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">{post.comments?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </motion.article>
));

PostItem.displayName = 'PostItem';

const HomePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['posts', page, limit],
    queryFn: async () => {
      const response = await api.get('/posts', {
        params: { page, limit },
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-20">
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <SkeletonPostCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">加载失败: {error instanceof Error ? error.message : '未知错误'}</p>
          <button 
            onClick={() => refetch()} 
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            重试
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-100"
      >
        <div className="container mx-auto py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-6">
              欢迎来到 TrBlog
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              分享知识，
              <br />
              <span className="text-blue-600">连接思想</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              一个基于 React + NestJS 的现代化博客系统，为您提供优雅的写作和阅读体验。
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="container mx-auto py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">最新文章</h2>
            <p className="text-gray-500 mt-2">探索精彩内容</p>
          </div>
        </motion.div>

        <div className="space-y-1">
          {data?.posts.map((post: Post, index: number) => (
            <PostItem key={post.id} post={post} index={index} />
          ))}
        </div>

        {data?.pagination.total > page * limit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all hover:scale-105"
            >
              加载更多文章
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default memo(HomePage);