<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TrBlog - 安装设置</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-800">TrBlog 安装设置</h1>
            <p class="text-gray-600 mt-2">请完成以下设置以开始使用 TrBlog</p>
        </div>
        
        @if(session('error'))
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {{ session('error') }}
            </div>
        @endif
        
        <form action="{{ route('setup.store') }}" method="POST">
            @csrf
            
            <!-- 应用配置 -->
            <div class="mb-8">
                <h2 class="text-xl font-semibold text-gray-700 mb-4">应用配置</h2>
                
                <div class="mb-4">
                    <label for="app_name" class="block text-gray-700 font-medium mb-2">应用名称</label>
                    <input type="text" id="app_name" name="app_name" class="w-full px-4 py-2 border border-gray-300 rounded" value="TrBlog" required>
                </div>
                
                <div class="mb-4">
                    <label for="app_url" class="block text-gray-700 font-medium mb-2">应用 URL</label>
                    <input type="url" id="app_url" name="app_url" class="w-full px-4 py-2 border border-gray-300 rounded" value="http://localhost:8000" required>
                </div>
            </div>
            
            <!-- 数据库配置 -->
            <div class="mb-8">
                <h2 class="text-xl font-semibold text-gray-700 mb-4">数据库配置</h2>
                
                <div class="mb-4">
                    <label for="db_connection" class="block text-gray-700 font-medium mb-2">数据库类型</label>
                    <select id="db_connection" name="db_connection" class="w-full px-4 py-2 border border-gray-300 rounded" required>
                        <option value="mysql">MySQL</option>
                        <option value="pgsql">PostgreSQL</option>
                        <option value="sqlite">SQLite</option>
                    </select>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label for="db_host" class="block text-gray-700 font-medium mb-2">数据库主机</label>
                        <input type="text" id="db_host" name="db_host" class="w-full px-4 py-2 border border-gray-300 rounded" value="127.0.0.1" required>
                    </div>
                    <div>
                        <label for="db_port" class="block text-gray-700 font-medium mb-2">数据库端口</label>
                        <input type="number" id="db_port" name="db_port" class="w-full px-4 py-2 border border-gray-300 rounded" value="3306" required>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label for="db_database" class="block text-gray-700 font-medium mb-2">数据库名称</label>
                        <input type="text" id="db_database" name="db_database" class="w-full px-4 py-2 border border-gray-300 rounded" value="trblog" required>
                    </div>
                    <div>
                        <label for="db_username" class="block text-gray-700 font-medium mb-2">数据库用户名</label>
                        <input type="text" id="db_username" name="db_username" class="w-full px-4 py-2 border border-gray-300 rounded" value="root" required>
                    </div>
                </div>
                
                <div class="mb-4">
                    <label for="db_password" class="block text-gray-700 font-medium mb-2">数据库密码</label>
                    <input type="password" id="db_password" name="db_password" class="w-full px-4 py-2 border border-gray-300 rounded">
                </div>
            </div>
            
            <div class="flex justify-center">
                <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">
                    开始安装
                </button>
            </div>
        </form>
        
        <div class="mt-8 text-center text-gray-500 text-sm">
            <p>TrBlog &copy; {{ date('Y') }} - 基于 Laravel 10 开发</p>
        </div>
    </div>
</body>
</html>