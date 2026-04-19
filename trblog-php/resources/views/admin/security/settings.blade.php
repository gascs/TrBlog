@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="mb-6">
        <h1 class="text-2xl font-bold mb-2">安全设置</h1>
        <p class="text-gray-600">管理系统安全配置</p>
    </div>

    <div class="bg-white rounded-lg shadow p-6 mb-8">
        <form method="POST" action="#">
            @csrf

            <!-- 会话设置 -->
            <div class="mb-8">
                <h2 class="text-xl font-bold mb-4">会话设置</h2>
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">会话过期时间</label>
                            <p class="text-xs text-gray-500">用户会话在多少分钟后过期</p>
                        </div>
                        <div class="w-1/3">
                            <input type="number" name="session_lifetime" value="{{ $settings['session_lifetime'] }}" min="1" max="1440" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">启用会话加密</label>
                            <p class="text-xs text-gray-500">加密存储的会话数据</p>
                        </div>
                        <div>
                            <input type="checkbox" name="session_encryption" {{ $settings['session_encryption'] ? 'checked' : '' }} class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                        </div>
                    </div>
                </div>
            </div>

            <!-- 安全设置 -->
            <div class="mb-8">
                <h2 class="text-xl font-bold mb-4">安全设置</h2>
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">强制 HTTPS 重定向</label>
                            <p class="text-xs text-gray-500">将所有 HTTP 请求重定向到 HTTPS</p>
                        </div>
                        <div>
                            <input type="checkbox" name="https_redirect" {{ $settings['https_redirect'] ? 'checked' : '' }} class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">登录尝试限制</label>
                            <p class="text-xs text-gray-500">每分钟允许的最大登录尝试次数</p>
                        </div>
                        <div class="w-1/3">
                            <input type="number" name="rate_limit" value="{{ $settings['rate_limit'] }}" min="1" max="50" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">密码最小长度</label>
                            <p class="text-xs text-gray-500">用户密码的最小长度</p>
                        </div>
                        <div class="w-1/3">
                            <input type="number" name="password_min_length" value="{{ $settings['password_min_length'] }}" min="6" max="50" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">内容安全策略</label>
                            <p class="text-xs text-gray-500">防止XSS攻击和其他代码注入</p>
                        </div>
                        <div>
                            <input type="checkbox" name="content_security_policy" {{ $settings['content_security_policy'] ? 'checked' : '' }} class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                        </div>
                    </div>
                </div>
            </div>

            <!-- 提交按钮 -->
            <div class="flex justify-end">
                <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
                    保存设置
                </button>
            </div>
        </form>
    </div>

    <!-- 安全状态 -->
    <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold mb-4">安全状态</h2>
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <span class="text-gray-700">系统版本</span>
                <span class="font-medium">1.0.0</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-gray-700">Laravel 版本</span>
                <span class="font-medium">{{ app()->version() }}</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-gray-700">PHP 版本</span>
                <span class="font-medium">{{ PHP_VERSION }}</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-gray-700">最后安全更新</span>
                <span class="font-medium">{{ now()->format('Y-m-d H:i:s') }}</span>
            </div>
        </div>
    </div>
</div>
@endsection
