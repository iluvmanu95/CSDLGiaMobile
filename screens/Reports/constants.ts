import {
    FileText,
    TrendingUp,
    FileSpreadsheet,
    Landmark,
    ShoppingCart,
    HardHat
} from 'lucide-react-native';
import { ReportOption } from './types';

export const REPORT_OPTIONS: ReportOption[] = [
    {
        id: 'stc_ubnd',
        title: 'Báo cáo phục vụ lãnh đạo STC - UBND tỉnh',
        description: 'Tổng hợp số liệu điều hành và báo cáo định kỳ cho lãnh đạo',
        icon: Landmark,
        color: '#2563eb',
        bgColor: '#eff6ff',
        type: 'stc_ubnd'
    },
    {
        id: 'dinh_gia',
        title: 'Báo cáo Tổng hợp và phân tích giá hàng hóa định giá',
        description: 'Thống kê, phân tích biến động các mặt hàng thuộc danh mục định giá',
        icon: TrendingUp,
        color: '#059669',
        bgColor: '#ecfdf5',
        type: 'dinh_gia',
        loaiGia: 'DG'
    },
    {
        id: 'ke_khai',
        title: 'Báo cáo Tổng hợp và phân tích giá kê khai giá',
        description: 'Theo dõi hồ sơ và diễn biến kê khai giá của các tổ chức cá nhân',
        icon: FileSpreadsheet,
        color: '#d97706',
        bgColor: '#fffbeb',
        type: 'ke_khai',
        loaiGia: 'KKG'
    },
    {
        id: 'tham_dinh',
        title: 'Báo cáo Tổng hợp và phân tích giá trị tài sản thẩm định giá',
        description: 'Tổng hợp kết quả thẩm định giá tài sản nhà nước và công sản',
        icon: FileText,
        color: '#7c3aed',
        bgColor: '#f5f3ff',
        type: 'tham_dinh'
    },
    {
        id: 'thi_truong',
        title: 'Báo cáo Tổng hợp và phân tích giá thị trường',
        description: 'Báo cáo khảo sát, chỉ số mặt bằng giá cả thị trường định kỳ',
        icon: ShoppingCart,
        color: '#db2777',
        bgColor: '#fdf2f8',
        type: 'thi_truong'
    },
    {
        id: 'vlxd',
        title: 'Khai thác tổng hợp giá Vật liệu xây dựng',
        description: 'Tra cứu, thống kê và phân tích công bố giá vật liệu xây dựng',
        icon: HardHat,
        color: '#ea580c',
        bgColor: '#fff7ed',
        type: 'vlxd'
    }
];
