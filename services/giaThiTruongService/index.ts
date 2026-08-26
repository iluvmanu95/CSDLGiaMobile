import apiClient from '../apiClient';

export interface GiaThiTruongItem {
    id: string;
    maHoSo?: string;
    diaBanId: string;
    donViQuanLyId: string;
    donViChuQuanId: string;
    thongTuId: string;
    soQd?: string;
    thoidiem: string;
    soQdLk?: string;
    thoiDiemLk: string;
    thang?: string;
    nam?: string;
    congBo?: string;
    lichSu?: string;
    ghiChu?: string;
    lyDo?: string;
    trangThai?: string;
    phanLoaiHoSo?: string;
    chiTietExcel?: string;
    trangThaiCsdlqg?: string;
    ngayKetNoi: string;
    createdBy: string;
    createdDate: string;
    updatedBy: string;
    updatedDate: string;
}

export interface GiaThiTruongResponse {
    success: boolean;
    data: GiaThiTruongItem[];
    message?: string;
}

export interface GiaThiTruongDetailResponse {
    success: boolean;
    data: GiaThiTruongItem;
    message?: string;
}

export const giaThiTruongService = {
    async getAll(params?: {
        thang?: string;
        nam?: string;
        trangThai?: string;
        donViQuanLyId?: string;
        diaBanId?: string;
    }): Promise<GiaThiTruongResponse> {
        return apiClient.get<GiaThiTruongResponse>('/GiaThiTruong', params);
    },

    async getById(id: string): Promise<GiaThiTruongDetailResponse> {
        return apiClient.get<GiaThiTruongDetailResponse>(`/GiaThiTruong/${id}`);
    }
};

export default giaThiTruongService;
