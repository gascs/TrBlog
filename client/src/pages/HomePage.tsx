import React, { useState, memo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, MessageSquare, Eye, PenTool, Home, Settings } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import api from '../services/api';
import { Post, User as UserType } from '../types';
import { SkeletonPostCard } from '../components/Skeleton';
import OptimizedImage from '../components/OptimizedImage';

// 备用模拟数据
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

const PostItem = memo(({ post, index }: { post: Post; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="group bg-white dark:bg-dark-card rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden mb-6"
  >
    <Link to={`/posts/${post.id}`} className="block">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {post.coverImage && (
          <motion.div 
            className="md:col-span-4 relative aspect-[4/3] overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <OptimizedImage
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </motion.div>
        )}
        <div className={`p-6 ${post.coverImage ? 'md:col-span-8' : 'md:col-span-12'}`}>
          <div className="flex items-center gap-3 mb-3">
            {post.category && (
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                {post.category.name}
              </span>
            )}
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-gray-600 dark:text-gray-300 text-base mb-4 line-clamp-2">
              {post.excerpt}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <User className="w-4 h-4" />
              <span>{post.author.username}</span>
            </div>
            <div className="flex items-center gap-4 text-gray-400 dark:text-gray-500">
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
  </motion.article>
));

PostItem.displayName = 'PostItem';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [user, setUser] = useState<UserType | null>(null);
  const limit = 10;
  
  const siteTitle = 'TrBlog - 分享知识，连接思想';
  const siteDescription = '一个基于 React + NestJS 的现代化博客系统，为您提供优雅的写作和阅读体验。';

  useEffect(() => {
    // 检查是否首次访问
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      // 标记为已访问
      localStorage.setItem('hasVisited', 'true');
      // 重定向到设置页面
      navigate('/setup');
      return;
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const { data, isLoading } = useQuery({
    queryKey: ['posts', page, limit],
    queryFn: async () => {
      console.log('📚 开始获取文章...');
      try {
        const response = await api.get('/posts', {
          params: { page, limit },
        }) as any;
        console.log('✅ 获取文章成功:', response.data);
        return response.data;
      } catch (err) {
        console.error('❌ 获取文章失败，使用备用数据:', err);
        // 返回备用数据
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
    retry: 1, // 减少重试次数
  });

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <SkeletonPostCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content="博客,技术,文章,知识分享,TrBlog" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "TrBlog",
            "url": "/",
            "description": siteDescription,
            "potentialAction": {
              "@type": "SearchAction",
              "target": "/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
        {/* 文章列表结构化数据 */}
        {data?.posts && data.posts.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "最新文章",
              "itemListElement": data.posts.map((post: Post, index: number) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `/posts/${post.id}`,
                "name": post.title,
                "image": post.coverImage,
                "description": post.excerpt
              }))
            })}
          </script>
        )}
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-200 relative overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8"
      >
        {/* 装饰元素 */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path fill="#3b82f6" d="M47.5,-79.1C61.3,-72.2,73.3,-58.3,79.8,-42.5C86.3,-26.7,87.2,-9.1,84.1,7.1C81,23.3,73.9,38.3,64,51.4C54,64.5,41.2,75.6,26.9,82.1C12.7,88.6,-3,88.5,-18.1,85.8C-33.1,83.1,-48.1,77.7,-59.8,68.4C-71.5,59,-79.9,45.8,-83.5,31.4C-87.2,17,-86,1.6,-82.4,-12.7C-78.8,-27,-72.8,-40.6,-64.2,-51.9C-55.7,-63.3,-44.5,-72.3,-32.1,-78.1C-19.8,-83.9,-6.3,-86.6,6.8,-86.3C19.8,-86.1,31.5,-82.9,47.5,-79.1Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                分享知识，
              </motion.span>
              <br />
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-blue-600"
              >
                连接思想
              </motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl"
            >
              一个基于 React + NestJS 的现代化博客系统，为您提供优雅的写作和阅读体验。
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      <div className="py-16">
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
    </>
  );
};

export default memo(HomePage);