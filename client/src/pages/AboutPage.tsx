import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { siteConfig } from '../config/site';
import api from '../services/api';

interface AboutData {
  id: number;
  name: string;
  bio: string;
  avatar?: string;
  location: string;
  website?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  email: string;
  stats: {
    articles: number;
    views: number;
    experience: number;
  };
}

const AboutPage: React.FC = () => {
  const { data: aboutData, isLoading, error } = useQuery<AboutData>({
    queryKey: ['about'],
    queryFn: async () => {
      try {
        const response = await api.get('/about');
        return response.data;
      } catch (error) {
        // 如果API失败，返回默认数据
        return {
          id: 1,
          name: siteConfig.author,
          bio: '我是一名热爱技术的开发者，专注于前端和后端技术栈。喜欢分享技术知识，记录学习心得，希望通过这个博客与更多志同道合的朋友交流。\n\n主要技术栈包括：React、TypeScript、Node.js、NestJS等。平时喜欢研究新技术，探索最佳实践，不断提升自己的技术水平。\n\n除了技术，我也喜欢阅读、旅行和摄影。希望通过这个博客记录生活的点滴，分享技术与生活的感悟。',
          location: '北京市海淀区',
          email: siteConfig.contact.email,
          stats: {
            articles: 100,
            views: 50000,
            experience: 5
          }
        };
      }
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 animate-pulse">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-32 flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto" />
                </div>
                <div className="flex-1">
                  <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
                  <div className="flex space-x-4 mb-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded" />
                    ))}
                  </div>
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                加载失败
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                无法加载关于我的信息，请稍后再试
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const bioParagraphs = aboutData?.bio?.split('\n\n') || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Helmet>
        <title>关于我 - {siteConfig.title}</title>
        <meta name="description" content="关于博主的个人信息和介绍" />
      </Helmet>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 mb-8 shadow-sm"
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar */}
              <div className="md:w-32 flex-shrink-0">
                {aboutData?.avatar ? (
                  <img 
                    src={aboutData.avatar} 
                    alt={aboutData.name} 
                    className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white dark:border-gray-800 shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mx-auto shadow-md">
                    {aboutData?.name.charAt(0).toUpperCase() || siteConfig.logo}
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {aboutData?.name || siteConfig.author}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {siteConfig.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {aboutData?.github && (
                    <a 
                      href={aboutData.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5" />
                      <span className="text-sm font-medium">GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {aboutData?.twitter && (
                    <a 
                      href={aboutData.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                      <span className="text-sm font-medium">Twitter</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {aboutData?.linkedin && (
                    <a 
                      href={aboutData.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span className="text-sm font-medium">LinkedIn</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {aboutData?.website && (
                    <a 
                      href={aboutData.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      aria-label="Website"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span className="text-sm font-medium">Website</span>
                    </a>
                  )}
                  <a 
                    href={`mailto:${aboutData?.email || siteConfig.contact.email}`} 
                    className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="text-sm font-medium">Email</span>
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                  <span>{aboutData?.location || '北京市海淀区'}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 mb-8 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              关于我
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              {bioParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {aboutData?.stats?.articles || 100}+
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                文章数
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {aboutData?.stats?.views || 50}k+
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                阅读量
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {aboutData?.stats?.experience || 5}+
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                年经验
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;