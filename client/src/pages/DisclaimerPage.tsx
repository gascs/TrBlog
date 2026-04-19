import React from 'react';
import { AlertTriangle, Calendar, Info, Package, User, BookOpen, FileText, Shield, Globe } from 'lucide-react';

const DisclaimerPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold">免责声明</h1>
            <p className="text-orange-100 text-lg">TrBlog 博客系统使用条款与免责声明</p>
          </div>
        </div>
        <p className="text-orange-100 mb-4 max-w-3xl">
          请仔细阅读本免责声明。使用 TrBlog 博客系统即表示您同意接受这些条款和条件。
        </p>
        <div className="flex items-center gap-2 text-orange-200">
          <Calendar className="w-4 h-4" />
          <span>最后更新：2026年4月19日</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* 适用范围 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Info className="w-6 h-6 text-amber-600" />
            适用范围
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p className="text-lg">
              本免责声明适用于 TrBlog 博客系统及其所有相关组件、插件和文档。
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>适用于 TrBlog 的所有版本，包括开源版本和定制版本</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>适用于使用 TrBlog 部署的所有网站和应用</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>适用于所有 TrBlog 的用户、管理员和访问者</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 软件性质 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Package className="w-6 h-6 text-purple-600" />
            软件性质与提供方式
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                <Shield className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">开源软件</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">TrBlog 是一个开源项目，遵循 MIT 许可证发布</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                <Shield className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">按原样提供</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">软件按"原样"提供，不附带任何形式的明示或暗示保证</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>不保证软件完全符合您的需求或预期</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>不保证软件的连续、及时、安全或无错误运行</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>不保证软件的缺陷会被修复</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Markdown 内容责任 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-green-600" />
            内容与 Markdown 文件责任
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="text-lg">关于 Markdown 文件和网站内容的责任说明：</p>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>内容责任：</strong>您对在 TrBlog 上发布的所有 Markdown 内容和文章负有完全责任</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>内容合规：</strong>确保您发布的内容符合所有适用的法律法规</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>版权责任：</strong>确保您拥有发布内容的合法权利，不侵犯他人知识产权</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>内容审核：</strong>定期审核您的网站内容，及时删除不当内容</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Markdown 安全：</strong>虽然系统提供 XSS 防护，但您仍需注意 Markdown 内容的安全性</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 使用责任 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <User className="w-6 h-6 text-blue-600" />
            用户责任与义务
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="text-lg">作为 TrBlog 的用户，您需要承担以下责任：</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">数据安全</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">负责您的数据备份、安全保护和恢复</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">系统维护</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">负责系统的日常维护、更新和安全配置</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">合法使用</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">确保使用方式符合所有适用的法律法规</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">用户管理</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">管理您网站的用户账户和权限</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 免责条款 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            免责条款
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-100 dark:border-red-800 border-l-4 border-l-red-500">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span><strong>责任限制：</strong>在任何情况下，TrBlog 的作者、贡献者或维护者不对任何直接、间接、偶然、特殊、惩罚性或后果性损害承担责任</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span><strong>数据丢失：</strong>不对数据丢失、损坏或泄露承担责任</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span><strong>业务中断：</strong>不对业务中断、利润损失或任何经济损失承担责任</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span><strong>第三方内容：</strong>不对用户发布的内容、第三方链接或插件的内容承担责任</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 网站责任 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6 text-cyan-600" />
            网站运营责任
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="text-lg">关于使用 TrBlog 部署的网站的责任说明：</p>
            <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-4 border border-cyan-100 dark:border-cyan-800">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                  <span><strong>网站内容：</strong>您对您网站上的所有内容承担全部责任</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                  <span><strong>访问者信息：</strong>遵守适用的隐私法规，保护访问者的个人信息</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                  <span><strong>内容审核：</strong>建立适当的内容审核和管理机制</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                  <span><strong>法律声明：</strong>在您的网站上提供必要的法律声明和条款</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                  <span><strong>安全措施：</strong>实施适当的安全措施保护您的网站和访问者</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 许可证说明 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            开源许可证
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="text-lg">TrBlog 基于 MIT 许可证开源发布：</p>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 border border-indigo-100 dark:border-indigo-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">MIT 许可证概述</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">允许的权利</h4>
                  <ul className="list-disc pl-6 text-sm space-y-1">
                    <li>商业使用</li>
                    <li>修改和分发</li>
                    <li>私用</li>
                    <li>再许可</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">条件与限制</h4>
                  <ul className="list-disc pl-6 text-sm space-y-1">
                    <li>保留许可证和版权声明</li>
                    <li>无保证（按原样提供）</li>
                    <li>作者不承担责任</li>
                  </ul>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                详细内容请查看项目仓库中的 LICENSE 文件。
              </p>
            </div>
          </div>
        </section>

        {/* 第三方依赖 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Package className="w-6 h-6 text-teal-600" />
            第三方软件与依赖
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="text-lg">TrBlog 使用多个第三方开源软件库：</p>
            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4 border border-teal-100 dark:border-teal-800">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span>第三方软件有各自的许可证和免责声明</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span>我们不对第三方软件的任何问题承担责任</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span>请查阅相关第三方软件的许可证了解详情</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 变更与更新 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
            变更与更新
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border border-yellow-100 dark:border-yellow-800">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>我们保留随时修改 TrBlog 的权利，无需提前通知</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>我们保留随时修改本免责声明和其他法律文件的权利</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>继续使用 TrBlog 即表示您接受修改后的条款</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>更新可能会引入破坏性变更，请谨慎评估是否升级</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 联系方式 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Info className="w-6 h-6 text-gray-600" />
            其他事项
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">完整协议</h3>
              <p className="mb-3">
                本免责声明构成您与 TrBlog 之间关于使用本软件的完整协议。
              </p>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">可分割性</h3>
              <p className="mb-3">
                如果本免责声明的任何条款被认定为无效或不可执行，其余条款仍应继续有效。
              </p>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">联系我们</h3>
              <p>
                如有疑问，请访问项目 GitHub 仓库或提交 Issue 与我们联系。
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DisclaimerPage;
