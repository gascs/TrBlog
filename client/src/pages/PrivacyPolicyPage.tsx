import React from 'react';
import { Shield, Lock, FileText, Calendar, Database, X, CheckCircle, Server } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-10 h-10 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">隐私声明</h1>
            <p className="text-gray-600">纯本地部署版本的隐私保护说明</p>
          </div>
        </div>
        <p className="text-gray-600 mb-4">
          本隐私声明适用于 TrBlog 博客系统的纯本地部署版本，确保您了解我们如何处理您的数据。
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>最后更新：2026年4月19日</span>
        </div>
      </div>

      <div className="space-y-6">
        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Database className="w-6 h-6 text-blue-600" />
            本地存储的数据
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              所有数据仅存储在您的本地环境中：
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">文章内容</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">您创建的所有文章内容仅存储在本地数据库中</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">用户信息</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">您的用户名和密码（加密存储）仅存储在本地</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">配置信息</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">站点设置和个性化配置仅存储在本地</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">媒体文件</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">上传的图片等媒体文件仅存储在本地</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <X className="w-6 h-6 text-blue-600" />
            不收集的数据
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              我们不会收集以下类型的信息：
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <X className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">个人身份信息</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">不会收集任何可识别个人身份的信息</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <X className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">浏览历史</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">不会收集您的浏览历史或使用数据</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <X className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">设备信息</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">不会收集设备信息或位置数据</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <X className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">第三方数据</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">不会向任何第三方发送数据</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Server className="w-6 h-6 text-blue-600" />
            数据安全
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              我们采取以下措施保护您的本地数据：
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span>所有本地存储的数据均采用加密方式存储</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span>您对本地数据拥有完全的控制权</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span>您可以随时备份、导出或删除本地数据</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span>数据传输仅在本地网络内进行</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            数据使用
          </h2>
          <div className="space-y-4 text-gray-700">
            <div className="space-y-3">
              <p>
                数据仅用于以下目的：
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  <span>在本地显示和管理您的博客内容</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  <span>提供本地管理功能和用户认证</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  <span>生成本地统计数据和分析</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border-l-4 border-yellow-500">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">重要提示</h3>
              <p className="text-gray-700 dark:text-gray-300">
                数据不会用于任何分析或广告目的，也不会被分享给任何第三方。
              </p>
            </div>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            责任声明
          </h2>
          <div className="space-y-4 text-gray-700">
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border-l-4 border-red-500">
              <p>
                由于本项目为纯本地部署，您对本地数据的安全和备份负有全部责任。我们建议您定期备份数据库文件。
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">备份建议</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>定期导出数据库文件</li>
                <li>使用版本控制工具管理配置文件</li>
                <li>将备份存储在多个位置</li>
                <li>测试备份恢复流程</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            联系我们
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              如果您对本隐私声明有任何疑问，请在项目仓库中提交 Issue。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;