<?php

// 初始化cURL会话
$ch = curl_init();

// 1. 获取登录页面，提取CSRF令牌
curl_setopt($ch, CURLOPT_URL, 'http://127.0.0.1:8001/login');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookies.txt');

$loginPage = curl_exec($ch);

// 提取CSRF令牌
preg_match('/name="_token" value="([^"]+)"/', $loginPage, $matches);
$token = $matches[1];

// 2. 发送登录请求
curl_setopt($ch, CURLOPT_URL, 'http://127.0.0.1:8001/login');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, [
    'email' => 'admin@example.com',
    'password' => 'admin123',
    '_token' => $token
]);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

$loginResult = curl_exec($ch);

// 输出登录结果
// echo "登录结果: $loginResult\n";

// 3. 测试是否登录成功
curl_setopt($ch, CURLOPT_URL, 'http://127.0.0.1:8001/admin');
curl_setopt($ch, CURLOPT_POST, false);

$adminPage = curl_exec($ch);

// 获取HTTP状态码
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// 输出后台页面结果
// echo "后台页面: $adminPage\n";

// 检查是否成功访问后台
if ($httpCode == 200) {
    echo "登录成功，已成功访问后台管理页面！HTTP状态码: $httpCode\n";
} elseif ($httpCode == 419) {
    echo "登录失败，CSRF令牌不匹配。HTTP状态码: $httpCode\n";
} elseif ($httpCode == 401) {
    echo "登录失败，未授权。HTTP状态码: $httpCode\n";
} elseif ($httpCode == 404) {
    echo "登录失败，页面不存在。HTTP状态码: $httpCode\n";
} else {
    echo "登录失败，无法访问后台管理页面。HTTP状态码: $httpCode\n";
    // 输出部分内容以便调试
    echo "后台页面部分内容: " . substr($adminPage, 0, 500) . "...\n";
}

// 关闭cURL会话
curl_close($ch);
