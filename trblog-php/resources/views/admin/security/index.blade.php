@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="mb-6">
        <h1 class="text-2xl font-bold mb-2">安全中心</h1>
        <p class="text-gray-600">监控和管理系统安全状态</p>
    </div>

    <!-- 安全状态卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <h3 class="text-lg font-semibold mb-2">会话加密</h3>
            <p class="text-gray-600 mb-4">保护用户会话数据安全</p>
            <div class="flex items-center">
                <span class="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                <span class="text-green-600 font-medium">已启用</span>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <h3 class="text-lg font-semibold mb-2">HTTPS 保护</h3>
            <p class="text-gray-600 mb-4">加密传输数据</p>
            <div class="flex items-center">
                <span class="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                <span class="text-green-600 font-medium">已启用</span>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <h3 class="text-lg font-semibold mb-2">CSRF 保护</h3>
            <p class="text-gray-600 mb-4">防止跨站请求伪造攻击</p>
            <div class="flex items-center">
                <span class="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                <span class="text-green-600 font-medium">已启用</span>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <h3 class="text-lg font-semibold mb-2">密码强度</h3>
            <p class="text-gray-600 mb-4">确保用户密码安全</p>
            <div class="flex items-center">
                <span class="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                <span class="text-green-600 font-medium">已启用</span>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <h3 class="text-lg font-semibold mb-2">登录速率限制</h3>
            <p class="text-gray-600 mb-4">防止暴力破解攻击</p>
            <div class="flex items-center">
                <span class="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                <span class="text-green-600 font-medium">已启用</span>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <h3 class="text-lg font-semibold mb-2">内容安全策略</h3>
            <p class="text-gray-600 mb-4">防止XSS攻击</p>
            <div class="flex items-center">
                <span class="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                <span class="text-green-600 font-medium">已启用</span>
            </div>
        </div>
    </div>

    <!-- 安全日志 -->
    <div class="bg-white rounded-lg shadow p-6 mb-8">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">最近的安全日志</h2>
            <a href="#" class="text-blue-600 hover:text-blue-800">查看全部</a>
        </div>
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            类型
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            消息
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            IP 地址
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            时间
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @foreach($securityLogs as $log)
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {{ $log['type'] }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {{ $log['message'] }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ $log['ip'] }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ $log['created_at']->format('Y-m-d H:i:s') }}
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

    <!-- 安全建议 -->
    <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold mb-4">安全建议</h2>
        <ul class="space-y-3">
            <li class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                <span>定期更新密码，使用强密码组合</span>
            </li>
            <li class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                <span>启用双因素认证</span>
            </li>
            <li class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                <span>定期备份系统数据</span>
            </li>
            <li class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                <span>保持系统和依赖包的更新</span>
            </li>
        </ul>
    </div>
</div>
@endsection
