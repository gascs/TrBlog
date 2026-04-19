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

    /**
     * Show the privacy policy page.
     */
    public function privacy(): View
    {
        return view('privacy');
    }

    /**
     * Show the open source page.
     */
    public function openSource()
    {
        return view('open-source');
    }

    /**
     * Show the disclaimer page.
     */
    public function disclaimer()
    {
        return view('disclaimer');
    }
}