import apiClient from '../apiClient';

export interface DanhMucKinhDoanhItem {
    id: string;
    maNganh?: string;
    maNghe?: string;
    tenNghe?: string;
    donViDongChuyenId?: string;
    donViQuanLyId?: string;
    theoDoi?: string;
    phanLoai?: string;
    loaiGia?: string;
    report?: string;
    maHhBtc?: string;
    level: number;
    sttsapXep: number;
    stthienThi?: string;
    role?: string;
    roleGoc?: string;
    createdBy: string;
    createdDate: string;
    updatedBy: string;
    updatedDate: string;
}

export interface DanhMucKinhDoanhResponse {
    success: boolean;
    data: DanhMucKinhDoanhItem[];
    message?: string;
}

export interface DanhMucKinhDoanhDetailResponse {
    success: boolean;
    data: DanhMucKinhDoanhItem;
    message?: string;
}

export const danhMucKinhDoanhService = {
    async getAll(params?: { maNganh?: string; maNghe?: string; loaiGia?: string }): Promise<DanhMucKinhDoanhResponse> {
        return apiClient.get<DanhMucKinhDoanhResponse>('/DanhMucKinhDoanh', params);
    },

    async getById(id: string): Promise<DanhMucKinhDoanhDetailResponse> {
        return apiClient.get<DanhMucKinhDoanhDetailResponse>(`/DanhMucKinhDoanh/${id}`);
    }
};

export default danhMucKinhDoanhService;
