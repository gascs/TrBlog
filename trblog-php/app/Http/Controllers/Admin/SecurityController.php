<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\View\View;

class SecurityController extends Controller
{
    /**
     * Display the security dashboard.
     */
    public function index(): View
    {
        // 安全状态数据
        $securityStatus = [
            'session_encryption' => true,
            'https_enabled' => true,
            'csrf_protection' => true,
            'password_strength' => true,
            'rate_limiting' => true,
            'content_security_policy' => true,
            'xss_protection' => true,
        ];

        // 最近的安全日志（模拟数据）
        $securityLogs = [
            [
                'id' => 1,
                'type' => '登录尝试',
                'message' => '管理员登录成功',
                'ip' => '127.0.0.1',
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'created_at' => now(),
            ],
            [
                'id' => 2,
                'type' => '登录尝试',
                'message' => '无效的登录尝试',
                'ip' => '192.168.1.100',
                'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0)',
                'created_at' => now()->subMinutes(15),
            ],
            [
                'id' => 3,
                'type' => '安全更新',
                'message' => '系统安全配置已更新',
                'ip' => '127.0.0.1',
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'created_at' => now()->subHours(2),
            ],
        ];

        return view('admin.security.index', compact('securityStatus', 'securityLogs'));
    }

    /**
     * Display security settings form.
     */
    public function settings(): View
    {
        // 安全设置数据
        $settings = [
            'session_lifetime' => 120, // 分钟
            'session_encryption' => true,
            'https_redirect' => true,
            'rate_limit' => 5, // 每分钟尝试次数
            'password_min_length' => 12,
            'content_security_policy' => true,
        ];

        return view('admin.security.settings', compact('settings'));
    }
}
