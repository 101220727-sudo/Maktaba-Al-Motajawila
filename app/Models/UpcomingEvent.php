<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UpcomingEvent extends Model
{
    use HasFactory;

    // Table name (because it's not plural-standard)
    protected $table = 'upcomingevents';

    // Allow mass assignment
    protected $fillable = [
        'title',
        'description1',
        'description2',
    ];

    // We only have created_at (no updated_at)
    const UPDATED_AT = null;
}