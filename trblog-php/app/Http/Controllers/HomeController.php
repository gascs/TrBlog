<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\View\View;

class HomeController extends Controller
{
    /**
     * Show the application dashboard.
     */
    public function index(): View
    {
        $posts = Post::where('status', 'published')
            ->with('user', 'category', 'tags')
            ->latest('published_at')
            ->paginate(10);

        return view('home', compact('posts'));
    }
}