<?php

namespace App\Http\Controllers\Admin;

use App\Models\Post;
use App\Models\Category;
use App\Models\Tag;
use App\Models\User;
use App\Models\Comment;
use Illuminate\View\View;

class DashboardController extends Controller
{
    /**
     * Show the admin dashboard.
     */
    public function index(): View
    {
        $stats = [
            'posts' => Post::count(),
            'publishedPosts' => Post::where('published', true)->count(),
            'categories' => Category::count(),
            'tags' => Tag::count(),
            'users' => User::count(),
            'comments' => Comment::count(),
        ];

        $latestPosts = Post::latest()->take(5)->get();
        $latestComments = Comment::with('post', 'user')->latest()->take(5)->get();

        return view('admin.dashboard', compact('stats', 'latestPosts', 'latestComments'));
    }
}