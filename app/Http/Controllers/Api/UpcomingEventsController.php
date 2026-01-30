<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
  use App\Models\UpcomingEvent;

use Inertia\Inertia;
class UpcomingEventsController extends Controller
{
    
 public function store(Request $request)
{
    // 1️⃣ Validate input
    $request->validate([
        'title' => 'required|string|max:255',
        'description1' => 'required|string',
        'description2' => 'nullable|string',
    ]);

    // 2️⃣ Create a new event using Eloquent
    UpcomingEvent::create([
        'title' => $request->title,
        'description1' => $request->description1,
        'description2' => $request->description2,
        'created_at' => now(), // since timestamps=false, we set created_at manually
    ]);

    // 3️⃣ Redirect back to the list page
    return redirect()->route('upcoming-events.index');
}


public function index()
{
    $events = UpcomingEvent::orderBy('created_at', 'desc')
                               ->take(3)
                               ->get();

    return Inertia::render('UpcomingEvents/Index', [
        'events' => $events
    ]);
}




    public function create()
    {
        return Inertia::render('UpcomingEvents/AddUpcomingEvent'); // form page
    }
}
