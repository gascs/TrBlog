@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">编辑分类</h1>
    
    <div class="bg-white rounded-lg shadow p-6">
        <form action="{{ route('admin.categories.update', $category) }}" method="POST">
            @csrf
            @method('PUT')
            
            <div class="mb-4">
                <label for="name" class="block text-gray-700 font-medium mb-2">名称</label>
                <input type="text" id="name" name="name" class="w-full px-4 py-2 border border-gray-300 rounded" value="{{ old('name', $category->name) }}">
                @error('name')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>
            
            <div class="mb-4">
                <label for="slug" class="block text-gray-700 font-medium mb-2">Slug</label>
                <input type="text" id="slug" name="slug" class="w-full px-4 py-2 border border-gray-300 rounded" value="{{ old('slug', $category->slug) }}">
                @error('slug')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>
            
            <div class="flex justify-end">
                <a href="{{ route('admin.categories.index') }}" class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded mr-2">
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