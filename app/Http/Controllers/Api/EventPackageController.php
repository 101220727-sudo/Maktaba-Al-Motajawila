<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage; // ✅ ADD THIS LINE
use Illuminate\Support\Facades\Auth;  // ✅ ADD THIS LINE


class EventPackageController extends Controller
{

// public function index(Request $request)
// {
//     // Get package rules from config
//     $packageRules = config('package_rules.packages', []);
    
//     // DEBUGGING - Remove after fixing
//     \Log::info('=== PACKAGE FILTER DEBUG ===');
//     \Log::info('Request params:', [
//         'age' => $request->age,
//         'visitors' => $request->visitors,
//         'gender' => $request->gender,
//     ]);
//     \Log::info('Config loaded?', [
//         'rules_count' => count($packageRules),
//         'rules' => $packageRules
//     ]);
    
//     // Get all packages first
//     $packages = DB::table('events_package')->get();
    
//     \Log::info('Total packages from DB:', ['count' => $packages->count()]);
    
//     // Filter packages if criteria provided
//     if ($request->has('age') || $request->has('visitors') || $request->has('gender')) {
//         \Log::info('Filter conditions met - starting filtering...');
        
//         $packages = $packages->filter(function($package) use ($request, $packageRules) {
//             $rules = $packageRules[$package->id] ?? null;
            
//             \Log::info("Package {$package->id} ({$package->package_title}):", [
//                 'has_rules' => !is_null($rules),
//                 'rules' => $rules
//             ]);
            
//             // If no rules defined for this package, show it
//             if (!$rules) {
//                 \Log::info("  -> No rules, SHOWING");
//                 return true;
//             }
            
//             // Check age criteria
//             if ($request->has('age') && $request->age) {
//                 $age = (int)$request->age;
                
//                 if (isset($rules['min_age']) && $age < $rules['min_age']) {
//                     \Log::info("  -> FILTERED: Age {$age} < min {$rules['min_age']}");
//                     return false;
//                 }
                
//                 if (isset($rules['max_age']) && $age > $rules['max_age']) {
//                     \Log::info("  -> FILTERED: Age {$age} > max {$rules['max_age']}");
//                     return false;
//                 }
//             }
            
//             // Check visitors criteria
//             if ($request->has('visitors') && $request->visitors) {
//                 $visitors = (int)$request->visitors;
                
//                 if (isset($rules['min_visitors']) && $visitors < $rules['min_visitors']) {
//                     \Log::info("  -> FILTERED: Visitors {$visitors} < min {$rules['min_visitors']}");
//                     return false;
//                 }
                
//                 if (isset($rules['max_visitors']) && $visitors > $rules['max_visitors']) {
//                     \Log::info("  -> FILTERED: Visitors {$visitors} > max {$rules['max_visitors']}");
//                     return false;
//                 }
//             }
            
//             // Check gender criteria
//             if ($request->has('gender') && $request->gender) {
//                 $gender = $request->gender;
                
//                 if (isset($rules['suitable_gender']) && $rules['suitable_gender'] !== 'mixed') {
//                     if ($rules['suitable_gender'] !== $gender) {
//                         \Log::info("  -> FILTERED: Gender {$gender} != {$rules['suitable_gender']}");
//                         return false;
//                     }
//                 }
//             }
            
//             \Log::info("  -> PASSED all filters, SHOWING");
//             return true;
//         })->values();
        
//         \Log::info('After filtering:', ['count' => $packages->count()]);
//     }
    
//     return Inertia::render('EventPackages/PackagesPage', [
//         'packages' => $packages
//     ]);
// }


