<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventPackageActivity extends Model
{
    // Specify the table if it doesn't follow Laravel's naming convention
    protected $table = 'event_package_activity';

    // Allow mass assignment for these fields
    protected $fillable = [
        'package_id',
        'activity_id',
    ];

    // Disable timestamps if your pivot table doesn't have created_at/updated_at
    public $timestamps = false;

    // Optional: define relationships for convenience
    public function package()
    {
        return $this->belongsTo(EventsPackage::class, 'package_id');
    }


    public function activity()
    {
        return $this->belongsTo(Activity::class, 'activity_id');
    }
}
