@extends('layouts.app')

@section('title', '开源声明')

@section('content')
    <div class="max-w-4xl mx-auto px-4 py-12">
        <div class="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl p-8 border border-purple-100 mb-8">
            <div class="flex items-center gap-3 mb-6">
                <svg class="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
                <div>
                    <h1 class="text-3xl font-bold text-gray-900">开源声明</h1>
                    <p class="text-gray-600">TrBlog 基于开源技术构建</p>
                </div>
            </div>
            <p class="text-gray-600 mb-4">
                TrBlog 是一个开源项目，我们感谢并尊重所有为其做出贡献的开源软件。
                本页面列出了 TrBlog 使用的主要开源组件及其许可证。
            </p>
            <div class="flex items-center gap-2 text-sm text-gray-500">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>最后更新：2026年4月19日</span>
            </div>
        </div>

        <div class="space-y-6">
            <section class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                    </svg>
                    前端技术
                </h2>
                <div class="space-y-4">
                    <div class="border-b border-gray-200 pb-4">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-lg font-semibold text-gray-900">React</h3>
                            <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide bg-blue-50 text-blue-600">MIT 许可证</span>
                        </div>
                        <p class="text-gray-700 mb-2">
                            用于构建用户界面的 JavaScript 库
                        </p>
                        <div class="flex items-center gap-2 text-sm text-gray-500">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                            <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" class="hover:text-purple-600 transition-colors">
                                https://react.dev/
                            </a>
                        </div>
                    </div>

                    <div class="border-b border-gray-200 pb-4">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-lg font-semibold text-gray-900">TypeScript</h3>
                            <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide bg-blue-50 text-blue-600">Apache 2.0 许可证</span>
                        </div>
                        <p class="text-gray-700 mb-2">
                            JavaScript 的超集，添加了类型系统
                        </p>
                        <div class="flex items-center gap-2 text-sm text-gray-500">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                            <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer" class="hover:text-purple-600 transition-colors">
                                https://www.typescriptlang.org/
                            </a>
                        </div>
                    </div>

                    <div class="border-b border-gray-200 pb-4">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-lg font-semibold text-gray-900">Tailwind CSS</h3>
                            <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide bg-blue-50 text-blue-600">MIT 许可证</span>
                        </div>
                        <p class="text-gray-700 mb-2">
                            实用优先的 CSS 框架
                        </p>
                        <div class="flex items-center gap-2 text-sm text-gray-500">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                            <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" class="hover:text-purple-600 transition-colors">
                                https://tailwindcss.com/
                            </a>
                        </div>
                    </div>

                    <div class="border-b border-gray-200 pb-4">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-lg font-semibold text-gray-900">React Router</h3>
                            <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide bg-blue-50 text-blue-600">MIT 许可证</span>
                        </div>
                        <p class="text-gray-700 mb-2">
                            用于 React 应用的声明式路由
                        </p>
                        <div class="flex items-center gap-2 text-sm text-gray-500">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                            <a href="https://reactrouter.com/" target="_blank" rel="noopener noreferrer" class="hover:text-purple-600 transition-colors">
                                https://reactrouter.com/
                            </a>
                        </div>
                    </div>

                    <div class="border-b border-gray-200 pb-4">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-lg font-semibold text-gray-900">Laravel</h3>
                            <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide bg-blue-50 text-blue-600">MIT 许可证</span>
                        </div>
                        <p class="text-gray-700 mb-2">
                            PHP Web 应用框架
                        </p>
                        <div class="flex items-center gap-2 text-sm text-gray-500">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                            <a href="https://laravel.com/" target="_blank" rel="noopener noreferrer" class="hover:text-purple-600 transition-colors">
                                https://laravel.com/
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                    </svg>
                    许可证信息
                </h2>
                <div class="space-y-3 text-gray-700">
                    <p>
                        TrBlog 项目本身采用 MIT 许可证开源：
                    </p>
                    <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <pre class="text-sm text-gray-600 whitespace-pre-wrap">
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

            <section class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    贡献
                </h2>
                <div class="space-y-3 text-gray-700">
                    <p>
                        我们欢迎社区对 TrBlog 项目的贡献。如果您有兴趣参与开发，请：
                    </p>
                    <ul class="list-disc pl-6 space-y-2">
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
@endsection