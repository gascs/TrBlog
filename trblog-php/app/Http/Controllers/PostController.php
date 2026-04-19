<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\View\View;

class PostController extends Controller
{
    /**
     * Show the post details.
     */
    public function show(Post $post): View
    {
        // Check if post is published
        if ($post->status !== 'published') {
            abort(404);
        }

        // Increment view count
        $post->increment('views');

        return view('posts.show', compact('post'));
    }

    /**
     * Show posts by category.
     */
    public function byCategory(Category $category): View
    {
        $posts = Post::where('status', 'published')
            ->where('category_id', $category->id)
            ->with('user', 'category', 'tags')
            ->latest('published_at')
            ->paginate(10);

        return view('posts.by-category', compact('posts', 'category'));
    }

    /**
     * Show posts by tag.
     */
    public function byTag(Tag $tag): View
    {
        $posts = $tag->posts()
            ->where('status', 'published')
            ->with('user', 'category', 'tags')
            ->latest('published_at')
            ->paginate(10);

        return view('posts.by-tag', compact('posts', 'tag'));
    }

    /**
     * Search posts.
     */
    public function search(Request $request): View
    {
        $query = $request->input('q');

        $posts = Post::where('status', 'published')
            ->where(function ($q) use ($query) {
                $q->where('title', 'like', '%' . $query . '%')
                  ->orWhere('content', 'like', '%' . $query . '%')
                  ->orWhere('excerpt', 'like', '%' . $query . '%');
            })
            ->with('user', 'category', 'tags')
            ->latest('published_at')
            ->paginate(10);

        return view('posts.search', compact('posts', 'query'));
    }
}