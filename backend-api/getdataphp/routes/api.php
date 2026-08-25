<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::get('/getUsers', [\App\Http\Controllers\AuthController::class, 'getUsers']);

Route::get('/thuetainguyen/stats', [\App\Http\Controllers\ThueTaiNguyenController::class, 'getStats']);
Route::get('/thuetainguyen', [\App\Http\Controllers\ThueTaiNguyenController::class, 'index']);
Route::get('/thuetainguyen/{mahs}', [\App\Http\Controllers\ThueTaiNguyenController::class, 'show']);

Route::get('/dsdonvi', [\App\Http\Controllers\AdministrativeController::class, 'getDonVi']);
Route::get('/dsdiaban', [\App\Http\Controllers\AdministrativeController::class, 'getDiaBan']);


