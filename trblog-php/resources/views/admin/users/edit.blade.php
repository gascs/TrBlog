@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">编辑用户</h1>
    
    <div class="bg-white rounded-lg shadow p-6">
        <form action="{{ route('admin.users.update', $user) }}" method="POST">
            @csrf
            @method('PUT')
            
            <div class="mb-4">
                <label for="name" class="block text-gray-700 font-medium mb-2">名称</label>
                <input type="text" id="name" name="name" class="w-full px-4 py-2 border border-gray-300 rounded" value="{{ old('name', $user->name) }}">
                @error('name')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>
            
            <div class="mb-4">
                <label for="email" class="block text-gray-700 font-medium mb-2">邮箱</label>
                <input type="email" id="email" name="email" class="w-full px-4 py-2 border border-gray-300 rounded" value="{{ old('email', $user->email) }}">
                @error('email')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>
            
            <div class="mb-4">
                <label for="password" class="block text-gray-700 font-medium mb-2">密码 (留空不修改)</label>
                <input type="password" id="password" name="password" class="w-full px-4 py-2 border border-gray-300 rounded">
                @error('password')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>
            
            <div class="mb-4">
                <label for="password_confirmation" class="block text-gray-700 font-medium mb-2">确认密码</label>
                <input type="password" id="password_confirmation" name="password_confirmation" class="w-full px-4 py-2 border border-gray-300 rounded">
            </div>
            
            <div class="mb-4">
                <label for="role" class="block text-gray-700 font-medium mb-2">角色</label>
                <select id="role" name="role" class="w-full px-4 py-2 border border-gray-300 rounded">
                    <option value="user" {{ (old('role', $user->role) === 'user') ? 'selected' : '' }}>用户</option>
                    <option value="editor" {{ (old('role', $user->role) === 'editor') ? 'selected' : '' }}>编辑</option>
                    <option value="admin" {{ (old('role', $user->role) === 'admin') ? 'selected' : '' }}>管理员</option>
                </select>
                @error('role')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>
            
            <div class="flex justify-end">
                <a href="{{ route('admin.users.index') }}" class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded mr-2">
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