import apiClient from '../apiClient';

export interface DanhMucDonViTinhItem {
    id: string;
    maDonViTinh?: string;
    tenDonViTinh?: string;
}

export interface DanhMucDonViTinhResponse {
    success: boolean;
    data: DanhMucDonViTinhItem[];
    message?: string;
}

export interface DanhMucDonViTinhDetailResponse {
    success: boolean;
    data: DanhMucDonViTinhItem;
    message?: string;
}

export const danhMucDonViTinhService = {
    async getAll(): Promise<DanhMucDonViTinhResponse> {
        return apiClient.get<DanhMucDonViTinhResponse>('/DanhMucDonViTinh');
    },

    async getById(id: string): Promise<DanhMucDonViTinhDetailResponse> {
        return apiClient.get<DanhMucDonViTinhDetailResponse>(`/DanhMucDonViTinh/${id}`);
    }
};

export default danhMucDonViTinhService;
