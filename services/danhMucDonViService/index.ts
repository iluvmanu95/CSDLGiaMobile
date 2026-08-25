import apiClient from '../apiClient';

export interface DanhMucDonViItem {
    id: string;
    tenDonVi: string;
    level: number;
    sttsapXep?: number;
    donViChuQuanId?: string;
    diaChi?: string;
    maQhns?: string;
    soDienThoai?: string;
    chucDanhQuanLy?: string;
    hoVaTenNguoiQuanLy?: string;
    phanLoaiDonVi?: string;
    tinhNangThanhToan?: boolean;
    createdDate?: string;
    updatedDate?: string;
}

export interface DanhMucDonViResponse {
    success: boolean;
    data: DanhMucDonViItem[];
    message?: string;
}

export interface DanhMucDonViDetailResponse {
    success: boolean;
    data: DanhMucDonViItem;
    message?: string;
}

export const danhMucDonViService = {
    async getAll(level?: number): Promise<DanhMucDonViResponse> {
        const params = level !== undefined ? { level } : undefined;
        return apiClient.get<DanhMucDonViResponse>('/DanhMucDonVi', params);
    },

    async getById(id: string): Promise<DanhMucDonViDetailResponse> {
        return apiClient.get<DanhMucDonViDetailResponse>(`/DanhMucDonVi/${id}`);
    }
};

export default danhMucDonViService;
