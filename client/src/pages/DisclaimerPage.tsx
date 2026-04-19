import React from 'react';
import { AlertTriangle, Shield, FileText, Calendar } from 'lucide-react';

const DisclaimerPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-100">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-10 h-10 text-amber-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">免责声明</h1>
            <p className="text-gray-600">使用 TrBlog 服务的法律声明</p>
          </div>
        </div>
        <p className="text-gray-600 mb-4">
          本免责声明描述了使用 TrBlog 服务的相关法律事项和责任限制。
          请仔细阅读本声明，以了解您在使用 TrBlog 时的权利和义务。
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>最后更新：2026年4月19日</span>
        </div>
      </div>

      <div className="space-y-6">
        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-amber-600" />
            服务使用
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              TrBlog 是一个开源博客系统，仅供个人和组织使用。
              您在使用本服务时，应遵守以下规定：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>遵守所有适用的法律法规</li>
              <li>不发布违法、有害、侵权或其他不当内容</li>
              <li>尊重他人的知识产权和隐私权</li>
              <li>合理使用服务器资源，不进行恶意攻击或滥用</li>
            </ul>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
            免责声明
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              TrBlog 按"原样"提供，不附带任何形式的明示或暗示保证。
              在法律允许的最大范围内，我们不承担以下责任：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>服务的适用性、可靠性、及时性或准确性</li>
              <li>因使用或无法使用服务而导致的任何直接、间接、附带、特殊或后果性损害</li>
              <li>用户发布的内容的准确性、合法性或适当性</li>
              <li>第三方服务或链接的内容或行为</li>
            </ul>
            <p>
              我们保留随时修改、暂停或终止服务的权利，无需事先通知。
            </p>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-600" />
            内容责任
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              作为 TrBlog 的用户，您对自己发布的内容承担全部责任。
              您同意：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>您拥有发布内容的所有必要权利</li>
              <li>您的内容不侵犯任何第三方的知识产权或其他权利</li>
              <li>您的内容不违反任何法律法规</li>
              <li>您的内容不会对他人造成伤害或损失</li>
            </ul>
            <p>
              我们有权在不事先通知的情况下删除任何违反本声明的内容。
            </p>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-600" />
            知识产权
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              TrBlog 的源代码、商标、标志和其他知识产权归其各自所有者所有。
              您同意：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>不复制、修改、分发或出售 TrBlog 的源代码，除非遵守相关许可证条款</li>
              <li>不使用 TrBlog 的商标或标志，除非获得明确授权</li>
              <li>尊重所有第三方的知识产权</li>
            </ul>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-600" />
            隐私保护
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              我们重视您的隐私。请参阅我们的<a href="/privacy" className="text-amber-600 hover:underline">隐私政策</a>以了解我们如何收集、使用和保护您的个人信息。
            </p>
            <p>
              您同意我们按照隐私政策处理您的个人信息。
            </p>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-600" />
            适用法律
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              本免责声明受中华人民共和国法律管辖。
              任何与本声明相关的争议应提交至浙江省温州市有管辖权的法院解决。
            </p>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-600" />
            变更
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              我们可能会不时更新本免责声明。当我们进行重大变更时，我们会在网站上发布更新后的声明。
            </p>
            <p>
              继续使用 TrBlog 即表示您同意修订后的免责声明。
            </p>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-600" />
            联系我们
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              如果您对本免责声明有任何问题或疑虑，请通过以下方式联系我们：
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

export default DisclaimerPage;