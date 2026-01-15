<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TypesOfUser
 * 
 * @property int $id
 * @property string $name
 * 
 * @property Collection|User[] $users
 *
 * @package App\Models
 */
class TypesOfUser extends Model
{
	protected $table = 'types_of_users';
	public $timestamps = false;

	protected $fillable = [
		'name'
	];

	// public function users()
	// {
	// 	return $this->hasMany(User::class, 'type_id');
	// }
	    public function users()
    {
        return $this->hasMany(User::class, 'type_id');
    }
}
