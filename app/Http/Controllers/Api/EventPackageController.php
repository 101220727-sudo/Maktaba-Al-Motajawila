<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EventPackageController extends Controller
{
    public function index()
    {
        $packages = DB::table('events_package')->get();

        return Inertia::render('EventPackages/PackagesPage', [
            'packages' => $packages
        ]);
    }

public function store(Request $request)
{
    $request->validate([
        'package_title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'main_image' => 'nullable|string',
    ]);

    $package = \DB::table('events_package')->insert([
        'package_title' => $request->package_title,
        'description' => $request->description,
        'main_image' => $request->main_image,
    ]);

    return redirect()->route('packages')->with('success', 'Package added successfully!');
}



public function destroy($id)
{
    $deleted = \DB::table('events_package')->where('id', $id)->delete();

    if ($deleted) {
        return redirect()->route('packages')->with('success', 'Package deleted successfully!');
    }

    return redirect()->route('packages')->with('error', 'Package not found!');
}



public function edit($id)
{
    $package = DB::table('events_package')->where('id', $id)->first();
    return inertia('EventPackages/EditPackagePage', ['package' => $package]);
}

public function update(Request $request, $id)
{
    $request->validate([
        'package_title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'main_image' => 'nullable|string',
    ]);

    DB::table('events_package')
        ->where('id', $id)
        ->update([
            'package_title' => $request->package_title,
            'description' => $request->description,
            'main_image' => $request->main_image,
        ]);

    return redirect()->route('packages')->with('success', 'Package updated successfully!');
}


}




