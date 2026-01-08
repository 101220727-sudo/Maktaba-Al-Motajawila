<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class News
 * 
 * @property int $id
 * @property string $title
 * @property string $description
 * @property string|null $image
 * @property Carbon|null $published_at
 *
 * @package App\Models
 */
class News extends Model
{
	protected $table = 'news';
	public $timestamps = false;

	protected $casts = [
		'published_at' => 'datetime'
	];

	protected $fillable = [
		'title',
		'description',
		'image',
		'published_at'
	];
}
