<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\EventRequest;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }



public function myRequests()
{
    $eventRequests = EventRequest::with('events_package')
        ->where('user_id', auth()->id())
        ->get()
        ->map(function ($request) {
            return [
                'id' => $request->id,
                'event_name' => $request->events_package->package_title ?? 'فعالية غير محددة',
                'event_date' => $request->event_date,
                'status' => $request->status,
                'created_at' => $request->created_at,
                'description' => "الموقع: {$request->location} | عدد الزوار: {$request->nb_of_visitors}",
                'location' => $request->location,
                'age' => $request->age,
                'nb_of_visitors' => $request->nb_of_visitors,
                'phone' => $request->phone,
            ];
        });

    return Inertia::render('Profile/MyEventRequests', [
        'eventRequests' => $eventRequests,
        'auth' => [
            'user' => auth()->user()->load('role'),
        ],
    ]);
}

}
