@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto">
        <!-- 文章标题和元信息 -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold mb-4">{{ $post->title }}</h1>
            <div class="flex flex-wrap items-center text-gray-600 text-sm mb-4">
                <span class="mr-4">
                    <i class="fas fa-user mr-1"></i> {{ $post->user->name }}
                </span>
                <span class="mr-4">
                    <i class="fas fa-calendar mr-1"></i> {{ $post->published_at->format('Y-m-d') }}
                </span>
                <span class="mr-4">
                    <i class="fas fa-folder mr-1"></i> 
                    @if($post->category)
                        <a href="{{ route('post.byCategory', $post->category) }}" class="hover:text-blue-600">{{ $post->category->name }}</a>
                    @else
                        未分类
                    @endif
                </span>
                <span>
                    <i class="fas fa-eye mr-1"></i> {{ $post->views }} 浏览
                </span>
            </div>
            <!-- 标签 -->
            @if($post->tags->count() > 0)
                <div class="mb-4">
                    <i class="fas fa-tags mr-2"></i>
                    @foreach($post->tags as $tag)
                        <a href="{{ route('post.byTag', $tag) }}" class="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm mr-2">
                            {{ $tag->name }}
                        </a>
                    @endforeach
                </div>
            @endif
        </div>
        
        <!-- 文章封面图 -->
        @if($post->cover_image)
            <div class="mb-8">
                <img src="{{ $post->cover_image }}" alt="{{ $post->title }}" class="w-full h-64 object-cover rounded-lg">
            </div>
        @endif
        
        <!-- 文章内容 -->
        <div class="prose max-w-none mb-8">
            {{ $post->content }}
        </div>
        
        <!-- 评论区 -->
        <div class="mt-12">
            <h2 class="text-2xl font-bold mb-6">评论</h2>
            <!-- 评论表单 -->
            <div class="mb-8">
                <form action="{{ route('comments.store') }}" method="POST">
                    @csrf
                    <input type="hidden" name="post_id" value="{{ $post->id }}">
                    <div class="mb-4">
                        <label for="content" class="block text-gray-700 font-medium mb-2">发表评论</label>
                        <textarea id="content" name="content" class="w-full px-4 py-2 border border-gray-300 rounded" rows="4"></textarea>
                    </div>
                    <div class="flex justify-end">
                        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                            提交评论
                        </button>
                    </div>
                </form>
            </div>
            
            <!-- 评论列表 -->
            @if($post->comments->count() > 0)
                <div class="space-y-4">
                    @foreach($post->comments as $comment)
                        <div class="bg-white p-4 rounded-lg shadow">
                            <div class="flex justify-between items-center mb-2">
                                <div class="font-medium">{{ $comment->user->name }}</div>
                                <div class="text-sm text-gray-600">{{ $comment->created_at->format('Y-m-d H:i') }}</div>
                            </div>
                            <div class="text-gray-700">{{ $comment->content }}</div>
                        </div>
                    @endforeach
                </div>
            @else
                <p class="text-gray-600">暂无评论，快来发表第一条评论吧！</p>
            @endif
        </div>
    </div>
</div>
@endsection