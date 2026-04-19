import React from 'react';
import { Code, FileCode, Book, Calendar, Link2 } from 'lucide-react';

const OpenSourcePage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl p-8 border border-purple-100">
        <div className="flex items-center gap-3 mb-6">
          <Code className="w-10 h-10 text-purple-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">开源声明</h1>
            <p className="text-gray-600">TrBlog 基于开源技术构建</p>
          </div>
        </div>
        <p className="text-gray-600 mb-4">
          TrBlog 是一个开源项目，我们感谢并尊重所有为其做出贡献的开源软件。
          本页面列出了 TrBlog 使用的主要开源组件及其许可证。
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>最后更新：2026年4月19日</span>
        </div>
      </div>

      <div className="space-y-6">
        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileCode className="w-6 h-6 text-purple-600" />
            前端技术
          </h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">React</h3>
                <span className="badge badge-primary">MIT 许可证</span>
              </div>
              <p className="text-gray-700 mb-2">
                用于构建用户界面的 JavaScript 库
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Link2 className="w-4 h-4" />
                <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors">
                  https://react.dev/
                </a>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">TypeScript</h3>
                <span className="badge badge-primary">Apache 2.0 许可证</span>
              </div>
              <p className="text-gray-700 mb-2">
                JavaScript 的超集，添加了类型系统
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Link2 className="w-4 h-4" />
                <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors">
                  https://www.typescriptlang.org/
                </a>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">Tailwind CSS</h3>
                <span className="badge badge-primary">MIT 许可证</span>
              </div>
              <p className="text-gray-700 mb-2">
                实用优先的 CSS 框架
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Link2 className="w-4 h-4" />
                <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors">
                  https://tailwindcss.com/
                </a>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">React Router</h3>
                <span className="badge badge-primary">MIT 许可证</span>
              </div>
              <p className="text-gray-700 mb-2">
                用于 React 应用的声明式路由
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Link2 className="w-4 h-4" />
                <a href="https://reactrouter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors">
                  https://reactrouter.com/
                </a>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">TanStack Query</h3>
                <span className="badge badge-primary">MIT 许可证</span>
              </div>
              <p className="text-gray-700 mb-2">
                用于管理服务器状态的 React 钩子
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Link2 className="w-4 h-4" />
                <a href="https://tanstack.com/query/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors">
                  https://tanstack.com/query/
                </a>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">Framer Motion</h3>
                <span className="badge badge-primary">MIT 许可证</span>
              </div>
              <p className="text-gray-700 mb-2">
                React 的动画库
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Link2 className="w-4 h-4" />
                <a href="https://www.framer.com/motion/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors">
                  https://www.framer.com/motion/
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileCode className="w-6 h-6 text-purple-600" />
            后端技术
          </h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">NestJS</h3>
                <span className="badge badge-primary">MIT 许可证</span>
              </div>
              <p className="text-gray-700 mb-2">
                用于构建高效、可扩展的服务器端应用程序的框架
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Link2 className="w-4 h-4" />
                <a href="https://nestjs.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors">
                  https://nestjs.com/
                </a>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">Prisma</h3>
                <span className="badge badge-primary">Apache 2.0 许可证</span>
              </div>
              <p className="text-gray-700 mb-2">
                现代数据库工具包
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Link2 className="w-4 h-4" />
                <a href="https://www.prisma.io/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors">
                  https://www.prisma.io/
                </a>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">PostgreSQL</h3>
                <span className="badge badge-primary">PostgreSQL 许可证</span>
              </div>
              <p className="text-gray-700 mb-2">
                功能强大的开源关系型数据库
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Link2 className="w-4 h-4" />
                <a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors">
                  https://www.postgresql.org/
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Book className="w-6 h-6 text-purple-600" />
            许可证信息
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              TrBlog 项目本身采用 MIT 许可证开源：
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <pre className="text-sm text-gray-600 whitespace-pre-wrap">
{`MIT License

Copyright (c) 2026 TrBlog

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
              </pre>
            </div>
            <p>
              本页面列出的所有第三方开源软件均受其各自许可证的约束。我们尊重并遵守这些许可证的条款。
            </p>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Book className="w-6 h-6 text-purple-600" />
            贡献
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              我们欢迎社区对 TrBlog 项目的贡献。如果您有兴趣参与开发，请：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>查看我们的 GitHub 仓库</li>
              <li>提交问题和功能请求</li>
              <li>提交拉取请求</li>
              <li>帮助改进文档</li>
            </ul>
            <p>
              所有贡献者都将被认可并感谢他们的努力。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OpenSourcePage;