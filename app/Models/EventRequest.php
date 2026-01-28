<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class EventRequest
 * 
 * @property int $id
 * @property int $user_id
 * @property int $event_package_id
 * @property Carbon $event_date
 * @property string $location
 * @property int $age
 * @property int $nb_of_visitors
 * @property string $phone
 * @property string|null $status
 * 
 * @property EventsPackage $events_package
 * @property User $user
 *
 * @package App\Models
 */
class EventRequest extends Model
{
	protected $table = 'event_requests';
	public $timestamps = false;

	protected $casts = [
		'user_id' => 'int',
		'event_package_id' => 'int',
		'event_date' => 'datetime',
		'age' => 'int',
		'nb_of_visitors' => 'int'
	];

	protected $fillable = [
		'user_id',
		'event_package_id',
		'event_date',
		'location',
		'age',
		'nb_of_visitors',
		'phone',
		'status'
	];
	

	public function events_package()
	{
		return $this->belongsTo(EventsPackage::class, 'event_package_id');
	}

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
