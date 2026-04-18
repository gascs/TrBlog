import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Database, Server, Settings, ArrowRight, Info } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const SetupPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [dbConfig, setDbConfig] = useState({
    type: 'docker' as 'docker' | 'external',
    host: 'localhost',
    port: '5432',
    user: 'trblog',
    password: 'trblog123',
    database: 'trblog'
  });
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleDbConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDbConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleDbTypeChange = (type: 'docker' | 'external') => {
    setDbConfig(prev => ({
      ...prev,
      type,
      ...(type === 'docker' ? {
        host: 'localhost',
        port: '5432',
        user: 'trblog',
        password: 'trblog123',
        database: 'trblog'
      } : {})
    }));
  };

  const checkConnection = async () => {
    setIsChecking(true);
    setCheckResult(null);
    
    // 模拟连接检查
    setTimeout(() => {
      setCheckResult({ success: true, message: '数据库连接成功！' });
      setIsChecking(false);
    }, 1500);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // 完成设置，跳转到首页
      navigate('/');
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Helmet>
        <title>TrBlog - 首次部署设置</title>
        <meta name="description" content="TrBlog 首次部署设置向导，帮助您快速配置和启动博客系统" />
      </Helmet>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl max-w-4xl w-full p-8 md:p-12"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6"
          >
            <Settings className="w-10 h-10 text-blue-600" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">TrBlog 首次部署设置</h1>
          <p className="text-gray-600 text-lg">欢迎使用 TrBlog！请按照以下步骤完成首次部署设置。</p>
        </div>

        {/* 步骤指示器 */}
        <div className="flex justify-center mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white ${s === step ? 'bg-blue-600' : s < step ? 'bg-green-600' : 'bg-gray-300'}`}
              >
                {s < step ? <CheckCircle className="w-6 h-6" /> : s}
              </motion.div>
              {s < 3 && (
                <div className={`h-1 flex-1 mx-4 ${s < step ? 'bg-green-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* 步骤内容 */}
        <div className="space-y-8">
          {/* 步骤 1: 系统介绍 */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">系统介绍</h2>
              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">TrBlog 是什么？</h3>
                    <p className="text-gray-600">
                      TrBlog 是一个基于 React + NestJS 的现代化博客系统，为您提供优雅的写作和阅读体验。
                      它支持多种功能，包括文章管理、分类标签、用户系统、评论系统等。
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: '现代化技术栈', desc: 'React 18 + TypeScript + NestJS + PostgreSQL', icon: <Server className="w-8 h-8 text-blue-600" /> },
                  { title: '丰富的功能', desc: '文章管理、分类标签、用户系统、评论系统', icon: <Settings className="w-8 h-8 text-blue-600" /> },
                  { title: '易于部署', desc: '支持 Docker 容器化部署和外部数据库连接', icon: <Database className="w-8 h-8 text-blue-600" /> }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 步骤 2: 数据库配置 */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">数据库配置</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">数据库类型</label>
                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleDbTypeChange('docker')}
                      className={`flex-1 py-3 px-4 rounded-lg border ${dbConfig.type === 'docker' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Database className="w-5 h-5" />
                        <span>Docker 容器（推荐）</span>
                      </div>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleDbTypeChange('external')}
                      className={`flex-1 py-3 px-4 rounded-lg border ${dbConfig.type === 'external' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Server className="w-5 h-5" />
                        <span>外部数据库</span>
                      </div>
                    </motion.button>
                  </div>
                </div>

                {dbConfig.type === 'external' && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="host" className="block text-sm font-medium text-gray-700 mb-1">数据库主机</label>
                      <input
                        type="text"
                        id="host"
                        name="host"
                        value={dbConfig.host}
                        onChange={handleDbConfigChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="port" className="block text-sm font-medium text-gray-700 mb-1">数据库端口</label>
                      <input
                        type="text"
                        id="port"
                        name="port"
                        value={dbConfig.port}
                        onChange={handleDbConfigChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-1">数据库用户</label>
                      <input
                        type="text"
                        id="user"
                        name="user"
                        value={dbConfig.user}
                        onChange={handleDbConfigChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">数据库密码</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={dbConfig.password}
                        onChange={handleDbConfigChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="database" className="block text-sm font-medium text-gray-700 mb-1">数据库名称</label>
                      <input
                        type="text"
                        id="database"
                        name="database"
                        value={dbConfig.database}
                        onChange={handleDbConfigChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={checkConnection}
                        disabled={isChecking}
                        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
                      >
                        {isChecking ? (
                          <span>检查连接中...</span>
                        ) : (
                          <>
                            <Database className="w-5 h-5" />
                            <span>检查数据库连接</span>
                          </>
                        )}
                      </motion.button>
                      {checkResult && (
                        <div className={`mt-3 p-3 rounded-lg ${checkResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                          {checkResult.message}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {dbConfig.type === 'docker' && (
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Docker 配置</h3>
                    <p className="text-gray-600 mb-4">系统将自动启动一个 PostgreSQL 容器，使用以下默认配置：</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span>主机:</span> <span className="font-mono">localhost</span></div>
                      <div className="flex justify-between"><span>端口:</span> <span className="font-mono">5432</span></div>
                      <div className="flex justify-between"><span>用户:</span> <span className="font-mono">trblog</span></div>
                      <div className="flex justify-between"><span>密码:</span> <span className="font-mono">trblog123</span></div>
                      <div className="flex justify-between"><span>数据库:</span> <span className="font-mono">trblog</span></div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* 步骤 3: 完成设置 */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-8"
              >
                <CheckCircle className="w-12 h-12 text-green-600" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">设置完成！</h2>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                您的 TrBlog 博客系统已经成功配置，现在可以开始使用了。
                您可以创建管理员账户、发布文章、管理分类标签等。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: '创建账户', desc: '注册一个管理员账户', link: '/register' },
                  { title: '发布文章', desc: '开始创建您的第一篇文章', link: '/admin/posts' },
                  { title: '系统设置', desc: '配置博客系统的各项设置', link: '/admin/settings' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                    <Link
                      to={item.link}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      开始
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* 导航按钮 */}
        <div className="mt-12 flex justify-between">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePrev}
            disabled={step === 1}
            className={`py-3 px-6 rounded-lg border ${step === 1 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            上一步
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="py-3 px-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {step === 3 ? '完成' : '下一步'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SetupPage;