    public function index(Request $request)
    {
        // Get package rules from config
        $packageRules = config('package_rules.packages', []);
        
        // Get all packages first
        $packages = DB::table('events_package')->get();
        
        // Get activities for each package
        $packages = $packages->map(function($package) {
            $activities = DB::table('event_package_activity')
                ->join('activities', 'event_package_activity.activity_id', '=', 'activities.id')
                ->where('event_package_activity.package_id', $package->id)
                ->pluck('activities.name')
                ->toArray();
            
            $package->activities = $activities;
            return $package;
        });
        
        // Filter packages if criteria provided
        if ($request->has('age') || $request->has('visitors') || $request->has('gender')) {
            $packages = $packages->filter(function($package) use ($request, $packageRules) {
                $rules = $packageRules[$package->id] ?? null;
                
                // If no rules defined for this package, show it
                if (!$rules) {
                    return true;
                }
                
                // Check age criteria
                if ($request->has('age') && $request->age) {
                    $age = (int)$request->age;
                    
                    if (isset($rules['min_age']) && $age < $rules['min_age']) {
                        return false;
                    }
                    
                    if (isset($rules['max_age']) && $age > $rules['max_age']) {
                        return false;
                    }
                }
                
                // Check visitors criteria
                if ($request->has('visitors') && $request->visitors) {
                    $visitors = (int)$request->visitors;
                    
                    if (isset($rules['min_visitors']) && $visitors < $rules['min_visitors']) {
                        return false;
                    }
                    
                    if (isset($rules['max_visitors']) && $visitors > $rules['max_visitors']) {
                        return false;
                    }
                }
                
                // Check gender criteria
                if ($request->has('gender') && $request->gender) {
                    $gender = $request->gender;
                    
                    if (isset($rules['suitable_gender']) && $rules['suitable_gender'] !== 'mixed') {
                        if ($rules['suitable_gender'] !== $gender) {
                            return false;
                        }
                    }
                }
                
                return true;
            })->values();
        }
        
        // Return JSON for API requests
        if ($request->is('api/*')) {
            return response()->json($packages);
        }
        
        // Return Inertia view for web requests
        return Inertia::render('EventPackages/PackagesPage', [
            'packages' => $packages
        ]);
    }

























  public function store(Request $request)
    {
        $request->validate([
            'package_title' => 'required|string|max:255',
            'description'   => 'nullable|string',
            'main_image'    => 'nullable|image|max:2048', // ✅ CHANGED: image file, not string
            'total_price'   => 'required|numeric',
            'event_time'    => 'required',
            'activity_ids'  => 'required|array',
            'activity_ids.*'=> 'integer|exists:activities,id',
            'min_age'       => 'nullable|integer|min:4|max:20',
            'max_age'       => 'nullable|integer|min:4|max:20',
            'min_visitors'  => 'nullable|integer|min:2',
            'max_visitors'  => 'nullable|integer',
            'suitable_gender' => 'required|in:male,female,mixed',
        ]);

        // ✅ Handle image upload
        $imagePath = null;
        if ($request->hasFile('main_image')) {
            $imagePath = $request->file('main_image')->store('packages', 'public');
        }

        // Insert package
        $packageId = DB::table('events_package')->insertGetId([
            'package_title' => $request->package_title,
            'description'   => $request->description,
            'main_image'    => $imagePath, // ✅ Store the path
            'total_price'   => $request->total_price,
            'event_time'    => $request->event_time,
        ]);

        // Insert into pivot table for each selected activity
        foreach ($request->activity_ids as $activityId) {
            DB::table('event_package_activity')->insert([
                'package_id'  => $packageId,
                'activity_id' => $activityId,
            ]);
        }

        // Update config file with package rules
        $this->updatePackageRules($packageId, [
            'min_age' => $request->min_age,
            'max_age' => $request->max_age,
            'min_visitors' => $request->min_visitors,
            'max_visitors' => $request->max_visitors,
            'suitable_gender' => $request->suitable_gender,
        ]);

        return redirect()->route('event.packages')->with('success', 'Package added successfully!');
    }

    // public function update(Request $request, $id)
    // {
    //     $request->validate([
    //         'package_title' => 'required|string|max:255',
    //         'description'   => 'nullable|string',
    //         'main_image'    => 'nullable|image|max:2048', // ✅ CHANGED: image file
    //         'total_price'   => 'required|numeric',
    //         'event_time'    => 'required',
    //         'activity_ids'  => 'required|array',
    //         'activity_ids.*'=> 'exists:activities,id',
    //     ]);

