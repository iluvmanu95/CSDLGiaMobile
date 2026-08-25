<?php

namespace App\Http\Controllers;

use App\Models\DsDonVi;
use App\Models\DsDiaBan;
use Illuminate\Http\Request;

class AdministrativeController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/dsdonvi",
     *     tags={"Administrative"},
     *     summary="Lấy danh sách đơn vị",
     *     description="Trả về toàn bộ danh sách các đơn vị",
     *     @OA\Response(
     *         response=200,
     *         description="Thành công",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", type="array", @OA\Items(type="object"))
     *         )
     *     )
     * )
     */
    public function getDonVi()
    {
        try {
            $data = DsDonVi::all();
            return response()->json([
                'success' => true,
                'data' => $data
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi lấy dữ liệu đơn vị: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/dsdiaban",
     *     tags={"Administrative"},
     *     summary="Lấy danh sách địa bàn",
     *     description="Trả về toàn bộ danh sách các địa bàn hành chính",
     *     @OA\Response(
     *         response=200,
     *         description="Thành công",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", type="array", @OA\Items(type="object"))
     *         )
     *     )
     * )
     */
    public function getDiaBan()
    {
        try {
            $data = DsDiaBan::all();
            return response()->json([
                'success' => true,
                'data' => $data
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi lấy dữ liệu địa bàn: ' . $e->getMessage()
            ], 500);
        }
    }
}
