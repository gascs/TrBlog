import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tag, FileText } from 'lucide-react';
import api from '../services/api';
import { Tag as TagType } from '../types';

const TagsPage: React.FC = () => {
  const { data: tags, isLoading } = useQuery({
    queryKey: ['tags-page'],
    queryFn: async () => {
      const response = await api.get('/tags');
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-8" />
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded-full w-24" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Tag className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">标签</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">浏览所有文章标签</p>
          </div>

          {tags?.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {tags.map((tag: TagType, index: number) => (
                <motion.div
                  key={tag.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <Link to={`/tags/${tag.id}`} className="block">
                    <div className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 px-6 py-4 hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg">
                          <Tag className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {tag.name}
                          </h2>
                          <div className="flex items-center gap-1 mt-1">
                            <FileText className="w-3 h-3 text-gray-400" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {tag._count?.posts || 0} 篇文章
                            </span>
                          </div>
                        </div>
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
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">暂无标签</h3>
              <p className="text-gray-600 dark:text-gray-400">还没有创建任何文章标签</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TagsPage;
