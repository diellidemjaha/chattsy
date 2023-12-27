<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friendship extends Model
{
    use HasFactory;
    protected $fillable = ['user1_id', 'user2_id', 'status'];
    public function sender()
    {
        return $this->belongsTo(User::class, 'user1_id', 'id');
    }
    // public function sender()
    // {
    //     return $this->belongsTo(User::class, 'user1_id', 'id');
    // }

    // Define the relationship with the User model for the receiver
    public function receiver()
    {
        return $this->belongsTo(User::class, 'user2_id', 'id');
    }

}
