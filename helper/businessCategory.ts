import { danhMucKinhDoanhService, DanhMucKinhDoanhItem } from '../services';

// Hàm lấy STTSapXep an toàn
const getSttValue = (item: any): number => {
    const val = item.sttsapXep ?? item.STTSapXep ?? item.SttsapXep ?? item.SttSapXep ?? item.STTSapxep ?? item.stt ?? item.STT;
    if (val !== undefined && val !== null && val !== '') {
        const num = Number(val);
        if (!isNaN(num)) return num;
    }
    // Nếu không có STTSapXep, thử lấy số từ STTHienThi
    const hienThi = (item.stthienThi || item.STTHienThi || '').toString().trim();
    if (hienThi) {
        const parsed = parseFloat(hienThi);
        if (!isNaN(parsed)) return parsed;
    }
    return 999999;
};

// Sắp xếp các mục theo STTSapXep
const sortByStt = (a: any, b: any) => {
    const orderA = getSttValue(a);
    const orderB = getSttValue(b);
    if (orderA !== orderB) return orderA - orderB;
    const maA = (a.maNghe || a.MaNghe || a.tenNghe || a.TenNghe || '').toString();
    const maB = (b.maNghe || b.MaNghe || b.tenNghe || b.TenNghe || '').toString();
    return maA.localeCompare(maB, undefined, { numeric: true });
};

/**
 * Lấy và xây dựng cây phân cấp ngành nghề kinh doanh theo LoaiGia (DG / KKG)
 */
export const fetchAndBuildBusinessTree = async (loaiGia: string): Promise<DanhMucKinhDoanhItem[]> => {
    const targetLoaiGia = loaiGia.toUpperCase();
    const res = await danhMucKinhDoanhService.getAll({ loaiGia: targetLoaiGia });
    const dataList = (res?.data || (res as any)?.Data || []) as any[];

    if (!Array.isArray(dataList)) return [];

    // 1. Lọc theo điều kiện LoaiGia
    const filteredByLoaiGia = dataList.filter(item => {
        const lg = (item.loaiGia || item.LoaiGia || '')?.toString().toUpperCase();
        return lg.includes(targetLoaiGia);
    });

    // 2. Tách nhóm cha (không có MaNganh) và nhóm con (MaNganh === MaNghe của cha)
    const parents: any[] = [];
    const childrenMap: Record<string, any[]> = {};

    filteredByLoaiGia.forEach((item) => {
        const maNganh = (item.maNganh || item.MaNganh || '').toString().trim();

        // Cha: Không có MaNganh (null, rỗng, hoặc "null" / "undefined")
        const isParent = !maNganh || maNganh === 'null' || maNganh === 'undefined';

        if (isParent) {
            parents.push(item);
        } else {
            // Con: Gom theo MaNganh (chính là MaNghe của cha)
            if (!childrenMap[maNganh]) {
                childrenMap[maNganh] = [];
            }
            childrenMap[maNganh].push(item);
        }
    });

    parents.sort(sortByStt);

    // Ghép con ngay dưới cha tương ứng
    const treeList: any[] = [];
    const addedIds = new Set<string>();

    parents.forEach(p => {
        treeList.push(p);
        const pMaNghe = (p.maNghe || p.MaNghe || '').toString().trim();
        const pId = (p.id || p.Id || pMaNghe).toString();
        addedIds.add(pId);

        // Tìm tất cả con có MaNganh == MaNghe của cha
        const children = childrenMap[pMaNghe] || [];
        children.sort(sortByStt);
        children.forEach(c => {
            treeList.push(c);
            const cId = (c.id || c.Id || c.maNghe || c.MaNghe || '').toString();
            addedIds.add(cId);
        });
    });

    // Thêm những bản ghi con nếu có cha không nằm trong danh sách lọc
    filteredByLoaiGia.forEach(item => {
        const id = (item.id || item.Id || item.maNghe || item.MaNghe || '').toString();
        if (!addedIds.has(id)) {
            treeList.push(item);
            addedIds.add(id);
        }
    });

    return treeList;
};
