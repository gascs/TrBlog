import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Database, Server, Settings, ArrowRight, Info, AlertCircle, Clock, Rocket, Shield, Code, Database as DatabaseIcon, Server as ServerIcon, Check, User, FileText } from 'lucide-react';
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
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [setupProgress, setSetupProgress] = useState(0);
  const [setupMessage, setSetupMessage] = useState('');

  // 模拟环境检查
  useEffect(() => {
    if (step === 1) {
      const checkEnv = async () => {
        setIsChecking(true);
        setCheckResult(null);
        
        // 模拟环境检查
        setTimeout(() => {
          setCheckResult({ success: true, message: '环境检查通过！' });
          setIsChecking(false);
        }, 1000);
      };
      checkEnv();
    }
  }, [step]);

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
    setCheckResult(null);
  };

  const checkConnection = async () => {
    if (!dbConfig.host || !dbConfig.port || !dbConfig.user || !dbConfig.database) {
      setCheckResult({ success: false, message: '请填写完整的数据库配置信息！' });
      return;
    }

    setIsChecking(true);
    setCheckResult(null);
    
    // 模拟连接检查
    setTimeout(() => {
      // 模拟随机失败，增加真实感
      const isSuccess = Math.random() > 0.2;
      setCheckResult({ 
        success: isSuccess, 
        message: isSuccess ? '数据库连接成功！' : '数据库连接失败，请检查配置信息。' 
      });
      setIsChecking(false);
    }, 1500);
  };

  const handleNext = async () => {
    if (step === 2 && dbConfig.type === 'external' && (!checkResult || !checkResult.success)) {
      setCheckResult({ success: false, message: '请先检查数据库连接是否成功！' });
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      // 模拟设置过程
      setIsSettingUp(true);
      setSetupProgress(0);
      setSetupMessage('正在初始化系统...');

      const progressSteps = [
        { progress: 25, message: '正在配置数据库...' },
        { progress: 50, message: '正在创建数据表...' },
        { progress: 75, message: '正在初始化系统设置...' },
        { progress: 100, message: '设置完成！' }
      ];

      for (const step of progressSteps) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSetupProgress(step.progress);
        setSetupMessage(step.message);
      }

      // 完成设置，跳转到首页
      setTimeout(() => {
        setIsSettingUp(false);
        navigate('/');
      }, 1000);
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
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-white ${s === step ? 'bg-blue-600' : s < step ? 'bg-green-600' : 'bg-gray-300'}`}
              >
                {s < step ? <CheckCircle className="w-6 h-6" /> : s}
              </motion.div>
              {s < 3 && (
                <div className={`h-2 flex-1 mx-4 rounded-full ${s < step ? 'bg-green-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
          <div className="flex justify-center mt-4 space-x-12">
            <span className={`text-sm font-medium ${step === 1 ? 'text-blue-600' : step > 1 ? 'text-green-600' : 'text-gray-500'}`}>系统检查</span>
            <span className={`text-sm font-medium ${step === 2 ? 'text-blue-600' : step > 2 ? 'text-green-600' : 'text-gray-500'}`}>数据库配置</span>
            <span className={`text-sm font-medium ${step === 3 ? 'text-blue-600' : step > 3 ? 'text-green-600' : 'text-gray-500'}`}>完成设置</span>
          </div>
        </div>

        {/* 步骤内容 */}
        <div className="space-y-8">
          {/* 步骤 1: 系统检查 */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">系统检查</h2>
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
              
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  系统要求
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Node.js', version: 'v18.0.0+', status: '已满足', icon: <Code className="w-4 h-4" /> },
                    { name: 'npm', version: 'v9.0.0+', status: '已满足', icon: <Code className="w-4 h-4" /> },
                    { name: 'Docker', version: 'v20.0.0+', status: '已满足', icon: <ServerIcon className="w-4 h-4" /> },
                    { name: 'PostgreSQL', version: 'v14.0.0+', status: '将安装', icon: <DatabaseIcon className="w-4 h-4" /> }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          {item.icon}
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">{item.name}</span>
                          <span className="text-sm text-gray-500 ml-2">({item.version})</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${item.status === '已满足' ? 'text-green-600' : 'text-amber-600'}`}>
                          {item.status}
                        </span>
                        {item.status === '已满足' && <Check className="w-4 h-4 text-green-600" />}
                      </div>
                    </div>
                  ))}
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
                    className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
              
              {isChecking && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600 animate-spin" />
                  <span className="text-gray-600">正在检查环境...</span>
                </div>
              )}
              
              {checkResult && (
                <div className={`mt-8 p-4 rounded-lg ${checkResult.success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  <div className="flex items-center gap-3">
                    {checkResult.success ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <AlertCircle className="w-6 h-6" />
                    )}
                    <span>{checkResult.message}</span>
                  </div>
                </div>
              )}
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
                  <label className="block text-sm font-medium text-gray-700 mb-3">数据库类型</label>
                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleDbTypeChange('docker')}
                      className={`flex-1 py-4 px-4 rounded-lg border-2 ${dbConfig.type === 'docker' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Database className="w-5 h-5" />
                        <span className="font-medium">Docker 容器（推荐）</span>
                      </div>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleDbTypeChange('external')}
                      className={`flex-1 py-4 px-4 rounded-lg border-2 ${dbConfig.type === 'external' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Server className="w-5 h-5" />
                        <span className="font-medium">外部数据库</span>
                      </div>
                    </motion.button>
                  </div>
                </div>

                {dbConfig.type === 'external' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="host" className="block text-sm font-medium text-gray-700 mb-1">数据库主机</label>
                      <input
                        type="text"
                        id="host"
                        name="host"
                        value={dbConfig.host}
                        onChange={handleDbConfigChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="例如: localhost 或数据库服务器 IP"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="默认为 5432"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="数据库用户名"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="数据库密码"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="数据库名称"
                      />
                    </div>
                    <div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={checkConnection}
                        disabled={isChecking}
                        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2 transition-colors"
                      >
                        {isChecking ? (
                          <>
                            <Clock className="w-5 h-5 animate-spin" />
                            <span>检查连接中...</span>
                          </>
                        ) : (
                          <>
                            <Database className="w-5 h-5" />
                            <span>检查数据库连接</span>
                          </>
                        )}
                      </motion.button>
                      {checkResult && (
                        <div className={`mt-3 p-4 rounded-lg ${checkResult.success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                          <div className="flex items-center gap-3">
                            {checkResult.success ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : (
                              <AlertCircle className="w-6 h-6" />
                            )}
                            <span>{checkResult.message}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {dbConfig.type === 'docker' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-100"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Database className="w-5 h-5 text-blue-600" />
                      Docker 配置
                    </h3>
                    <p className="text-gray-600 mb-6">系统将自动启动一个 PostgreSQL 容器，使用以下默认配置：</p>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                          <span className="font-medium text-gray-700">主机:</span> 
                          <span className="font-mono text-gray-900">localhost</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                          <span className="font-medium text-gray-700">端口:</span> 
                          <span className="font-mono text-gray-900">5432</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                          <span className="font-medium text-gray-700">用户:</span> 
                          <span className="font-mono text-gray-900">trblog</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                          <span className="font-medium text-gray-700">密码:</span> 
                          <span className="font-mono text-gray-900">trblog123</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                          <span className="font-medium text-gray-700">数据库:</span> 
                          <span className="font-mono text-gray-900">trblog</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                      <p>提示：如果您需要修改这些配置，可以在部署后编辑 <code className="bg-gray-100 px-2 py-1 rounded">.env</code> 文件。</p>
                    </div>
                  </motion.div>
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
              <AnimatePresence>
                {!isSettingUp ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { title: '创建账户', desc: '注册一个管理员账户', link: '/register', icon: <User className="w-6 h-6 text-blue-600" /> },
                        { title: '发布文章', desc: '开始创建您的第一篇文章', link: '/admin/posts', icon: <FileText className="w-6 h-6 text-blue-600" /> },
                        { title: '系统设置', desc: '配置博客系统的各项设置', link: '/admin/settings', icon: <Settings className="w-6 h-6 text-blue-600" /> }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="mb-4">{item.icon}</div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                          <Link
                            to={item.link}
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                          >
                            开始
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="py-8"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-8"
                    >
                      <Rocket className="w-12 h-12 text-blue-600 animate-pulse" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">正在完成设置...</h2>
                    <div className="max-w-md mx-auto mb-6">
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${setupProgress}%` }}
                          transition={{ duration: 0.5 }}
                          className="bg-blue-600 h-4 rounded-full"
                        />
                      </div>
                      <div className="text-center text-sm text-gray-600">
                        {setupMessage}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>请稍候，系统正在为您初始化 TrBlog 博客系统...</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
            className={`py-3 px-8 rounded-lg border ${step === 1 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors'}`}
          >
            上一步
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            disabled={isSettingUp}
            className="py-3 px-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {step === 3 ? '完成' : '下一步'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SetupPage;