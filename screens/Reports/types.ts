import { ComponentType } from 'react';

export type PeriodType = 'day' | 'month' | 'quarter' | 'year';

export type ReportType = 'stc_ubnd' | 'dinh_gia' | 'ke_khai' | 'tham_dinh' | 'thi_truong' | 'vlxd';

export interface ReportOption {
    id: string;
    title: string;
    description: string;
    icon: ComponentType<{ size?: number; color?: string }>;
    color: string;
    bgColor: string;
    type: ReportType;
    loaiGia?: 'DG' | 'KKG';
}
