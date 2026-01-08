<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EventRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventRequestController extends Controller
{
    public function store(Request $request)
    {

        $request->validate([
            'event_package_id' => 'required|exists:events_package,id',
            'event_date' => 'required|date|after_or_equal:today',
            'location' => 'required|string|max:255',
            'age' => 'required|integer|min:1',
            'nb_of_visitors' => 'required|integer|min:1',
            'phone' => 'required|string|max:20',
        ]);

        $user = Auth::user(); 

        $eventRequest = EventRequest::create([
            'user_id' => $user->id,
            'event_package_id' => $request->event_package_id,
            'event_date' => $request->event_date,
            'location' => $request->location,
            'age' => $request->age,
            'nb_of_visitors' => $request->nb_of_visitors,
            'phone' => $request->phone,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Event request submitted successfully',
            'event_request' => $eventRequest
        ], 201);
    }
    
    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:accepted,rejected',
        ]);

        $eventRequest = EventRequest::findOrFail($id);
        $eventRequest->status = $request->status;
        $eventRequest->save();

        return response()->json([
            'message' => 'Status updated successfully',
            'status' => $eventRequest->status,
        ]);
    }


public function index()
{
    $eventRequests = EventRequest::with(['user', 'events_package'])
        ->orderBy('event_date', 'asc')
        ->get();

    return Inertia::render('EventRequest/ReceiveEventsPage', [
        'eventRequests' => $eventRequests,
        'auth' => [
            'user' => auth()->user()->load('role'),
        ],
    ]);
}

}
