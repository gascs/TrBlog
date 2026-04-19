import React from 'react';
import { Shield, FileText, Calendar, Database, X, CheckCircle, Server, Globe, Lock, Activity } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold">隐私政策</h1>
            <p className="text-blue-100 text-lg">TrBlog 博客系统隐私保护说明</p>
          </div>
        </div>
        <p className="text-blue-100 mb-4 max-w-3xl">
          本文档说明 TrBlog 博客系统如何收集、使用和保护您的信息。请仔细阅读本隐私政策。
        </p>
        <div className="flex items-center gap-2 text-blue-200">
          <Calendar className="w-4 h-4" />
          <span>最后更新：2026年4月19日</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* 数据收集说明 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Database className="w-6 h-6 text-blue-600" />
            信息收集与存储
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="text-lg">TrBlog 系统收集和存储以下类型的信息：</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">文章与内容</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">您创建的所有文章、页面、Markdown 文件及相关媒体内容</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">用户账户</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">用户名、加密密码、电子邮件等账户信息</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">访问日志</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">IP 地址、浏览器信息、访问时间等访问记录</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">网站配置</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">站点设置、主题配置、插件设置等个性化配置</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Markdown 文件说明 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-600" />
            Markdown 文件处理
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="text-lg">关于 Markdown 文件的处理说明：</p>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span><strong>文件存储：</strong>Markdown 内容以安全的方式存储在本地数据库中</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span><strong>内容渲染：</strong>系统会安全地渲染 Markdown 内容，防止 XSS 攻击</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span><strong>版本控制：</strong>支持文章版本历史，方便回退和恢复</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span><strong>导出功能：</strong>您可以随时导出 Markdown 源文件进行备份</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 不收集的数据 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <X className="w-6 h-6 text-red-600" />
            不收集与不分享的信息
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="text-lg">我们承诺不会收集和分享以下信息：</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800">
                <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">不分享数据</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">不会向任何第三方出售或分享您的数据</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800">
                <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">不追踪用户</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">不会在您的网站上添加追踪代码或分析脚本</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800">
                <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">不外传内容</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">您的文章内容仅在您的网站上展示</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800">
                <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">不使用分析</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">不使用任何第三方数据分析服务</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 数据安全 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6 text-green-600" />
            数据安全保护
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="text-lg">我们采取以下措施保护您的数据安全：</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">密码加密</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">使用 bcrypt 等安全算法加密存储用户密码</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">XSS 防护</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">内容渲染时进行 XSS 过滤，防止恶意脚本注入</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">访问控制</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">基于角色的访问控制系统，确保数据安全</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">本地存储</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">所有数据存储在您控制的服务器上</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 访问记录说明 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-orange-600" />
            访问日志与统计
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="text-lg">关于访问记录和统计的说明：</p>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-100 dark:border-orange-800">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span><strong>访问统计：</strong>系统会记录页面浏览量、访问时间等统计信息</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span><strong>设备信息：</strong>记录浏览器类型、设备类型等信息，用于优化用户体验</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span><strong>IP 地址：</strong>记录访问者 IP 地址用于安全分析和统计</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span><strong>数据保留：</strong>访问日志仅在本地保留，不会发送到任何外部服务器</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 您的权利 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6 text-blue-600" />
            您的权利与控制
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="text-lg">作为数据所有者，您拥有以下权利：</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">数据导出</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">随时导出您的所有数据和内容</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">数据删除</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">可以删除您的账户和所有相关数据</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">数据修改</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">随时修改您的个人信息和网站内容</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">完全控制</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">对您的网站和数据拥有完全的控制权</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 责任声明 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-red-600" />
            责任与免责
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-100 dark:border-red-800 border-l-4 border-l-red-500">
              <p className="mb-2">
                <strong>重要提示：</strong>TrBlog 是一个开源博客系统，您作为部署者对数据安全负有全部责任。
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border border-yellow-100 dark:border-yellow-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">我们的建议</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>定期备份您的数据库和文件</li>
                <li>使用强密码保护管理员账户</li>
                <li>及时更新系统到最新版本</li>
                <li>配置适当的安全设置</li>
                <li>使用 HTTPS 保护数据传输</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 联系我们 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-600" />
            联系与反馈
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p>
              如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：
            </p>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 border border-indigo-100 dark:border-indigo-800">
              <ul className="space-y-2">
                <li>📦 访问项目 GitHub 仓库提交 Issue</li>
                <li>📖 查阅项目文档了解更多信息</li>
                <li>💬 参与社区讨论分享您的想法</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
