<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class EventsPackage
 * 
 * @property int $id
 * @property string|null $description
 * @property string $package_title
 * @property string|null $main_image
 * 
 * @property Collection|EventRequest[] $event_requests
 *
 * @package App\Models
 */
class EventsPackage extends Model
{
	protected $table = 'events_package';
	public $timestamps = false;

	protected $fillable = [
    'description',
    'package_title',
    'main_image',
    'total_price',
    'event_time',
    'activity_id',
];


	public function event_requests()
	{
		return $this->hasMany(EventRequest::class, 'event_package_id');
	}
}
