<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activities extends Model
{
    use HasFactory;

    // Table name (optional if it matches 'activities')
    protected $table = 'activities';

    // Columns we can mass assign
    protected $fillable = [
        'name',
    ];

    // If you want timestamps (created_at, updated_at)
    public $timestamps = true;

    // Relationship: one activity has many event packages
    public function eventPackages()
    {
        return $this->hasMany(EventPackage::class, 'activity_id');
    }
}
