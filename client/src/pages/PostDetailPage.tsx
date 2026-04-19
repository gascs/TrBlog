import React, { useState, useEffect, useRef, lazy, Suspense, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Calendar, 
  MessageSquare, 
  ArrowLeft, 
  Tag, 
  Heart, 
  Share2, 
  BookOpen, 
  Eye,
  Clock,
  ChevronUp,
  Twitter,
  Linkedin,
  Copy,
  Check,
  Hash,
  BookMarked,
  MessageCircle,
  Zap
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import api from '../services/api';
import { SkeletonDetail } from '../components/Skeleton';
import OptimizedImage from '../components/OptimizedImage';

const CommentSection = lazy(() => import('../components/CommentSection'));

// 相关文章模拟数据
const relatedPosts = [
  {
    id: '2',
    title: 'TypeScript 高级类型技巧详解',
    excerpt: '深入理解 TypeScript 的高级类型系统，包括条件类型、映射类型等...',
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20programming%20code%20on%20dark%20background%20with%20TypeScript&image_size=landscape_16_9',
    createdAt: '2026-04-15'
  },
  {
    id: '3',
    title: 'React 18 新特性完全指南',
    excerpt: '探索 React 18 带来的并发特性、Suspense 改进和其他新功能...',
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=react%2018%20logo%20and%20modern%20UI%20components&image_size=landscape_16_9',
    createdAt: '2026-04-10'
  },
  {
    id: '4',
    title: '前端性能优化实战',
    excerpt: '从网络请求到渲染优化，全面提升前端应用性能的最佳实践...',
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=performance%20optimization%20dashboard%20with%20charts&image_size=landscape_16_9',
    createdAt: '2026-04-05'
  }
];

// 提取标题生成目录
const extractHeadings = (content: string) => {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: { level: number; text: string; id: string }[] = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-').replace(/^-|-$/g, '');
    headings.push({ level, text, id });
  }
  
  return headings;
};

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeHeading, setActiveHeading] = useState<string>('');
  const [showToc, setShowToc] = useState(true);
  const headingsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      if (!id) throw new Error('Post ID is required');
      const response = await api.get(`/posts/${id}`) as any;
      return response.data;
    },
  });

  // 提取目录
  const headings = useMemo(() => {
    if (post?.content) {
      return extractHeadings(post.content);
    }
    return [];
  }, [post?.content]);

  const pageTitle = post ? `${post.title} - TrBlog` : 'TrBlog';
  const pageDescription = post?.excerpt || (post?.content && post.content.slice(0, 150)) || '阅读精彩文章';
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '/';

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };



  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToHeading = (id: string) => {
    const element = headingsRef.current[id];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

      // 检测当前可见的标题
      const scrollPosition = window.scrollY + 150;
      let currentHeading = '';
      
      for (const heading of headings) {
        const element = headingsRef.current[heading.id];
        if (element && element.offsetTop <= scrollPosition) {
          currentHeading = heading.id;
        }
      }
      
      setActiveHeading(currentHeading);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto py-20">
          <SkeletonDetail />
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">😵</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">加载失败</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{error instanceof Error ? error.message : '未知错误'}</p>
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            返回上一页
          </button>
        </motion.div>
      </div>
    );
  }

  // 自定义 Markdown 组件
  const MarkdownComponents = {
    h1: ({ children, ...props }: any) => {
      const id = children?.toString().toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-').replace(/^-|-$/g, '');
      return (
        <h1 
          id={id}
          ref={(el: any) => { if (id) headingsRef.current[id] = el; }}
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-12 mb-6 pb-4 border-b-2 border-gradient-to-r from-blue-500 to-purple-500"
          {...props}
        >
          <span className="flex items-center gap-3">
            <Hash className="w-8 h-8 text-blue-500" />
            {children}
          </span>
        </h1>
      );
    },
    h2: ({ children, ...props }: any) => {
      const id = children?.toString().toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-').replace(/^-|-$/g, '');
      return (
        <h2 
          id={id}
          ref={(el: any) => { if (id) headingsRef.current[id] = el; }}
          className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-5 flex items-center gap-3"
          {...props}
        >
          <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></span>
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }: any) => {
      const id = children?.toString().toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-').replace(/^-|-$/g, '');
      return (
        <h3 
          id={id}
          ref={(el: any) => { if (id) headingsRef.current[id] = el; }}
          className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-4"
          {...props}
        >
          {children}
        </h3>
      );
    },
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : 'text';
      
      if (inline) {
        return (
          <code 
            className="inline-block px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-md text-sm font-mono"
            {...props}
          >
            {children}
          </code>
        );
      }
      
      return (
        <div className="my-6 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-850 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <span className="flex gap-1.5">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-mono ml-3">{language}</span>
            </div>
            <button 
              onClick={() => navigator.clipboard.writeText(String(children))}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <pre className="p-6 bg-gray-900 dark:bg-gray-950 overflow-x-auto">
            <code className="text-sm text-gray-100 font-mono" {...props}>
              {children}
            </code>
          </pre>
        </div>
      );
    },
    blockquote: ({ children, ...props }: any) => (
      <blockquote className="relative my-8 pl-6 pr-4 py-5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-l-4 border-blue-500 rounded-r-xl" {...props}>
        <div className="absolute top-4 left-2 text-4xl text-blue-300 dark:text-blue-700 opacity-50">"</div>
        <div className="relative z-10 text-gray-700 dark:text-gray-300 italic leading-relaxed">
          {children}
        </div>
      </blockquote>
    ),
    ul: ({ children, ...props }: any) => (
      <ul className="my-6 space-y-3" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol className="my-6 space-y-3" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: any) => (
      <li className="flex items-start gap-3" {...props}>
        <span className="w-2 h-2 mt-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex-shrink-0"></span>
        <span className="text-gray-700 dark:text-gray-300">{children}</span>
      </li>
    ),
    a: ({ children, href, ...props }: any) => (
      <a 
        href={href} 
        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium underline-offset-4 hover:underline transition-colors"
        target={href?.startsWith('http') ? '_blank' : '_self'}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : ''}
        {...props}
      >
        {children}
      </a>
    ),
    img: ({ src, alt }: any) => (
      <figure className="my-8">
        <OptimizedImage 
          src={src} 
          alt={alt} 
          className="w-full rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        />
        {alt && <figcaption className="text-center text-gray-500 dark:text-gray-400 text-sm mt-3">{alt}</figcaption>}
      </figure>
    ),
    table: ({ children, ...props }: any) => (
      <div className="my-8 overflow-x-auto">
        <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-xl shadow-lg" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }: any) => (
      <thead className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30" {...props}>
        {children}
      </thead>
    ),
    th: ({ children, ...props }: any) => (
      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700" {...props}>
        {children}
      </td>
    ),
    p: ({ children, ...props }: any) => (
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg" {...props}>
        {children}
      </p>
    ),
    strong: ({ children, ...props }: any) => (
      <strong className="text-gray-900 dark:text-white font-semibold" {...props}>
        {children}
      </strong>
    ),
    hr: () => (
      <hr className="my-10 border-t-2 border-dashed border-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700" />
    )
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
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
      </Helmet>
      
      {/* 封面区域 */}
      {post.coverImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[60vh] md:h-[70vh] overflow-hidden"
        >
          <OptimizedImage
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          
          {/* 装饰元素 */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
          
          {/* 封面内容 */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {post.category && (
                  <Link
                    to={`/categories/${post.category.id}`}
                    className="inline-block px-5 py-2 bg-white/20 backdrop-blur-lg text-white rounded-full text-sm font-semibold mb-6 hover:bg-white/30 transition-all border border-white/40 shadow-lg"
                  >
                    {post.category.name}
                  </Link>
                )}
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl"
              >
                {post.title}
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center gap-6 text-white/90"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {post.author.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{post.author.username}</p>
                    <p className="text-sm text-white/70">作者</p>
                  </div>
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
                  <Clock className="w-5 h-5" />
                  <span>约 {Math.ceil(post.content.length / 500)} 分钟阅读</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
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
        transition={{ duration: 0.6, delay: post.coverImage ? 0.5 : 0 }}
        className="relative"
      >
        <div className="container mx-auto px-4 py-12">
          <div className="flex gap-12">
            {/* 左侧侧边栏 - 目录 */}
            <div className="hidden xl:block w-72 flex-shrink-0">
              <div className="sticky top-24">
                {/* 目录 */}
                {headings.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6"
                  >
                    <button 
                      onClick={() => setShowToc(!showToc)}
                      className="flex items-center justify-between w-full mb-4"
                    >
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <BookMarked className="w-5 h-5 text-blue-500" />
                        目录
                      </h3>
                    </button>
                    <AnimatePresence>
                      {showToc && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <nav className="space-y-1">
                            {headings.map((heading) => (
                              <button
                                key={heading.id}
                                onClick={() => scrollToHeading(heading.id)}
                                className={`w-full text-left px-4 py-2 rounded-lg transition-all text-sm ${
                                  activeHeading === heading.id
                                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 font-medium'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                                style={{ paddingLeft: `${heading.level * 12 + 16}px` }}
                              >
                                <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 ${
                                  activeHeading === heading.id ? 'bg-blue-500' : 'bg-gray-400'
                                }`}></span>
                                {heading.text}
                              </button>
                            ))}
                          </nav>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* 返回按钮 */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-3 w-full p-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all mb-4"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <ArrowLeft className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">返回文章列表</span>
                </motion.button>

                {/* 互动按钮组 */}
                <div className="space-y-3">
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    onClick={handleLike}
                    className={`flex items-center gap-3 w-full p-4 rounded-xl transition-all shadow-lg ${liked ? 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30' : 'bg-white dark:bg-gray-800 hover:shadow-xl'}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${liked ? 'bg-gradient-to-r from-red-500 to-pink-500' : 'bg-gray-100 dark:bg-gray-700'}`}>
                      <Heart className={`w-5 h-5 ${liked ? 'text-white fill-current' : 'text-gray-600 dark:text-gray-400'}`} />
                    </div>
                    <div className="text-left">
                      <p className={`font-semibold ${liked ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>{likeCount}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">点赞</p>
                    </div>
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                    onClick={handleCopyLink}
                    className="flex items-center gap-3 w-full p-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${copied ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-100 dark:bg-gray-700'}`}>
                      {copied ? <Check className="w-5 h-5 text-white" /> : <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-700 dark:text-gray-300">{copied ? '已复制！' : '复制链接'}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">分享给朋友</p>
                    </div>
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.0 }}
                    className="flex items-center gap-3 w-full p-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-700 dark:text-gray-300">收藏</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">稍后阅读</p>
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* 主内容区 */}
            <div className="flex-1 max-w-4xl">
              {/* 移动端返回按钮 */}
              <div className="xl:hidden mb-6">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">返回</span>
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
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10 lg:p-12 border border-gray-100 dark:border-gray-700"
              >
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={MarkdownComponents}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>

                {/* 标签区域 */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <Tag className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-2 shrink-0" />
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag: { id: string; name: string }) => (
                        <Link
                          key={tag.id}
                          to={`/tags/${tag.id}`}
                          className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-750 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:from-gray-200 dark:hover:from-gray-600 transition-all hover:shadow-md"
                        >
                          # {tag.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* 分享区域 */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-750 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Share2 className="w-5 h-5 text-blue-500" />
                      分享这篇文章
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors">
                        <Twitter className="w-4 h-4" />
                        Twitter
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl transition-colors">
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </button>
                      <button 
                        onClick={handleCopyLink}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded-xl transition-colors"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? '已复制' : '复制链接'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 移动端互动按钮 */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 xl:hidden">
                  <div className="flex justify-around bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
                    <button
                      onClick={handleLike}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${liked ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'}`}
                    >
                      <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
                      <span className="text-xs font-medium">{likeCount}</span>
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="flex flex-col items-center gap-1 p-3 rounded-xl text-gray-600 dark:text-gray-400"
                    >
                      {copied ? <Check className="w-6 h-6 text-green-500" /> : <Copy className="w-6 h-6" />}
                      <span className="text-xs font-medium">{copied ? '已复制' : '复制'}</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 p-3 rounded-xl text-gray-600 dark:text-gray-400">
                      <BookOpen className="w-6 h-6" />
                      <span className="text-xs font-medium">收藏</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 p-3 rounded-xl text-gray-600 dark:text-gray-400">
                      <MessageSquare className="w-6 h-6" />
                      <span className="text-xs font-medium">{post.comments?.length || 0}</span>
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* 相关文章推荐 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-16"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">相关推荐</h2>
                  <Zap className="w-5 h-5 text-yellow-500" />
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost, index) => (
                    <motion.div
                      key={relatedPost.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
                      onClick={() => navigate(`/posts/${relatedPost.id}`)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <OptimizedImage
                          src={relatedPost.coverImage}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                      <div className="p-5">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          {new Date(relatedPost.createdAt).toLocaleDateString('zh-CN')}
                        </p>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* 评论区 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="mt-16"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">评论</h2>
                  <MessageCircle className="w-5 h-5 text-green-500" />
                </div>
                
                <Suspense fallback={
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                    <div className="animate-pulse space-y-6">
                      <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex gap-4">
                            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                            <div className="flex-1">
                              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                }>
                  {id && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-10 shadow-lg">
                      <CommentSection postId={id} />
                    </div>
                  )}
                </Suspense>
              </motion.div>
            </div>

            {/* 右侧边栏 - 只在大屏幕显示 */}
            <div className="hidden 2xl:block w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* 作者信息 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                      {post.author.username.charAt(0).toUpperCase()}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{post.author.username}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">作者</p>
                    <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
                      + 关注
                    </button>
                  </div>
                </motion.div>

                {/* 文章统计 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
                >
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-blue-500" />
                    文章统计
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">浏览量</span>
                      <span className="font-bold text-gray-900 dark:text-white">{post.views}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">评论数</span>
                      <span className="font-bold text-gray-900 dark:text-white">{post.comments?.length || 0}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">阅读时间</span>
                      <span className="font-bold text-gray-900 dark:text-white">{Math.ceil(post.content.length / 500)} 分钟</span>
                    </div>
                  </div>
                </motion.div>
              </div>
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
