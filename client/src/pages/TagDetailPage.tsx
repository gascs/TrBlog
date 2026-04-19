import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tag, Calendar, User, Eye, MessageSquare, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import { Tag as TagType, Post } from '../types';

const TagDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: tag, isLoading: tagLoading } = useQuery({
    queryKey: ['tag-detail', id],
    queryFn: async () => {
      if (!id) return null;
      const response = await api.get(`/tags/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  const { data: postsData, isLoading: postsLoading } = useQuery({
    queryKey: ['tag-posts', id],
    queryFn: async () => {
      if (!id) return null;
      const response = await api.get('/posts', { params: { tagId: id } });
      return response.data;
    },
    enabled: !!id,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (tagLoading || postsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                  <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const posts = postsData?.posts || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <Link
              to="/tags"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>返回标签列表</span>
            </Link>

            {tag && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <Tag className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{tag.name}</h1>
                    {tag.description && (
                      <p className="text-gray-600 dark:text-gray-400 mt-2">{tag.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span>{tag._count?.posts || 0} 篇文章</span>
                  </div>
                  <div className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    /{tag.slug}
                  </div>
                </div>
              </div>
            )}

            {posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map((post: Post, index: number) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <Link
                      to={`/posts/${post.id}`}
                      className="block bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-lg transition-all duration-300"
                    >
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{post.author?.username || '匿名'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          <span>{post.views || 0} 阅读</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          <span>{post.comments?.length || 0} 评论</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center"
              >
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Tag className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">该标签下暂无文章</h3>
                <p className="text-gray-600 dark:text-gray-400">还没有任何文章使用这个标签</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TagDetailPage;
