import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { 
  Calendar, 
  User, 
  MessageSquare, 
  ArrowLeft, 
  Tag, 
  Heart, 
  Share2, 
  BookOpen, 
  Eye,
  Clock,
  ChevronUp,
  MoreHorizontal
} from 'lucide-react';
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
  const [scrollProgress, setScrollProgress] = useState(0);

  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      if (!id) throw new Error('Post ID is required');
      const response = await api.get(`/posts/${id}`);
      return response.data;
    },
  });

  const pageTitle = post ? `${post.title} - TrBlog` : 'TrBlog';
  const pageDescription = post?.excerpt || (post?.content && post.content.slice(0, 150)) || '阅读精彩文章';
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '/';

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      
      // 计算阅读进度
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-dark-background dark:to-gray-900">
      {/* 阅读进度条 */}
      <motion.div 
        className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50" 
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />
      
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
      
      {/* 封面区域 */}
      {post.coverImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[50vh] md:h-[60vh] overflow-hidden"
        >
          <OptimizedImage
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
          
          {/* 封面内容 */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {post.category && (
                  <Link
                    to={`/categories/${post.category.id}`}
                    className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-semibold mb-4 hover:bg-white/30 transition-colors border border-white/30"
                  >
                    {post.category.name}
                  </Link>
                )}
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                {post.title}
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {post.author.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{post.author.username}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.createdAt).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>约 {Math.ceil(post.content.length / 500)} 分钟阅读</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{post.views} 浏览</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: post.coverImage ? 0.3 : 0 }}
        className="relative"
      >
        <div className="container mx-auto px-4 py-12">
          <div className="flex gap-8">
            {/* 侧边栏 - 仅桌面端显示 */}
            <div className="hidden lg:block w-20 flex-shrink-0">
              <div className="sticky top-24">
                {/* 返回按钮 */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  onClick={() => navigate(-1)}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white dark:bg-dark-card shadow-sm hover:shadow-md transition-all group mb-6"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">返回</span>
                </motion.button>

                {/* 互动按钮组 */}
                <div className="space-y-3">
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    onClick={handleLike}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${liked ? 'bg-red-50 dark:bg-red-900/20 shadow-md' : 'bg-white dark:bg-dark-card shadow-sm hover:shadow-md'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart className={`w-5 h-5 ${liked ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-gray-400'}`} />
                    <span className={`text-xs ${liked ? 'text-red-500 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>{likeCount}</span>
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    onClick={handleShare}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white dark:bg-dark-card shadow-sm hover:shadow-md transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">分享</span>
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white dark:bg-dark-card shadow-sm hover:shadow-md transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <BookOpen className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">收藏</span>
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white dark:bg-dark-card shadow-sm hover:shadow-md transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{post.comments?.length || 0}</span>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* 主内容区 */}
            <div className="flex-1 max-w-4xl">
              {/* 移动端返回按钮 */}
              <div className="lg:hidden mb-6">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-card rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">返回</span>
                </motion.button>
              </div>

              {/* 没有封面时显示标题 */}
              {!post.coverImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-12"
                >
                  {post.category && (
                    <Link
                      to={`/categories/${post.category.id}`}
                      className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4 hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors"
                    >
                      {post.category.name}
                    </Link>
                  )}
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                    {post.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {post.author.username.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">{post.author.username}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.createdAt).toLocaleDateString('zh-CN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>约 {Math.ceil(post.content.length / 500)} 分钟</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 文章内容 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white dark:bg-dark-card rounded-2xl shadow-sm p-6 md:p-10 lg:p-12"
              >
                <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-headings:font-bold prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-md prose-strong:text-gray-900 dark:prose-strong:text-white prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:p-6 prose-pre:rounded-xl">
                  <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>

                {/* 标签区域 */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-2 shrink-0" />
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag: { id: string; name: string }) => (
                        <Link
                          key={tag.id}
                          to={`/tags/${tag.id}`}
                          className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-850 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:from-gray-200 dark:hover:from-gray-700 transition-all hover:shadow-sm"
                        >
                          # {tag.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 移动端互动按钮 */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 lg:hidden">
                  <div className="flex justify-around">
                    <button
                      onClick={handleLike}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${liked ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'}`}
                    >
                      <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
                      <span className="text-xs">{likeCount}</span>
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex flex-col items-center gap-1 p-3 rounded-xl text-gray-600 dark:text-gray-400"
                    >
                      <Share2 className="w-6 h-6" />
                      <span className="text-xs">分享</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 p-3 rounded-xl text-gray-600 dark:text-gray-400">
                      <BookOpen className="w-6 h-6" />
                      <span className="text-xs">收藏</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 p-3 rounded-xl text-gray-600 dark:text-gray-400">
                      <MessageSquare className="w-6 h-6" />
                      <span className="text-xs">{post.comments?.length || 0}</span>
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* 评论区 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-12"
              >
                <Suspense fallback={
                  <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-sm">
                    <div className="animate-pulse">
                      <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
                      <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl mb-6"></div>
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                }>
                  {id && (
                    <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-10 shadow-sm">
                      <CommentSection postId={id} />
                    </div>
                  )}
                </Suspense>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.article>

      {/* 滚动到顶部按钮 */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-xl flex items-center justify-center hover:from-blue-600 hover:to-purple-700 transition-all z-50"
            whileHover={{ scale: 1.1, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostDetailPage;