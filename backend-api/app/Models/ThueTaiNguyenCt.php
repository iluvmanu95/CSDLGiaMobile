<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ThueTaiNguyenCt extends Model
{
    use HasFactory;

    protected $table = 'thuetainguyenct';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'mahs', 'level', 'cap1', 'cap2', 'cap3', 'cap4', 'cap5', 
        'ten', 'dvt', 'gia', 'trangthai', 'maso', 'maso_goc', 'sapxep'
    ];

    public function header()
    {
        return $this->belongsTo(ThueTaiNguyen::class, 'mahs', 'mahs');
    }
}