    //     DB::transaction(function () use ($request, $id) {
    //         // Get current package to check for old image
    //         $currentPackage = DB::table('events_package')->where('id', $id)->first();

    //         // ✅ Handle image upload
    //         $imagePath = $currentPackage->main_image; // Keep old image by default
            
    //         if ($request->hasFile('main_image')) {
    //             // Delete old image if exists
    //             if ($currentPackage->main_image) {
    //                 Storage::disk('public')->delete($currentPackage->main_image);
    //             }
                
    //             // Store new image
    //             $imagePath = $request->file('main_image')->store('packages', 'public');
    //         }

    //         // Update package
    //         DB::table('events_package')
    //             ->where('id', $id)
    //             ->update([
    //                 'package_title' => $request->package_title,
    //                 'description'   => $request->description,
    //                 'main_image'    => $imagePath, // ✅ Update with new or keep old
    //                 'total_price'   => $request->total_price,
    //                 'event_time'    => $request->event_time,
    //             ]);

    //         // Reset activities
    //         DB::table('event_package_activity')
    //             ->where('package_id', $id)
    //             ->delete();

    //         // Insert new activities
    //         foreach ($request->activity_ids as $activityId) {
    //             DB::table('event_package_activity')->insert([
    //                 'package_id'  => $id,
    //                 'activity_id' => $activityId,
    //             ]);
    //         }
    //     });

    //     return redirect()
    //         ->route('event.packages')
    //         ->with('success', 'Package updated successfully!');
    // }



    public function update(Request $request, $id)
{
    // Get current package first
    $currentPackage = DB::table('events_package')->where('id', $id)->first();
    
    if (!$currentPackage) {
        return redirect()->route('event.packages')->with('error', 'Package not found!');
    }

    // ✅ Validate - fields are required only if they're being changed
    $request->validate([
        'package_title' => 'nullable|string|max:255',
        'description'   => 'nullable|string',
        'main_image'    => 'nullable|image|max:2048',
        'total_price'   => 'nullable|numeric',
        'event_time'    => 'nullable',
        'activity_ids'  => 'nullable|array',
        'activity_ids.*'=> 'exists:activities,id',
    ]);

    DB::transaction(function () use ($request, $id, $currentPackage) {
        
        // ✅ Prepare update data - keep old values if new ones aren't provided
        $updateData = [
            'package_title' => $request->input('package_title', $currentPackage->package_title),
            'description'   => $request->input('description', $currentPackage->description),
            'total_price'   => $request->input('total_price', $currentPackage->total_price),
            'event_time'    => $request->input('event_time', $currentPackage->event_time),
        ];

        // Handle image upload
        if ($request->hasFile('main_image')) {
            // Delete old image if exists
            if ($currentPackage->main_image) {
                Storage::disk('public')->delete($currentPackage->main_image);
            }
            
            // Store new image
            $updateData['main_image'] = $request->file('main_image')->store('packages', 'public');
        } else {
            // Keep old image
            $updateData['main_image'] = $currentPackage->main_image;
        }

        // Update package
        DB::table('events_package')
            ->where('id', $id)
            ->update($updateData);

        // Update activities if provided
        if ($request->has('activity_ids') && is_array($request->activity_ids)) {
            // Delete old activities
            DB::table('event_package_activity')
                ->where('package_id', $id)
                ->delete();

            // Insert new activities
            foreach ($request->activity_ids as $activityId) {
                DB::table('event_package_activity')->insert([
                    'package_id'  => $id,
                    'activity_id' => $activityId,
                ]);
            }
        }
    });

    return redirect()
        ->route('event.packages')
        ->with('success', 'Package updated successfully!');
}







    // public function destroy($id)
    // {
    //     // ✅ Get package first to delete image
    //     $package = DB::table('events_package')->where('id', $id)->first();
        
    //     if ($package && $package->main_image) {
    //         Storage::disk('public')->delete($package->main_image);
    //     }
        
    //     $deleted = DB::table('events_package')->where('id', $id)->delete();

    //     if ($deleted) {
    //         return redirect()->route('event.packages')->with('success', 'Package deleted successfully!');
    //     }

    //     return redirect()->route('event.packages')->with('error', 'Package not found!');
    // }


    public function destroy($id)
{
    // Get package first
    $package = DB::table('events_package')->where('id', $id)->first();
    
    if (!$package) {
        return redirect()->route('event.packages')->with('error', 'Package not found!');
    }
    
    // ✅ STEP 1: Delete related event requests first
    DB::table('event_requests')->where('event_package_id', $id)->delete();
    
    // ✅ STEP 2: Delete related activities
    DB::table('event_package_activity')->where('package_id', $id)->delete();
    
    // ✅ STEP 3: Delete the image if it exists
    if ($package->main_image) {
        Storage::disk('public')->delete($package->main_image);
    }
    
    // ✅ STEP 4: Delete the package
    DB::table('events_package')->where('id', $id)->delete();

    return redirect()->route('event.packages')->with('success', 'Package deleted successfully!');
}


private function updatePackageRules($packageId, $rules)
{
    $configPath = config_path('package_rules.php');
    $currentConfig = include $configPath;
    
    // Filter out null values and add new package rules
    $newRules = array_filter([
        'min_age' => $rules['min_age'] ?? null,
        'max_age' => $rules['max_age'] ?? null,
        'min_visitors' => $rules['min_visitors'] ?? null,
        'max_visitors' => $rules['max_visitors'] ?? null,
        'suitable_gender' => $rules['suitable_gender'] ?? 'mixed',
    ], function($value) {
        return $value !== null && $value !== '';
    });
    
    // Only add if there are rules to add
    if (!empty($newRules)) {
        $currentConfig['packages'][$packageId] = $newRules;
    }
    
    // Write back to config file
    $content = "<?php\n\nreturn " . var_export($currentConfig, true) . ";\n";
    file_put_contents($configPath, $content);
    
    // Clear config cache
    \Artisan::call('config:clear');
}



    // Delete a package
    // public function destroy($id)
    // {
    //     $deleted = DB::table('events_package')->where('id', $id)->delete();

    //     if ($deleted) {
    //         return redirect()->route('event.packages')->with('success', 'Package deleted successfully!');
    //     }

    //     return redirect()->route('event.packages')->with('error', 'Package not found!');
    // }




    //hay already commented
    // Edit a package
    // public function edit($id)
    // {
    //     $package = DB::table('events_package')->where('id', $id)->first();
    //     return Inertia::render('EventPackages/EditPackagePage', ['package' => $package]);
    // }
    // Edit a package




//     public function edit($id)
// {
//     $package = DB::table('events_package')->where('id', $id)->first();

//     // Get selected activities for this package
//     $selectedActivities = DB::table('event_package_activity')
//         ->where('package_id', $id)
//         ->pluck('activity_id')
//         ->toArray();

//     // Get all activities for the select
//     $activities = DB::table('activities')->get();

//     return Inertia::render('EventPackages/EditPackagePage', [
//         'package' => $package,
//         'activities' => $activities,
//         'selectedActivities' => $selectedActivities,
//     ]);
// }

// public function update(Request $request, $id)
// {
//     $request->validate([
//         'package_title' => 'required|string|max:255',
//         'description'   => 'nullable|string',
//         'main_image'    => 'nullable|string',
//         'total_price'   => 'required|numeric',
//         'event_time'    => 'required',
//         'activity_ids'  => 'required', // array of IDs
//     ]);

//     // Update package
//     DB::table('events_package')->where('id', $id)->update([
//         'package_title' => $request->package_title,
//         'description'   => $request->description,
//         'main_image'    => $request->main_image,
//         'total_price'   => $request->total_price,
//         'event_time'    => $request->event_time,
//     ]);

//     // Delete old activities
//     DB::table('event_package_activity')->where('package_id', $id)->delete();

//     // Insert new activities
//     foreach ($request->activity_ids as $activityId) {
//         DB::table('event_package_activity')->insert([
//             'package_id' => $id,
//             'activity_id' => $activityId,
//         ]);
//     }

//     return redirect()->route('event.packages')->with('success', 'Package updated successfully!');
// }


//li fu2 already commented

//kenet sa7 li fu2 abl multiple act

public function edit($id)
{
    // Get the package
    $package = DB::table('events_package')->where('id', $id)->first();

    if (!$package) {
        return redirect()->route('event.packages')->with('error', 'Package not found!');
    }

    // Get selected activities for this package
    $activityIds = DB::table('event_package_activity')
        ->where('package_id', $id)
        ->pluck('activity_id')
        ->toArray();

    // Attach activity_ids to package object
    $package->activity_ids = $activityIds;

    // Get all activities for the dropdown
    $activities = DB::table('activities')->get();

    return Inertia::render('EventPackages/EditPackagePage', [
        'package' => $package,
        'activities' => $activities,
        'auth' => [
            'user' => Auth::user(),
        ],
    ]);
}
// public function edit($id)
//     {
//         $package = DB::table('events_package')
//             ->where('id', $id)
//             ->first();

//         if (!$package) {
//             abort(404);
//         }

//         // Get selected activities for this package
//         $activityIds = DB::table('event_package_activity')
//             ->where('package_id', $id)
//             ->pluck('activity_id')
//             ->toArray();

//         // Attach activity_ids directly to package (IMPORTANT)
//         $package->activity_ids = $activityIds;

//         // Get all activities
//         $activities = DB::table('activities')->get();

//         return Inertia::render('EventPackages/EditPackagePage', [
//             'package' => $package,
//             'activities' => $activities,
//         ]);
//     }

