<?php

namespace App\Http\Controllers;

use App\Models\ThueTaiNguyen;
use Illuminate\Http\Request;

class ThueTaiNguyenController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/thuetainguyen",
     *     tags={"ThueTaiNguyen"},
     *     summary="Lấy danh sách Thuế Tài Nguyên",
     *     description="Trả về danh sách phân trang các hồ sơ thuế tài nguyên",
     *     @OA\Response(
     *         response=200,
     *         description="Thành công",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", type="object")
     *         )
     *     )
     * )
     */
    public function index()
    {
        try {
            $data = ThueTaiNguyen::orderBy('thoidiem', 'desc')->paginate(15);
            return response()->json([
                'success' => true,
                'data' => $data
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi lấy dữ liệu: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/thuetainguyen/{mahs}",
     *     tags={"ThueTaiNguyen"},
     *     summary="Lấy chi tiết Thuế Tài Nguyên",
     *     description="Trả về thông tin chi tiết và danh sách chi tiết (thuetainguyenct) theo mã hồ sơ",
     *     @OA\Parameter(
     *         name="mahs",
     *         in="path",
     *         description="Mã hồ sơ",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Thành công",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Không tìm thấy hồ sơ"
     *     )
     * )
     */
    public function show($mahs)
    {
        try {
            $header = ThueTaiNguyen::where('mahs', $mahs)->first();

            if (!$header) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy hồ sơ với mã số này.'
                ], 404);
            }

            $details = $header->details;

            return response()->json([
                'success' => true,
                'data' => [
                    'header' => $header,
                    'details' => $details
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi lấy chi tiết: ' . $e->getMessage()
            ], 500);
        }
    }
}
