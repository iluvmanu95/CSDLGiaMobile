import apiClient from '../apiClient';

export interface DinhGiaItem {
    id: string;
    maNghe?: string;
    maHoSo?: string;
    soQd?: string;
    moTa?: string;
    congBo?: string;
    ghiChu?: string;
    thoiDiem: string;
    lyDo?: string;
    thongTin?: string;
    trangThai?: string;
    ngayCongBo: string;
    ngayDuyet: string;
    chiTietExcel?: string;
    createdBy: string;
    createdDate: string;
    updatedBy: string;
    updatedDate: string;
    donViQuanLyId: string;
}

export interface DinhGiaResponse {
    success: boolean;
    data: DinhGiaItem[];
    message?: string;
}

export interface DinhGiaDetailResponse {
    success: boolean;
    data: DinhGiaItem;
    message?: string;
}

export const dinhGiaService = {
    async getAll(params?: { maNghe?: string; trangThai?: string; donViQuanLyId?: string }): Promise<DinhGiaResponse> {
        return apiClient.get<DinhGiaResponse>('/DinhGia', params);
    },

    async getById(id: string): Promise<DinhGiaDetailResponse> {
        return apiClient.get<DinhGiaDetailResponse>(`/DinhGia/${id}`);
    }
};

export default dinhGiaService;
