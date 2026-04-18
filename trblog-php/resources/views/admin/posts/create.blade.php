@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">创建文章</h1>
    
    <div class="bg-white rounded-lg shadow p-6">
        <form action="{{ route('admin.posts.store') }}" method="POST">
            @csrf
            
            <div class="mb-4">
                <label for="title" class="block text-gray-700 font-medium mb-2">标题</label>
                <input type="text" id="title" name="title" class="w-full px-4 py-2 border border-gray-300 rounded" value="{{ old('title') }}">
                @error('title')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>
            
            <div class="mb-4">
                <label for="slug" class="block text-gray-700 font-medium mb-2">Slug</label>
                <input type="text" id="slug" name="slug" class="w-full px-4 py-2 border border-gray-300 rounded" value="{{ old('slug') }}">
                @error('slug')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>
            
            <div class="mb-4">
                <label for="category_id" class="block text-gray-700 font-medium mb-2">分类</label>
                <select id="category_id" name="category_id" class="w-full px-4 py-2 border border-gray-300 rounded">
                    <option value="">选择分类</option>
                    @foreach($categories as $category)
                        <option value="{{ $category->id }}" {{ old('category_id') == $category->id ? 'selected' : '' }}>{{ $category->name }}</option>
                    @endforeach
                </select>
            </div>
            
            <div class="mb-4">
                <label for="tags" class="block text-gray-700 font-medium mb-2">标签</label>
                <select id="tags" name="tags[]" class="w-full px-4 py-2 border border-gray-300 rounded" multiple>
                    @foreach($tags as $tag)
                        <option value="{{ $tag->id }}" {{ in_array($tag->id, old('tags', [])) ? 'selected' : '' }}>{{ $tag->name }}</option>
                    @endforeach
                </select>
            </div>
            
            <div class="mb-4">
                <label for="excerpt" class="block text-gray-700 font-medium mb-2">摘要</label>
                <textarea id="excerpt" name="excerpt" class="w-full px-4 py-2 border border-gray-300 rounded" rows="3">{{ old('excerpt') }}</textarea>
            </div>
            
            <div class="mb-4">
                <label for="content" class="block text-gray-700 font-medium mb-2">内容</label>
                <textarea id="content" name="content" class="w-full px-4 py-2 border border-gray-300 rounded" rows="10">{{ old('content') }}</textarea>
                @error('content')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>
            
            <div class="mb-4">
                <label for="status" class="block text-gray-700 font-medium mb-2">状态</label>
                <select id="status" name="status" class="w-full px-4 py-2 border border-gray-300 rounded">
                    <option value="published" {{ old('status') === 'published' ? 'selected' : '' }}>已发布</option>
                    <option value="draft" {{ old('status') === 'draft' ? 'selected' : '' }}>草稿</option>
                </select>
            </div>
            
            <div class="flex justify-end">
                <a href="{{ route('admin.posts.index') }}" class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded mr-2">
                    取消
                </a>
                <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    保存
                </button>
            </div>
        </form>
    </div>
</div>
@endsection