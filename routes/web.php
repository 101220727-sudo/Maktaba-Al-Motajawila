<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\EventsPackage;
use App\Models\TypesOfUser;
use App\Http\Controllers\Api\EventRequestController;
use App\Http\Controllers\Api\EventPackageController;
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




Route::get('/packages', function () {
    $packages = EventsPackage::all(); // fetch all packages
    $user = Auth::user()->load('role'); // load user with role

    return Inertia::render('EventPackages/PackagesPage', [
        'packages' => $packages,
        'auth' => [
            'user' => $user,
        ],
    ]);
})->middleware(['auth'])->name('packages');




Route::get('/packages/add', function () {
    return Inertia::render('EventPackages/AddPackagePage', [
        'auth' => [
            'user' => Auth::user()
        ]
    ]);
})->middleware(['auth'])->name('packages.add');


Route::post('/packages', [EventPackageController::class, 'store'])->name('packages.store');


Route::delete('/packages/{id}', [EventPackageController::class, 'destroy'])->name('packages.destroy');

Route::get('/packages/{id}/edit', [EventPackageController::class, 'edit'])->name('packages.edit');
Route::put('/packages/{id}', [EventPackageController::class, 'update'])->name('packages.update');




Route::get('/news', function () {
    $news = News::orderBy('published_at', 'desc')->get();

    return Inertia::render('News/NewsPage', [
        'news' => $news,
        'auth' => [
            'user' => Auth::user()->load('role'),
        ],
    ]);
})->middleware(['auth'])->name('news');



Route::get('/event-packages', function () {
    $packages = EventsPackage::all(); // fetch all packages
    $user = Auth::user()->load('role'); // load role

    return Inertia::render('EventPackages/PackagesPage', [
        'packages' => $packages,
        'auth' => [
            'user' => $user,
        ],
    ]);
})->middleware(['auth'])->name('event.packages');


Route::middleware('auth')->group(function () {
    Route::get('/events/receive', [EventRequestController::class, 'index'])->name('events.receive');
    Route::put('/event-requests/{id}', [EventRequestController::class, 'update'])->name('event-requests.update');
});


Route::get('/event-request', function (Request $request) { 
    $packages = EventsPackage::select('id', 'package_title')->get();

    $selectedPackageId = $request->query('package_id'); // get package_id from query string

    return Inertia::render('EventRequest/EventRequestPage', [
        'packages' => $packages,
        'selectedPackageId' => $selectedPackageId,
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
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
