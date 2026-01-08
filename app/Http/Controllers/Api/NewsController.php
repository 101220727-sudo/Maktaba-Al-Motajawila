<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\News;



class NewsController extends Controller
{
    public function index()
    {
        $news = News::orderBy('published_at', 'desc')->get();
        return response()->json($news);
    }


public function store(Request $request)
{
    $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'image' => 'nullable|image|max:2048',
    ]);

    $imagePath = null;
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('images', 'public');
    }

    $news = News::create([
        'title' => $request->title,
        'description' => $request->description,
        'image' => $imagePath,
        'published_at' => now(),
    ]);

    return response()->json($news, 201);
}


public function destroy($id)
{
    $news = \App\Models\News::find($id);

    if (!$news) {
        return response()->json(['message' => 'News not found'], 404);
    }

    if ($news->image) {
        \Storage::disk('public')->delete($news->image);
    }

    $news->delete();

    return response()->json(['message' => 'News deleted successfully'], 200);
}

}
