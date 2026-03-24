<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ThueTaiNguyen extends Model
{
    use HasFactory;

    protected $table = 'thuetainguyen';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'mahs', 'madiaban', 'maxp', 'soqd', 'thoidiemlk', 'soqdlk', 'cqbh', 
        'manhom', 'congbo', 'lichsu', 'tinhtrang', 'ghichu', 'thoidiem', 
        'macqcq', 'madv', 'lydo', 'thongtin', 'trangthai', 'thoidiem_h', 
        'macqcq_h', 'madv_h', 'lydo_h', 'thongtin_h', 'trangthai_h', 
        'thoidiem_t', 'macqcq_t', 'madv_t', 'lydo_t', 'thongtin_t', 
        'trangthai_t', 'thoidiem_ad', 'macqcq_ad', 'madv_ad', 'lydo_ad', 
        'thongtin_ad', 'trangthai_ad', 'ipf1', 'ipf2', 'ipf3', 'ipf4', 
        'ipf5', 'truyendulieu', 'thoigiantruyen'
    ];

    public function details()
    {
        return $this->hasMany(ThueTaiNguyenCt::class, 'mahs', 'mahs');
    }
}
