<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DsDonVi extends Model
{
    use HasFactory;

    protected $table = 'dsdonvi';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'madiaban', 'madiaban_cu', 'maqhns', 'madv', 'madv_cu', 'tendv', 
        'diachi', 'ttlienhe', 'emailql', 'emailqt', 'songaylv', 
        'tendvhienthi', 'tendvcqhienthi', 'chucvuky', 'chucvukythay', 
        'nguoiky', 'diadanh', 'chucnang'
    ];
}
