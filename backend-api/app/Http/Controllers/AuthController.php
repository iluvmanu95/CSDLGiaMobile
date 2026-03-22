<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

/**
 * @OA\Info(
 *     title="API Đăng Nhập",
 *     version="1.0.0",
 *     description="Tài liệu API cho ứng dụng Mobile"
 * )
 */
class AuthController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/login",
     *     tags={"Authentication"},
     *     summary="Đăng nhập hệ thống",
     *     description="Cho phép người dùng đã có tài khoản trong SQL Server đăng nhập",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"username","password"},
     *             @OA\Property(property="username", type="string", example="admin"),
     *             @OA\Property(property="password", type="string", example="123456")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Đăng nhập thành công",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Đăng nhập thành công"),
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 @OA\Property(property="token", type="string")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Sai tên đăng nhập hoặc mật khẩu",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Tên đăng nhập hoặc mật khẩu không đúng")
     *         )
     *     )
     * )
     */
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('username', $request->username)
                    ->where('password', md5($request->password))
                    ->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Tên đăng nhập hoặc mật khẩu không đúng'
            ], 401);
        }

        // Trả về user và token giả lập (bạn có thể thay thế bằng JWT/Sanctum thật nếu cần)
        return response()->json([
            'success' => true,
            'message' => 'Đăng nhập thành công',
            'data' => [
                'user' => $user,
                'token' => base64_encode(random_bytes(32))
            ]
        ], 200);
    }
}
