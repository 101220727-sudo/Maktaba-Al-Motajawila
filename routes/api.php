<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NewsController;


use App\Http\Controllers\Api\EventRequestController;
use App\Http\Controllers\Api\EventPackageController;

use App\Models\UpcomingEvent;
use App\Http\Controllers\Api\RagChatController;


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/event-requests', [EventRequestController::class, 'store']);

  
});

Route::get('/news', [NewsController::class, 'index']);

Route::get('/event-packages', [EventPackageController::class, 'index']);
//i think hay l store ma ba2a bde yha
Route::post('/event-packages', [EventPackageController::class, 'store']);
Route::delete('/event-packages/{id}', [EventPackageController::class, 'destroy']);

Route::post('/news', [NewsController::class, 'store']);

// Route::delete('/news/{id}', [App\Http\Controllers\Api\NewsController::class, 'destroy']);
Route::get('/packages', [EventPackageController::class, 'index']);



// Route::get('/news', [NewsController::class, 'index']);
// Route::post('/news', [NewsController::class, 'store']);
Route::delete('/news/{id}', [NewsController::class, 'destroy']);


Route::get('/event-packages', [EventPackageController::class, 'index'])->name('event.packages.index');
Route::get('/event-packages/{id}', [EventPackageController::class, 'show'])->name('event.packages.show');


Route::get('/events', function() {
    return UpcomingEvent::orderBy('created_at', 'desc')->get();
});

Route::post('/rag/chat', [RagChatController::class, 'chat']);

