<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DsDiaBan extends Model
{
    use HasFactory;

    protected $table = 'dsdiaban';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'madiaban', 'madiaban_cu', 'tendiaban', 'level', 'ghichu'
    ];
}
