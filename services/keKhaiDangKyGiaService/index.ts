import apiClient from '../apiClient';

export interface KeKhaiDangKyGiaItem {
    id: string;
    doanhNghiepQuanLyId: string;
    maHoSo?: string;
    phanLoai?: string;
    maNghe?: string;
    donViQuanLyId: string;
    donViDongChuyenId?: string;
    soQd?: string;
    ngayQd: string;
    soQdLk?: string;
    ngayQdLk: string;
    ngayThucHien: string;
    ngayTraHoSo: string;
    thoiGianThucHien: string;
    donViTinh?: string;
    ghiChu?: string;
    thongTinNguoiChuyen?: string;
    soDtNguoiChuyen?: string;
    ngayChuyen: string;
    trangThai?: string;
    lyDo?: string;
    soHsDuyet?: string;
    ngayDuyet: string;
    ytCauThanhGia?: string;
    thyDgGadGia?: string;
    thoiDiem: string;
    chucDanhKy?: string;
    hoTenNguoiKy?: string;
    trangThaiCsdlqg?: string;
    ngayKetNoi: string;
    chiTietExcel?: string;
}

export interface KeKhaiDangKyGiaResponse {
    success: boolean;
    data: KeKhaiDangKyGiaItem[];
    message?: string;
}

export interface KeKhaiDangKyGiaDetailResponse {
    success: boolean;
    data: KeKhaiDangKyGiaItem;
    message?: string;
}

export const keKhaiDangKyGiaService = {
    async getAll(params?: {
        maNghe?: string;
        phanLoai?: string;
        trangThai?: string;
        doanhNghiepQuanLyId?: string;
        donViQuanLyId?: string;
    }): Promise<KeKhaiDangKyGiaResponse> {
        return apiClient.get<KeKhaiDangKyGiaResponse>('/KeKhaiDangKyGia', params);
    },

    async getById(id: string): Promise<KeKhaiDangKyGiaDetailResponse> {
        return apiClient.get<KeKhaiDangKyGiaDetailResponse>(`/KeKhaiDangKyGia/${id}`);
    }
};

export default keKhaiDangKyGiaService;
