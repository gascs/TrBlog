import React from 'react';
import { Shield, Lock, FileText, Calendar } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-10 h-10 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">隐私政策</h1>
            <p className="text-gray-600">保护您的隐私是我们的责任</p>
          </div>
        </div>
        <p className="text-gray-600 mb-4">
          本隐私政策描述了 TrBlog 如何收集、使用、存储和保护您的个人信息。
          我们致力于保护您的隐私，并确保您的个人信息安全。
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>最后更新：2026年4月19日</span>
        </div>
      </div>

      <div className="space-y-6">
        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6 text-blue-600" />
            收集的信息
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              我们可能收集以下类型的信息：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>个人识别信息（如姓名、电子邮件地址、电话号码）</li>
              <li>使用数据（如访问时间、IP地址、浏览器类型）</li>
              <li>cookies 和类似技术数据</li>
              <li>您提供的内容（如评论、文章）</li>
            </ul>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            信息使用方式
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              我们收集的信息用于以下目的：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>提供、维护和改进我们的服务</li>
              <li>回应您的请求和询问</li>
              <li>发送重要通知（如安全更新）</li>
              <li>分析使用趋势，提高用户体验</li>
              <li>防止欺诈和滥用</li>
            </ul>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6 text-blue-600" />
            信息保护
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              我们采取以下措施保护您的信息：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>使用加密技术保护数据传输</li>
              <li>实施访问控制措施</li>
              <li>定期安全审计和更新</li>
              <li>限制员工对个人信息的访问</li>
            </ul>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            第三方服务
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              我们可能使用第三方服务来帮助提供我们的服务，这些服务可能会收集您的信息。我们要求这些第三方遵守隐私保护要求。
            </p>
            <p>
              第三方服务可能包括：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>分析工具（如 Google Analytics）</li>
              <li>支付处理服务</li>
              <li>云存储服务</li>
            </ul>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            您的权利
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              根据适用的隐私法规，您可能有权：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>访问您的个人信息</li>
              <li>更正不准确的信息</li>
              <li>删除您的个人信息</li>
              <li>限制处理您的信息</li>
              <li>数据可携带权</li>
              <li>反对处理您的信息</li>
            </ul>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            隐私政策变更
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              我们可能会不时更新本隐私政策。当我们进行重大变更时，我们会在网站上发布更新后的政策，并在必要时通知您。
            </p>
            <p>
              继续使用我们的服务即表示您同意修订后的隐私政策。
            </p>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            联系我们
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              如果您对本隐私政策有任何问题或疑虑，请通过以下方式联系我们：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>电子邮件：gascs@qq.com</li>
              <li>地址：浙江省温州市</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;