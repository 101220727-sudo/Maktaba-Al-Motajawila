<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EventRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class EventRequestController extends Controller
{
    public function store(Request $request)
    {

        $request->validate([
            'event_package_id' => 'required|exists:events_package,id',
'event_date' => 'required|date_format:Y-m-d H:i:s|after:now',
            'location' => 'required|string|max:255',
            'age' => 'required|integer|min:1',
            'nb_of_visitors' => 'required|integer|min:1',
            'phone' => 'required|string|max:20',
        ]);

        $user = Auth::user(); 

        $eventRequest = EventRequest::create([
            'user_id' => $user->id,
            'event_package_id' => $request->event_package_id,
'event_date' => Carbon::createFromFormat(
    'Y-m-d H:i:s',
    $request->event_date
),
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


// public function myRequests()
// {
//     // TEMPORARY DEBUG - Remove after finding the issue
//     dd([
//         'authenticated' => auth()->check(),
//         'user_id' => auth()->id(),
//         'user' => auth()->user(),
//         'requests_count' => EventRequest::where('user_id', auth()->id())->count(),
//         'requests' => EventRequest::with('events_package')
//             ->where('user_id', auth()->id())
//             ->get()
//             ->toArray(),
//     ]);

//     // Your original code below (won't run because of dd above)
//     $eventRequests = EventRequest::with('events_package')
//         ->where('user_id', auth()->id())
//         ->orderBy('created_at', 'desc')
//         ->get()
//         ->map(function ($request) {
//             return [
//                 'id' => $request->id,
//                 'event_name' => $request->events_package->package_title ?? 'فعالية غير محددة',
//                 'event_date' => $request->event_date,
//                 'status' => $request->status,
//                 'created_at' => $request->created_at,
//                 'description' => "الموقع: {$request->location} | عدد الزوار: {$request->nb_of_visitors}",
//                 'location' => $request->location,
//                 'age' => $request->age,
//                 'nb_of_visitors' => $request->nb_of_visitors,
//                 'phone' => $request->phone,
//             ];
//         });

//     return Inertia::render('Profile/Edit', [
//         'mustVerifyEmail' => auth()->user() instanceof \Illuminate\Contracts\Auth\MustVerifyEmail,
//         'status' => session('status'),
//         'eventRequests' => $eventRequests,
//     ]);
// }

// public function myRequests()
// {
//     $eventRequests = EventRequest::with('events_package')
//         ->where('user_id', auth()->id())
//        // ->orderBy('created_at', 'desc')
//         ->get()
//         ->map(function ($request) {
//             return [
//                 'id' => $request->id,
//                 'event_name' => $request->events_package->package_title ?? 'فعالية غير محددة',
//                 'event_date' => $request->event_date,
//                 'status' => $request->status,
//                 'created_at' => $request->created_at,
//                 'description' => "الموقع: {$request->location} | عدد الزوار: {$request->nb_of_visitors}",
//                 'location' => $request->location,
//                 'age' => $request->age,
//                 'nb_of_visitors' => $request->nb_of_visitors,
//                 'phone' => $request->phone,
//             ];
//         });

//     return Inertia::render('Profile/MyEventRequests', [ // NEW PAGE
//         'eventRequests' => $eventRequests,
//         'auth' => [
//             'user' => auth()->user()->load('role'),
//         ],
//     ]);
// }





// public function myRequests()
// {
//     $eventRequests = EventRequest::with('events_package')
//         ->where('user_id', auth()->id())
//         ->orderBy('created_at', 'desc')
//         ->get()
//         ->map(function ($request) {
//             return [
//                 'id' => $request->id,
//                 'event_name' => $request->events_package->package_title ?? 'فعالية غير محددة',
//                 'event_date' => $request->event_date,
//                 'status' => $request->status,
//                 'created_at' => $request->created_at,
//                 'description' => "الموقع: {$request->location} | عدد الزوار: {$request->nb_of_visitors}",
//                 'location' => $request->location,
//                 'age' => $request->age,
//                 'nb_of_visitors' => $request->nb_of_visitors,
//                 'phone' => $request->phone,
//             ];
//         });

//     return Inertia::render('Profile/Partials/EventRequestsForm', [ // Render the component directly
//         'eventRequests' => $eventRequests,
//         'auth' => [
//             'user' => auth()->user()->load('role'),
//         ],
//     ]);
// }


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

// Add this new method to handle cancellation
    // public function cancel($id)
    // {
    //     $eventRequest = EventRequest::findOrFail($id);
        
    //     // Verify the user owns this request
    //     if ($eventRequest->user_id !== auth()->id()) {
    //         return back()->withErrors(['message' => 'غير مصرح لك بإلغاء هذا الطلب']);
    //     }

    //     // Check if can be canceled
    //     if ($eventRequest->status === 'rejected') {
    //         return back()->withErrors(['message' => 'لا يمكن إلغاء طلب مرفوض']);
    //     }

    //     if ($eventRequest->status === 'accepted') {
    //         $eventDate = \Carbon\Carbon::parse($eventRequest->event_date);
    //         $today = \Carbon\Carbon::now();
    //         $daysRemaining = $today->diffInDays($eventDate, false);
            
    //         if ($daysRemaining < 3) {
    //             return back()->withErrors(['message' => 'لا يمكن إلغاء الطلب قبل أقل من 3 أيام من تاريخ الفعالية']);
    //         }
    //     }

    //     $eventRequest->delete();

    //     return back()->with('success', 'تم إلغاء الطلب بنجاح');
    // }


        public function cancel($id)
    {
        $eventRequest = EventRequest::findOrFail($id);
        
        // Verify the user owns this request
        if ($eventRequest->user_id !== auth()->id()) {
            return back()->withErrors(['message' => 'غير مصرح لك بإلغاء هذا الطلب']);
        }

        // Check if can be canceled
        if ($eventRequest->status === 'rejected') {
            return back()->withErrors(['message' => 'لا يمكن إلغاء طلب مرفوض']);
        }

        if ($eventRequest->status === 'accepted') {
            $eventDate = \Carbon\Carbon::parse($eventRequest->event_date);
            $today = \Carbon\Carbon::now();
            $daysRemaining = $today->diffInDays($eventDate, false);
            
            if ($daysRemaining < 3) {
                return back()->withErrors(['message' => 'لا يمكن إلغاء الطلب قبل أقل من 3 أيام من تاريخ الفعالية']);
            }
        }

        $eventRequest->delete();

        return back()->with('success', 'تم إلغاء الطلب بنجاح');
    }
    
}
