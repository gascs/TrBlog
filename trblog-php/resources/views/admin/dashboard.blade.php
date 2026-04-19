@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="mb-6">
        <h1 class="text-2xl font-bold mb-2">后台管理</h1>
        <p class="text-gray-600">欢迎回来，{{ auth()->user()->name }}</p>
    </div>

    <!-- 导航菜单 -->
    <div class="bg-white rounded-lg shadow p-4 mb-8">
        <nav class="flex flex-wrap gap-2">
            <a href="{{ route('admin.dashboard') }}" class="px-4 py-2 bg-blue-600 text-white rounded-md">仪表盘</a>
            <a href="{{ route('admin.posts.index') }}" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md">文章管理</a>
            <a href="{{ route('admin.categories.index') }}" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md">分类管理</a>
            <a href="{{ route('admin.tags.index') }}" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md">标签管理</a>
            <a href="{{ route('admin.users.index') }}" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md">用户管理</a>
            <a href="{{ route('admin.security') }}" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md">安全中心</a>
        </nav>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-2">文章总数</h3>
            <p class="text-3xl font-bold text-blue-600">{{ $stats['posts'] }}</p>
            <p class="text-gray-500 text-sm mt-2">{{ $stats['publishedPosts'] }} 篇已发布</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-2">分类总数</h3>
            <p class="text-3xl font-bold text-green-600">{{ $stats['categories'] }}</p>
            <p class="text-gray-500 text-sm mt-2">所有文章分类</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-2">标签总数</h3>
            <p class="text-3xl font-bold text-purple-600">{{ $stats['tags'] }}</p>
            <p class="text-gray-500 text-sm mt-2">所有文章标签</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-2">用户总数</h3>
            <p class="text-3xl font-bold text-orange-600">{{ $stats['users'] }}</p>
            <p class="text-gray-500 text-sm mt-2">所有注册用户</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-2">评论总数</h3>
            <p class="text-3xl font-bold text-red-600">{{ $stats['comments'] }}</p>
            <p class="text-gray-500 text-sm mt-2">所有文章评论</p>
        </div>
    </div>

    <!-- 最近活动 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 最近文章 -->
        <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-bold mb-4">最近文章</h2>
            <ul class="space-y-4">
                @foreach($latestPosts as $post)
                <li class="flex items-start">
                    <div class="flex-1">
                        <h3 class="font-medium">{{ $post->title }}</h3>
                        <p class="text-sm text-gray-500">{{ $post->created_at->format('Y-m-d H:i') }}</p>
                    </div>
                    <div>
                        <a href="{{ route('admin.posts.edit', $post) }}" class="text-blue-600 hover:text-blue-800">编辑</a>
                    </div>
                </li>
                @endforeach
            </ul>
        </div>

        <!-- 最近评论 -->
        <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-bold mb-4">最近评论</h2>
            <ul class="space-y-4">
                @foreach($latestComments as $comment)
                <li class="flex items-start">
                    <div class="flex-1">
                        <p class="text-sm">{{ $comment->content }}</p>
                        <p class="text-xs text-gray-500 mt-1">{{ $comment->user->name }} 在 {{ $comment->post->title }} 上</p>
                    </div>
                </li>
                @endforeach
            </ul>
        </div>
    </div>
</div>
@endsection
