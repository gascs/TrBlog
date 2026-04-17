import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { Category, Tag } from '../types';
import { Skeleton, SkeletonText } from './Skeleton';

const Sidebar: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const [categoriesResponse, tagsResponse] = await Promise.all([
          api.get('/categories'),
          api.get('/tags'),
        ]);
        setCategories(categoriesResponse.data);
        setTags(tagsResponse.data);
      } catch (error) {
        console.error('Error fetching categories and tags:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndTags();
  }, []);

  if (loading) {
    return (
      <aside className="w-64 border-r border-gray-200 bg-white dark:bg-dark-background p-6">
        <div className="mb-8">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-10" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-8 px-4 rounded-full" />
            ))}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-64 border-r border-gray-200 dark:border-dark-border bg-white dark:bg-dark-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* 搜索框 */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索文章..."
              className="w-full px-4 py-2 pl-10 bg-gray-50 dark:bg-dark-muted border border-gray-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* 分类 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            分类
          </h2>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <motion.li
                key={category.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  to={`/categories/${category.id}`}
                  className="flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-muted transition-all group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">{category.name}</span>
                  <span className="text-xs font-medium bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
                    {category._count?.posts || 0}
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* 标签 */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              />
            </svg>
            标签
          </h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <motion.div
                key={tag.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  to={`/tags/${tag.id}`}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-dark-border text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-primary hover:text-white dark:hover:bg-primary-dark transition-all"
                >
                  {tag.name} <span className="opacity-75">({tag._count?.posts || 0})</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </aside>
  );
};

export default Sidebar;
