import React from 'react';
import { AlertTriangle, Calendar, Info, Package, User, BookOpen, Mail } from 'lucide-react';

const DisclaimerPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-100">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-10 h-10 text-amber-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">免责声明</h1>
            <p className="text-gray-600">TrBlog 纯本地部署版本的法律声明</p>
          </div>
        </div>
        <p className="text-gray-600 mb-4">
          本免责声明适用于 TrBlog 博客系统的纯本地部署版本。
          请仔细阅读本声明，以了解您在使用 TrBlog 时的权利和义务。
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>最后更新：2026年4月19日</span>
        </div>
      </div>

      <div className="space-y-6">
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="w-6 h-6 text-amber-600" />
            适用范围
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              本免责声明适用于 TrBlog 博客系统的纯本地部署版本。
            </p>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Package className="w-6 h-6 text-amber-600" />
            软件性质
          </h2>
          <div className="space-y-3 text-gray-700">
            <ul className="list-disc pl-6 space-y-2">
              <li>TrBlog 是一个开源的博客系统，仅提供基础功能</li>
              <li>本软件按"原样"提供，不附带任何形式的保证</li>
              <li>作者不保证软件的正确性、可靠性或适用性</li>
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-6 h-6 text-amber-600" />
            使用责任
          </h2>
          <div className="space-y-3 text-gray-700">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>用户责任</strong>：用户在使用本软件时应自行承担风险</li>
              <li><strong>内容责任</strong>：用户对在博客中发布的内容负全部责任</li>
              <li><strong>数据安全</strong>：用户负责本地数据的备份和安全</li>
              <li><strong>法律合规</strong>：用户应确保使用本软件符合当地法律法规</li>
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
            免责条款
          </h2>
          <div className="space-y-3 text-gray-700">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>不承担责任</strong>：作者不对因使用本软件而导致的任何直接或间接损失承担责任</li>
              <li><strong>不提供支持</strong>：作者不承诺提供技术支持或维护服务</li>
              <li><strong>版本变更</strong>：软件可能会进行更新，用户应自行决定是否升级</li>
              <li><strong>第三方依赖</strong>：本软件使用的第三方库可能有各自的许可证和免责声明</li>
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-600" />
            许可证
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              本软件基于 MIT 许可证开源，详情请参阅 LICENSE 文件。
            </p>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Mail className="w-6 h-6 text-amber-600" />
            联系方式
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              如果您对本免责声明有任何疑问，请在项目仓库中提交 Issue。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DisclaimerPage;