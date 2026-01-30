<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\EventsPackage;
use App\Models\TypesOfUser;
use App\Http\Controllers\Api\EventRequestController;
use App\Http\Controllers\Api\EventPackageController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\Api\UpcomingEventsController;

use Illuminate\Http\Request;
use App\Models\News;

use Illuminate\Support\Facades\Auth;

Route::get('/user-types', function () {
    return TypesOfUser::whereNotIn('name', ['Admin'])->get(['id','name']);
});

Route::get('/news/add', function () {
    return Inertia::render('News/AddNewsPage',
    [
        'auth' => [
            'user' => Auth::user() // pass logged-in user to React
        ]
    ]
);
})->name('news.add');





// List page
Route::get('/upcoming-events', [UpcomingEventsController::class, 'index'])
    ->name('upcoming-events.index');

// Add form page
Route::get('/upcoming-events/create', [UpcomingEventsController::class, 'create'])
    ->name('upcoming-events.create');

// Form submit
Route::post('/upcoming-events', [UpcomingEventsController::class, 'store'])
    ->name('upcoming-events.store');

// Route::get('/packages', function () {
//     $packages = EventsPackage::all(); // fetch all packages
//     $user = Auth::user()->load('role'); // load user with role

//     return Inertia::render('EventPackages/PackagesPage', [
//         'packages' => $packages,
//         'auth' => [
//             'user' => $user,
//         ],
//     ]);
// })->middleware(['auth'])->name('packages');




// Route::get('/packages/add', function () {
//     return Inertia::render('EventPackages/AddPackagePage', [
//         'auth' => [
//             'user' => Auth::user()
//         ]
//     ]);
// })->middleware(['auth'])->name('packages.add');
Route::get('/packages/add', function () {
    $activities = DB::table('activities')->get(); // fetch all activities from SQL

    return Inertia::render('EventPackages/AddPackagePage', [
        'auth' => [
            'user' => Auth::user()
        ],
        'activities' => $activities, // pass to React
    ]);
})->middleware(['auth'])->name('packages.add');

Route::post('/packages', [EventPackageController::class, 'store'])->name('packages.store');


// To this:
Route::match(['put', 'post'], '/packages/{id}', [EventPackageController::class, 'update'])
    ->middleware(['auth'])
    ->name('packages.update');


Route::delete('/packages/{id}', [EventPackageController::class, 'destroy'])->name('packages.destroy');

Route::get('/packages/{id}/edit', [EventPackageController::class, 'edit'])->name('packages.edit');
// Route::put('/packages/{id}', [EventPackageController::class, 'update'])->name('packages.update');




Route::get('/news', function () {
    $news = News::orderBy('published_at', 'desc')->get();

    return Inertia::render('News/NewsPage', [
        'news' => $news,
        'auth' => [
            // 'user' => Auth::user()->load('role'),
                        'user' => Auth::check() ? Auth::user()->load('role') : null,

        ],
    ]);
// })->middleware(['auth'])->name('news');
})->name('news');



// Route::get('/event-packages', function () {
//     $packages = EventsPackage::all(); // fetch all packages
//     $user = Auth::user()->load('role'); // load role

//     return Inertia::render('EventPackages/PackagesPage', [
//         'packages' => $packages,
//         'auth' => [
//             'user' => $user,
//         ],
//     ]);
// })->middleware(['auth'])->name('event.packages');



// Route::get('/event-packages', function () {
//     $packages = DB::table('events_package')->get();

//     // fetch activities for each package
//     $packages = $packages->map(function($pkg) {
//         $activities = DB::table('event_package_activity')
//             ->join('activities', 'event_package_activity.activity_id', '=', 'activities.id')
//             ->where('event_package_activity.package_id', $pkg->id)
//             ->select('activities.name')
//             ->get()
//             ->pluck('name'); // get only names
//         $pkg->activities = $activities; // attach array of activity names
//         return $pkg;
//     });

//     $user = Auth::user()->load('role');

//     return Inertia::render('EventPackages/PackagesPage', [
//         'packages' => $packages,
//         'auth' => ['user' => $user],
//     ]);
// })->middleware(['auth'])->name('event.packages');



// //the truest version
// Route::get('/event-packages', function () {

//     $packages = DB::table('events_package')->get();

//     $packages = $packages->map(function ($pkg) {

//         $pkg->activities = DB::table('event_package_activity')
//             ->join('activities', 'event_package_activity.activity_id', '=', 'activities.id')
//             ->where('event_package_activity.package_id', $pkg->id)
//             ->pluck('activities.name')   // returns Collection of names
//             ->toArray();                 // convert to array for React

//         return $pkg;
//     });

//     $user = Auth::user()?->load('role');

//     return Inertia::render('EventPackages/PackagesPage', [
//         'packages' => $packages,
//         'auth' => [
//             'user' => $user
//         ],
//     ]);
// })->middleware('auth')->name('event.packages');
Route::get('/event-packages', function (Request $request) {

    // Get package rules from config
    $packageRules = config('package_rules.packages', []);

    // Get all packages
    $packages = DB::table('events_package')->get();

    // Map activities to each package
    $packages = $packages->map(function ($pkg) {
        $pkg->activities = DB::table('event_package_activity')
            ->join('activities', 'event_package_activity.activity_id', '=', 'activities.id')
            ->where('event_package_activity.package_id', $pkg->id)
            ->pluck('activities.name')
            ->toArray();
        return $pkg;
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
        })->values(); // Re-index the collection
    }

    $user = Auth::user()?->load('role');

    return Inertia::render('EventPackages/PackagesPage', [
        'packages' => $packages,
        'auth' => [
            'user' => $user
        ],
    ]);
})->middleware('auth')->name('event.packages');


// Route::get('/event-packages', function () {
//     $packages = DB::table('events_package')
//         ->join('activities', 'events_package.activity_id', '=', 'activities.id')
//         ->select(
//             'events_package.*',
//             'activities.name as activity_name'
//         )
//         ->get();

//     $user = Auth::user()->load('role'); // load role

//     return Inertia::render('EventPackages/PackagesPage', [
//         'packages' => $packages,
//         'auth' => [
//             'user' => $user,
//         ],
//     ]);
// })->middleware(['auth'])->name('event.packages');

Route::middleware('auth')->group(function () {
    Route::get('/events/receive', [EventRequestController::class, 'index'])->name('events.receive');
    Route::put('/event-requests/{id}', [EventRequestController::class, 'update'])->name('event-requests.update');
});


// Route::get('/event-request', function (Request $request) { 
//     $packages = EventsPackage::select('id', 'package_title')->get();

//     $selectedPackageId = $request->query('package_id'); // get package_id from query string

//     return Inertia::render('EventRequest/EventRequestPage', [
//         'packages' => $packages,
//         'selectedPackageId' => $selectedPackageId,
//     ]);
// })->name('event.request');
Route::get('/event-request', function (Request $request) {
    $packages = DB::table('events_package')->get();
    
    // Fetch activities for each package
    $packages = $packages->map(function ($pkg) {
        $pkg->activities = DB::table('event_package_activity')
            ->join('activities', 'event_package_activity.activity_id', '=', 'activities.id')
            ->where('event_package_activity.package_id', $pkg->id)
            ->pluck('activities.name')
            ->toArray();
        return $pkg;
    });

    return Inertia::render('EventRequest/EventRequestPage', [
        'allPackages' => $packages,
        'auth' => [
            'user' => Auth::check() ? Auth::user()->load('role') : null,
        ],
    ]);
})->name('event.request');



Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $user = Auth::user()->load('role'); // load role relationship
    return Inertia::render('Dashboard', [
        'auth' => [
            'user' => $user,
        ],
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');




Route::middleware('auth')->group(function () {

    Route::post('/event-requests', [EventRequestController::class, 'store'])->name('event-requests.store');
    
    Route::delete('/event-requests/{id}/cancel', [EventRequestController::class, 'cancel'])->name('event-requests.cancel');
    Route::get('/my-event-requests', [ProfileController::class, 'myRequests'])->name('my-event-requests'); // NEW ROUTE

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


         Route::get('/manager-dashboard', [ManagerController::class, 'index'])->name('manager.dashboard');
    Route::post('/manager-dashboard/add-admin', [ManagerController::class, 'store'])->name('manager.addAdmin');
    Route::post('/manager-dashboard/update-password/{id}', [ManagerController::class, 'updatePassword'])->name('manager.updatePassword');
    Route::post('/manager-dashboard/pause/{id}', [ManagerController::class, 'pause'])->name('manager.pauseAdmin');
    Route::delete('/manager-dashboard/delete/{id}', [ManagerController::class, 'destroy'])->name('manager.deleteAdmin');
});

// Route::middleware(['auth'])->group(function () {
//         Route::get('/manager-dashboard', [ManagerController::class, 'index'])->name('manager.dashboard');
//     Route::post('/manager-dashboard/add-admin', [ManagerController::class, 'store'])->name('manager.addAdmin');
//     Route::post('/manager-dashboard/update-password/{id}', [ManagerController::class, 'updatePassword'])->name('manager.updatePassword');
//     Route::post('/manager-dashboard/pause/{id}', [ManagerController::class, 'pause'])->name('manager.pauseAdmin');
//     Route::delete('/manager-dashboard/delete/{id}', [ManagerController::class, 'destroy'])->name('manager.deleteAdmin');
// });

require __DIR__.'/auth.php';
