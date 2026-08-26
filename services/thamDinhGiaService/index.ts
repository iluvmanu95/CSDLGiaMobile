import apiClient from '../apiClient';

export interface ThamDinhGiaItem {
    id: string;
    diaBanId: string;
    donViQuanLyId: string;
    donViChuQuanId: string;
    diaDiem?: string;
    dvYeuCau?: string;
    thoiHan: string;
    soTbKl?: string;
    phanLoai?: string;
    soQdPheDuyet?: string;
    ngayQdPheDuyet: string;
    soNgayKq: number;
    ttTsTd?: string;
    congBo?: string;
    ghiChu?: string;
    thoidiem: string;
    lyDo?: string;
    thongTin?: string;
    trangThai?: string;
    trangThaiCsdlqg?: string;
    ngayKetNoi: string;
    ipf1?: string;
    createdBy: string;
    createdDate: string;
    updatedBy: string;
    updatedDate: string;
    chiTietExcel?: string;
    donViThamDinhId: string;
    hoiDongId: string;
    hangHoaId: string;
}

export interface ThamDinhGiaResponse {
    success: boolean;
    data: ThamDinhGiaItem[];
    message?: string;
}

export interface ThamDinhGiaDetailResponse {
    success: boolean;
    data: ThamDinhGiaItem;
    message?: string;
}

export const thamDinhGiaService = {
    async getAll(params?: {
        trangThai?: string;
        donViQuanLyId?: string;
        diaBanId?: string;
    }): Promise<ThamDinhGiaResponse> {
        return apiClient.get<ThamDinhGiaResponse>('/ThamDinhGia', params);
    },

    async getById(id: string): Promise<ThamDinhGiaDetailResponse> {
        return apiClient.get<ThamDinhGiaDetailResponse>(`/ThamDinhGia/${id}`);
    }
};

export default thamDinhGiaService;
