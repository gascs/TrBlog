@extends('layouts.app')

@section('title', 'Home')

@section('content')
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main content -->
        <div class="lg:col-span-2">
            @foreach ($posts as $post)
                <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div class="flex flex-col md:flex-row gap-6">
                        @if ($post->cover_image)
                            <div class="md:w-1/3">
                                <img src="{{ asset('storage/' . $post->cover_image) }}" alt="{{ $post->title }}" class="w-full h-40 object-cover rounded-lg">
                            </div>
                            <div class="md:w-2/3">
                        @else
                            <div class="w-full">
                        @endif
                            <div class="flex items-center text-sm text-gray-500 mb-2">
                                <span>{{ $post->category?->name }}</span>
                                <span class="mx-2">•</span>
                                <span>{{ $post->published_at->format('M d, Y') }}</span>
                                <span class="mx-2">•</span>
                                <span>{{ $post->user->name }}</span>
                            </div>
                            <h2 class="text-2xl font-bold mb-2">
                                <a href="{{ route('post.show', $post) }}" class="text-gray-800 hover:text-blue-600">
                                    {{ $post->title }}
                                </a>
                            </h2>
                            <p class="text-gray-600 mb-4">
                                {{ $post->excerpt ?: Str::limit($post->content, 150) }}
                            </p>
                            <div class="flex items-center justify-between">
                                <div class="flex space-x-2">
                                    @foreach ($post->tags as $tag)
                                        <a href="{{ route('post.byTag', $tag) }}" class="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full hover:bg-blue-100 hover:text-blue-800">
                                            {{ $tag->name }}
                                        </a>
                                    @endforeach
                                </div>
                                <div class="flex items-center text-gray-500">
                                    <i class="fa fa-eye mr-1"></i>
                                    <span>{{ $post->views }}</span>
                                    <i class="fa fa-comment ml-4 mr-1"></i>
                                    <span>{{ $post->comments->count() }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
            
            <!-- Pagination -->
            <div class="mt-8">
                {{ $posts->links() }}
            </div>
        </div>
        
        <!-- Sidebar -->
        <div class="lg:col-span-1">
            <!-- Search -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 class="text-lg font-bold mb-4">Search</h3>
                <form action="{{ route('post.search') }}" method="GET">
                    <div class="flex">
                        <input type="text" name="q" placeholder="Search posts..." class="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                </form>
            </div>
            
            <!-- Categories -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 class="text-lg font-bold mb-4">Categories</h3>
                <ul class="space-y-2">
                    @foreach ($categories as $category)
                        <li>
                            <a href="{{ route('post.byCategory', $category) }}" class="flex justify-between text-gray-700 hover:text-blue-600">
                                {{ $category->name }}
                                <span class="text-gray-500">({{ $category->posts->count() }})</span>
                            </a>
                        </li>
                    @endforeach
                </ul>
            </div>
            
            <!-- Tags -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 class="text-lg font-bold mb-4">Tags</h3>
                <div class="flex flex-wrap gap-2">
                    @foreach ($tags as $tag)
                        <a href="{{ route('post.byTag', $tag) }}" class="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full hover:bg-blue-100 hover:text-blue-800">
                            {{ $tag->name }}
                        </a>
                    @endforeach
                </div>
            </div>
            
            <!-- Latest posts -->
            <div class="bg-white rounded-lg shadow-sm p-6">
                <h3 class="text-lg font-bold mb-4">Latest Posts</h3>
                <ul class="space-y-4">
                    @foreach ($latestPosts as $post)
                        <li>
                            <a href="{{ route('post.show', $post) }}" class="text-gray-700 hover:text-blue-600">
                                {{ $post->title }}
                            </a>
                            <p class="text-sm text-gray-500">
                                {{ $post->published_at->format('M d, Y') }}
                            </p>
                        </li>
                    @endforeach
                </ul>
            </div>
        </div>
    </div>
@endsection