    // public function update(Request $request, $id)
    // {
    //     $request->validate([
    //         'package_title' => 'required|string|max:255',
    //         'description'   => 'nullable|string',
    //         'main_image'    => 'nullable|string',
    //         'total_price'   => 'required|numeric',
    //         'event_time'    => 'required',
    //         'activity_ids'  => 'required|array',
    //         'activity_ids.*'=> 'exists:activities,id',
    //     ]);

    //     DB::transaction(function () use ($request, $id) {

    //         // Update package
    //         DB::table('events_package')
    //             ->where('id', $id)
    //             ->update([
    //                 'package_title' => $request->package_title,
    //                 'description'   => $request->description,
    //                 'main_image'    => $request->main_image,
    //                 'total_price'   => $request->total_price,
    //                 'event_time'    => $request->event_time,
    //             ]);

    //         // Reset activities
    //         DB::table('event_package_activity')
    //             ->where('package_id', $id)
    //             ->delete();

    //         // Insert new activities
    //         foreach ($request->activity_ids as $activityId) {
    //             DB::table('event_package_activity')->insert([
    //                 'package_id'  => $id,
    //                 'activity_id' => $activityId,
    //             ]);
    //         }
    //     });

    //     return redirect()
    //         ->route('event.packages')
    //         ->with('success', 'Package updated successfully!');
    // }

//     public function edit($id)
// {
//     $package = DB::table('events_package')->where('id', $id)->first();
//     $activities = DB::table('activities')->get(); // fetch all activities

//     return Inertia::render('EventPackages/EditPackagePage', [
//         'package' => $package,
//         'activities' => $activities,
//     ]);
// }


//     // Update a package
//     public function update(Request $request, $id)
//     {
//         $request->validate([
//             'package_title' => 'required|string|max:255',
//             'description'   => 'nullable|string',
//             'main_image'    => 'nullable|string',
//             'total_price'   => 'required|numeric',
//             'event_time'    => 'required',
//             'activity_id'   => 'required|integer|exists:activities,id',
//         ]);

//         DB::table('events_package')
//             ->where('id', $id)
//             ->update([
//                 'package_title' => $request->package_title,
//                 'description'   => $request->description,
//                 'main_image'    => $request->main_image,
//                 'total_price'   => $request->total_price,
//                 'event_time'    => $request->event_time,
//                 'activity_id'   => $request->activity_id,
//             ]);

//         return redirect()->route('packages')->with('success', 'Package updated successfully!');
//     }
}
