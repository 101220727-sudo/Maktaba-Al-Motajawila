<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable; // ✅ important
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Role;
use App\Models\TypesOfUser;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'users';
    public $timestamps = false;

    protected $casts = [
        'type_id' => 'int',
        'role_id' => 'int'
    ];

    protected $hidden = [
        'password'
    ];

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'type_id',
        'role_id'
    ];

public function role() {
    return $this->belongsTo(Role::class, 'role_id');
}


    public function types_of_user()
    {
        return $this->belongsTo(TypesOfUser::class, 'type_id');
    }
}

