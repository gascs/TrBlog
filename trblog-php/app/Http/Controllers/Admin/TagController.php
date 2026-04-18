<?php

namespace App\Http\Controllers\Admin;

use App\Models\Tag;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::all();
        return view('admin.tags.index', compact('tags'));
    }

    public function create()
    {
        return view('admin.tags.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:tags|max:255',
            'slug' => 'required|unique:tags|max:255',
        ]);

        Tag::create($request->all());

        return redirect()->route('admin.tags.index')
            ->with('success', '标签创建成功');
    }

    public function edit(Tag $tag)
    {
        return view('admin.tags.edit', compact('tag'));
    }

    public function update(Request $request, Tag $tag)
    {
        $request->validate([
            'name' => 'required|unique:tags,name,' . $tag->id . '|max:255',
            'slug' => 'required|unique:tags,slug,' . $tag->id . '|max:255',
        ]);

        $tag->update($request->all());

        return redirect()->route('admin.tags.index')
            ->with('success', '标签更新成功');
    }

    public function destroy(Tag $tag)
    {
        $tag->delete();

        return redirect()->route('admin.tags.index')
            ->with('success', '标签删除成功');
    }
}