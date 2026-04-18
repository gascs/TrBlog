@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="max-w-6xl mx-auto">
        <!-- 搜索标题 -->
        <h1 class="text-2xl font-bold mb-6">搜索结果：{{ $query }}</h1>
        
        <!-- 文章列表 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @if($posts->count() > 0)
                @foreach($posts as $post)
                    <div class="bg-white rounded-lg shadow overflow-hidden">
                        <!-- 文章封面图 -->
                        @if($post->cover_image)
                            <div class="h-48 overflow-hidden">
                                <img src="{{ $post->cover_image }}" alt="{{ $post->title }}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
                            </div>
                        @endif
                        
                        <!-- 文章内容 -->
                        <div class="p-4">
                            <!-- 分类 -->
                            @if($post->category)
                                <div class="text-sm text-gray-500 mb-2">
                                    <a href="{{ route('post.byCategory', $post->category) }}" class="hover:text-blue-600">{{ $post->category->name }}</a>
                                </div>
                            @endif
                            
                            <!-- 标题 -->
                            <h2 class="text-lg font-bold mb-2">
                                <a href="{{ route('post.show', $post) }}" class="hover:text-blue-600">{{ $post->title }}</a>
                            </h2>
                            
                            <!-- 摘要 -->
                            @if($post->excerpt)
                                <p class="text-gray-600 text-sm mb-4">{{ $post->excerpt }}</p>
                            @endif
                            
                            <!-- 元信息 -->
                            <div class="flex items-center justify-between text-sm text-gray-500">
                                <div class="flex items-center">
                                    <span class="mr-4">
                                        <i class="fas fa-user mr-1"></i> {{ $post->user->name }}
                                    </span>
                                    <span>
                                        <i class="fas fa-calendar mr-1"></i> {{ $post->published_at->format('Y-m-d') }}
                                    </span>
                                </div>
                                <div class="flex items-center">
                                    <span class="mr-4">
                                        <i class="fas fa-eye mr-1"></i> {{ $post->views }}
                                    </span>
                                    <span>
                                        <i class="fas fa-comment mr-1"></i> {{ $post->comments->count() }}
                                    </span>
                                </div>
                            </div>
                            
                            <!-- 标签 -->
                            @if($post->tags->count() > 0)
                                <div class="mt-4 flex flex-wrap">
                                    @foreach($post->tags as $tag)
                                        <a href="{{ route('post.byTag', $tag) }}" class="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs mr-2 mb-2">
                                            {{ $tag->name }}
                                        </a>
                                    @endforeach
                                </div>
                            @endif
                        </div>
                    </div>
                @endforeach
            @else
                <div class="col-span-full text-center py-12">
                    <p class="text-gray-600">没有找到与 "{{ $query }}" 相关的文章</p>
                </div>
            @endif
        </div>
        
        <!-- 分页 -->
        <div class="mt-8">
            {{ $posts->links() }}
        </div>
    </div>
</div>
@endsection