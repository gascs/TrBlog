<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>免责声明 - TRBlog</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        body {
            font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
            background-color: #f8f9fa;
        }
        .content-section {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1, h2, h3 {
            color: #333;
            margin-bottom: 1rem;
        }
        p {
            margin-bottom: 1rem;
            line-height: 1.6;
            color: #555;
        }
        ul {
            margin-bottom: 1rem;
            padding-left: 1.5rem;
        }
        li {
            margin-bottom: 0.5rem;
            color: #555;
        }
        .footer {
            margin-top: 2rem;
            text-align: center;
            color: #666;
            font-size: 0.9rem;
        }
        .nav-link {
            color: #3B82F6;
            text-decoration: none;
            transition: color 0.2s;
        }
        .nav-link:hover {
            color: #2563EB;
            text-decoration: underline;
        }
    </style>
</head>
<body class="min-h-screen flex flex-col">
    <!-- 导航栏 -->
    <nav class="bg-white shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <a href="/" class="text-xl font-bold text-gray-900">TRBlog</a>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="/" class="nav-link">首页</a>
                    <a href="/privacy" class="nav-link">隐私政策</a>
                    <a href="/open-source" class="nav-link">开源声明</a>
                    <a href="/disclaimer" class="nav-link font-medium">免责声明</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- 主要内容 -->
    <main class="flex-grow py-8">
        <div class="content-section">
            <h1 class="text-3xl font-bold text-center mb-6">免责声明</h1>
            
            <section class="mb-6">
                <h2 class="text-xl font-semibold mb-3">服务使用</h2>
                <p>本博客系统（以下简称"本系统"）仅作为个人或组织发布内容的平台，不保证内容的准确性、完整性或及时性。用户在使用本系统时，应自行判断内容的真实性和可靠性。</p>
            </section>

            <section class="mb-6">
                <h2 class="text-xl font-semibold mb-3">责任限制</h2>
                <p>在法律允许的最大范围内，本系统及其开发者不对因使用或无法使用本系统而导致的任何直接、间接、偶然、特殊或后果性损害承担责任，包括但不限于利润损失、数据丢失、业务中断等。</p>
            </section>

            <section class="mb-6">
                <h2 class="text-xl font-semibold mb-3">外部链接</h2>
                <p>本系统可能包含指向第三方网站的链接，这些链接仅为方便用户而提供。本系统不对这些第三方网站的内容、隐私政策或安全性负责，也不表示认可这些网站上的内容。</p>
            </section>

            <section class="mb-6">
                <h2 class="text-xl font-semibold mb-3">内容责任</h2>
                <p>用户在本系统上发布的内容由用户自行负责。本系统及其开发者不对用户发布的内容承担责任，但保留在发现违规内容时删除或修改的权利。</p>
            </section>

            <section class="mb-6">
                <h2 class="text-xl font-semibold mb-3">法律适用</h2>
                <p>本免责声明受中华人民共和国法律管辖。任何因本系统或本免责声明引起的争议，应通过友好协商解决；协商不成的，任何一方均有权将争议提交至系统所在地有管辖权的人民法院诉讼解决。</p>
            </section>

            <section class="mb-6">
                <h2 class="text-xl font-semibold mb-3">修改权利</h2>
                <p>本系统保留随时修改本免责声明的权利，修改后的免责声明将在本页面公布，不再另行通知。用户继续使用本系统即视为接受修改后的免责声明。</p>
            </section>

            <section class="mb-6">
                <h2 class="text-xl font-semibold mb-3">联系我们</h2>
                <p>如果您对本免责声明有任何疑问，请通过系统提供的联系方式与我们联系。</p>
            </section>
        </div>
    </main>

    <!-- 页脚 -->
    <footer class="bg-gray-800 text-white py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="mb-4 md:mb-0">
                    <h3 class="text-xl font-bold">TRBlog</h3>
                    <p class="text-gray-400">个人博客系统</p>
                </div>
                <div class="flex space-x-6">
                    <a href="/" class="text-gray-300 hover:text-white">首页</a>
                    <a href="/privacy" class="text-gray-300 hover:text-white">隐私政策</a>
                    <a href="/open-source" class="text-gray-300 hover:text-white">开源声明</a>
                    <a href="/disclaimer" class="text-gray-300 hover:text-white">免责声明</a>
                </div>
            </div>
            <div class="mt-8 text-center text-gray-400">
                <p>&copy; 2024 TRBlog. 保留所有权利。</p>
            </div>
        </div>
    </footer>
</body>
</html>