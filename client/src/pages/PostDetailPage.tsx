import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Calendar, User, MessageSquare, ArrowLeft, Tag, Heart, Share2, BookOpen, Eye } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import api from '../services/api';
import { SkeletonDetail } from '../components/Skeleton';
import OptimizedImage from '../components/OptimizedImage';

const CommentSection = lazy(() => import('../components/CommentSection'));

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      if (!id) throw new Error('Post ID is required');
      const response = await api.get(`/posts/${id}`);
      return response.data;
    },
  });



  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-20">
          <SkeletonDetail />
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">加载失败: {error instanceof Error ? error.message : '未知错误'}</p>
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </button>
        </div>
      </div>
    );
  }

  const pageTitle = post ? `${post.title} - TrBlog` : 'TrBlog';
  const pageDescription = post?.excerpt || post?.content.slice(0, 150) || '阅读精彩文章';
  const currentUrl = window.location.href;

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title || '',
        text: post?.excerpt || '',
        url: currentUrl
      });
    } else {
      navigator.clipboard.writeText(currentUrl);
      alert('链接已复制到剪贴板！');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={post?.tags?.map((t: { name: string }) => t.name).join(',') || '博客,文章'} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        {post?.coverImage && <meta property="og:image" content={post.coverImage} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        {post?.coverImage && <meta name="twitter:image" content={post.coverImage} />}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post?.title,
            "description": pageDescription,
            "author": {
              "@type": "Person",
              "name": post?.author?.username
            },
            "datePublished": post?.createdAt,
            "dateModified": post?.updatedAt,
            "image": post?.coverImage,
            "wordCount": post?.content?.length || 0,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": currentUrl
            },
            "publisher": {
              "@type": "Organization",
              "name": "TrBlog",
              "logo": {
                "@type": "ImageObject",
                "url": "/vite.svg",
                "width": 100,
                "height": 100
              }
            },
            "commentCount": 0,
            "interactionStatistic": {
              "@type": "InteractionCounter",
              "interactionType": "https://schema.org/CommentAction",
              "userInteractionCount": 0
            }
          })}
        </script>
        {/* 面包屑导航结构化数据 */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "首页",
                "item": "/"
              },
              post?.category && {
                "@type": "ListItem",
                "position": 2,
                "name": post.category.name,
                "item": `/categories/${post.category.id}`
              },
              {
                "@type": "ListItem",
                "position": post?.category ? 3 : 2,
                "name": post?.title,
                "item": currentUrl
              }
            ].filter(Boolean)
          })}
        </script>
      </Helmet>
      <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </button>

          <div className="mb-8">
            {post.category && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  to={`/categories/${post.category.id}`}
                  className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4 hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors"
                >
                  {post.category.name}
                </Link>
              </motion.div>
            )}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              {post.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400 mb-6"
            >
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{post.author.username}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(post.createdAt).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <span>{post.comments?.length || 0} 评论</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span>{post.views} 浏览</span>
              </div>
            </motion.div>
            
            {/* 互动按钮 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${liked ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                <span>{likeCount}</span>
              </motion.button>
              <motion.button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-5 h-5" />
                <span>分享</span>
              </motion.button>
              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen className="w-5 h-5" />
                <span>收藏</span>
              </motion.button>
            </motion.div>
          </div>

          {post.coverImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12 rounded-2xl overflow-hidden shadow-xl"
            >
              <OptimizedImage
                src={post.coverImage}
                alt={post.title}
                className="w-full h-64 md:h-80 lg:h-96 object-cover"
              />
            </motion.div>
          )}

          <div className="prose prose-lg max-w-none mb-12 prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <div className="mb-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="w-5 h-5 text-gray-400 mr-2 shrink-0" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: { id: string; name: string }) => (
                  <Link
                    key={tag.id}
                    to={`/tags/${tag.id}`}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Suspense fallback={<div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="animate-pulse">
              <div className="h-8 w-32 bg-gray-200 rounded mb-6"></div>
              <div className="h-40 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-40 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>}>
            {id && <CommentSection postId={id} />}
          </Suspense>
        </div>
      </div>
    </motion.article>

    {/* 滚动到顶部按钮 */}
    <AnimatePresence>
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
    </div>
  );
};

export default PostDetailPage;