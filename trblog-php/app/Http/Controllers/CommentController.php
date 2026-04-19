<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;

class CommentController extends Controller
{
    /**
     * Store a newly created comment in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id',
            'content' => 'required|string',
        ]);

        Comment::create([
            'user_id' => auth()->id(),
            'post_id' => $request->post_id,
            'content' => htmlspecialchars($request->content, ENT_QUOTES, 'UTF-8'),
        ]);

        return back()->with('success', '评论发布成功');
    }

    /**
     * Remove the specified comment from storage.
     */
    public function destroy(Comment $comment): RedirectResponse
    {
        // 检查权限：只有评论作者或文章作者可以删除评论
        if ($comment->user_id !== auth()->id() && $comment->post->user_id !== auth()->id()) {
            abort(403);
        }

        $comment->delete();

        return back()->with('success', '评论删除成功');
    }
}