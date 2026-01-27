<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Role;
use App\Models\TypesOfUser;

class ManagerController extends Controller
{
    // Show dashboard
    public function index()
    {
        // Get all users of type 'Admin' (type_id = 1)
        $admins = User::where('type_id', 1)
                      ->with('role') // eager load role
                      ->get();

        // Get roles for adding new admins (excluding manager)
        $roles = Role::whereIn('name', ['admin_events', 'admin_news'])->get();

        return Inertia::render('Manager/ManagerDashboard', [
            'admins' => $admins,
            'roles' => $roles
        ]);
    }

    // Add new admin
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role_id' => 'required|exists:roles,id'
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'type_id' => 1, // always Admin
            'role_id' => $request->role_id,
        ]);

        return redirect()->back()->with('success', 'Admin added successfully!');
    }

    // Update admin password

public function updatePassword(Request $request, $id)
{
    $request->validate([
        'password' => 'required|string|min:6'
    ]);

    $admin = User::findOrFail($id);
    $admin->password = Hash::make($request->password);
    $admin->save();

    // Return JSON success response for Inertia
    // return response()->json([
    //     'success' => true,
    //     'message' => 'Password updated successfully!'
    // ]);

        return redirect()->back()->with('success', 'Password updated successfully!');

}


    // Pause admin (disable login)
    public function pause($id)
    {
        $admin = User::findOrFail($id);
        $admin->email_verified_at = null; // example: mark email unverified
        $admin->remember_token = null;    // remove remember token
        $admin->save();

        return redirect()->back()->with('success', 'Admin paused successfully!');
    }

    // Delete admin
    public function destroy($id)
    {
        $admin = User::findOrFail($id);
        $admin->delete();

        return redirect()->back()->with('success', 'Admin deleted successfully!');
    }
}
