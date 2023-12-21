<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Message;

class Conversation extends Model
{
    use HasFactory;
    protected $fillable = [
        'user1_id', 'user2_id',
    ];
    public function users()
{
    return $this->belongsToMany(User::class);
}

public function messages()
{
    return $this->hasMany(Message::class);
}
}
