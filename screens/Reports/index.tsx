import styles from './style';
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    ScrollView,
    ActivityIndicator,
    Alert
} from 'react-native';
import {
    FileText,
    TrendingUp,
    FileSpreadsheet,
    Landmark,
    ShoppingCart,
    HardHat,
    ChevronRight,
    X,
    Check,
    Calendar,
    Search
} from 'lucide-react-native';
import { useTheme } from '../../store';
import { danhMucKinhDoanhService, DanhMucKinhDoanhItem } from '../../services';

interface ReportOption {
    id: string;
    title: string;
    description: string;
    icon: any;
    color: string;
    bgColor: string;
    type: 'stc_ubnd' | 'dinh_gia' | 'ke_khai' | 'tham_dinh' | 'thi_truong' | 'vlxd';
    loaiGia?: 'DG' | 'KKG';
}

const REPORT_OPTIONS: ReportOption[] = [
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

type PeriodType = 'day' | 'month' | 'quarter' | 'year';

export const Reports = () => {
    const { isDark } = useTheme();

    // Modal & Selection state
    const [selectedReport, setSelectedReport] = useState<ReportOption | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    // Business category state for DG / KKG
    const [businessList, setBusinessList] = useState<DanhMucKinhDoanhItem[]>([]);
    const [loadingBusiness, setLoadingBusiness] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState<string>('');
    const [searchBusinessText, setSearchBusinessText] = useState('');

    // Period filter state
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const [periodType, setPeriodType] = useState<PeriodType>('month');

    // Date range
    const formatDate = (d: Date) => d.toISOString().split('T')[0];
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

    const [fromDate, setFromDate] = useState<string>(formatDate(firstDayOfYear));
    const [toDate, setToDate] = useState<string>(formatDate(today));
    const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
    const [selectedQuarter, setSelectedQuarter] = useState<number>(Math.ceil(currentMonth / 3));
    const [selectedYear, setSelectedYear] = useState<number>(currentYear);

    // Fetch Danh Mục Kinh Doanh when DG or KKG report is clicked
    const openReportModal = async (report: ReportOption) => {
        setSelectedReport(report);
        setSelectedBusiness('');
        setSearchBusinessText('');
        setModalVisible(true);

        if (report.loaiGia) {
            setLoadingBusiness(true);
            try {
                const targetLoaiGia = report.loaiGia.toUpperCase();
                const res = await danhMucKinhDoanhService.getAll({ loaiGia: targetLoaiGia });
                const dataList = (res?.data || (res as any)?.Data || []) as any[];
                
                if (Array.isArray(dataList)) {
                    // 1. Lọc theo điều kiện LoaiGia
                    const filteredByLoaiGia = dataList.filter(item => {
                        const lg = (item.loaiGia || item.LoaiGia || '')?.toString().toUpperCase();
                        return lg.includes(targetLoaiGia);
                    });

                    // 2. Tách nhóm cha (không có MaNganh) và nhóm con (MaNganh === MaNghe của cha)
                    const parents: any[] = [];
                    const childrenMap: Record<string, any[]> = {};
                    const standalone: any[] = [];

                    filteredByLoaiGia.forEach((item) => {
                        const maNganh = (item.maNganh || item.MaNganh || '').toString().trim();
                        const maNghe = (item.maNghe || item.MaNghe || '').toString().trim();

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

                    setBusinessList(treeList);
                } else {
                    setBusinessList([]);
                }
            } catch (error) {
                console.error('Error fetching DanhMucKinhDoanh:', error);
                setBusinessList([]);
            } finally {
                setLoadingBusiness(false);
            }
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedReport(null);
    };

    const handleSubmitReport = () => {
        if (!selectedReport) return;

        let filterSummary = '';
        if (periodType === 'day') {
            filterSummary = `Từ ngày: ${fromDate} - Đến ngày: ${toDate}`;
        } else if (periodType === 'month') {
            filterSummary = `Tháng ${selectedMonth}/${selectedYear}`;
        } else if (periodType === 'quarter') {
            filterSummary = `Quý ${selectedQuarter}/${selectedYear}`;
        } else if (periodType === 'year') {
            filterSummary = `Năm ${selectedYear}`;
        }

        let businessName = '';
        if (selectedReport.loaiGia) {
            if (selectedBusiness) {
                const found = businessList.find(b => b.id === selectedBusiness || b.maNghe === selectedBusiness);
                businessName = found ? found.tenNghe || found.maNghe || '' : selectedBusiness;
            } else {
                businessName = 'Tất cả lĩnh vực / ngành nghề';
            }
        }

        Alert.alert(
            'Thông tin tra cứu',
            `Báo cáo: ${selectedReport.title}\nThời gian: ${filterSummary}${businessName ? `\nNgành/Nghề: ${businessName}` : ''}`,
            [{ text: 'Đóng', style: 'cancel' }]
        );
    };

    const sortedBusinessList = businessList.filter((item: any) => {
        if (!searchBusinessText.trim()) return true;
        const query = searchBusinessText.toLowerCase();
        const tenNghe = (item.tenNghe || item.TenNghe || '')?.toString().toLowerCase();
        const maNghe = (item.maNghe || item.MaNghe || '')?.toString().toLowerCase();
        const maNganh = (item.maNganh || item.MaNganh || '')?.toString().toLowerCase();
        return tenNghe.includes(query) || maNghe.includes(query) || maNganh.includes(query);
    });

    const yearsList = [currentYear - 2, currentYear - 1, currentYear, currentYear + 1];
    const quartersList = [1, 2, 3, 4];
    const monthsList = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerSection}>
                <Text style={[styles.title, isDark && styles.textDark]}>Báo Cáo Thống Kê</Text>
                <Text style={[styles.subtitle, isDark && styles.textMutedDark]}>
                    Chọn loại báo cáo và thiết lập thông số thời gian để trích xuất số liệu
                </Text>
            </View>

            {/* List of 6 Reports */}
            <View style={styles.reportList}>
                {REPORT_OPTIONS.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.reportCard, isDark && styles.reportCardDark]}
                            activeOpacity={0.7}
                            onPress={() => openReportModal(item)}
                        >
                            <View style={[styles.iconWrapper, { backgroundColor: isDark ? '#334155' : item.bgColor }]}>
                                <IconComponent size={22} color={isDark ? '#93c5fd' : item.color} />
                            </View>

                            <View style={styles.reportContent}>
                                <Text style={[styles.reportTitle, isDark && styles.textDark]}>
                                    {item.title}
                                </Text>
                                <Text style={[styles.reportDescription, isDark && styles.textMutedDark]} numberOfLines={2}>
                                    {item.description}
                                </Text>
                            </View>

                            <View style={styles.arrowWrapper}>
                                <ChevronRight size={20} color={isDark ? '#64748b' : '#94a3b8'} />
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Report Configuration Modal */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContainer, isDark && styles.modalContainerDark]}>
                        {/* Modal Header */}
                        <View style={[styles.modalHeader, isDark && styles.modalHeaderDark]}>
                            <Text style={[styles.modalTitle, isDark && styles.textDark]} numberOfLines={2}>
                                {selectedReport?.title}
                            </Text>
                            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                                <X size={22} color={isDark ? '#cbd5e1' : '#64748b'} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                            {/* Section 1: Business Category (If DG or KKG) */}
                            {selectedReport?.loaiGia && (
                                <View style={{ marginBottom: 8 }}>
                                    <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
                                        Danh mục ngành nghề kinh doanh
                                    </Text>

                                    <TextInput
                                        style={[styles.searchBar, isDark && styles.textInputDark]}
                                        placeholder="Tìm kiếm mã hoặc tên ngành nghề..."
                                        placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
                                        value={searchBusinessText}
                                        onChangeText={setSearchBusinessText}
                                    />

                                    {loadingBusiness ? (
                                        <View style={{ padding: 16, alignItems: 'center' }}>
                                            <ActivityIndicator size="small" color={isDark ? '#3b82f6' : '#222353'} />
                                            <Text style={{ marginTop: 6, fontSize: 12, color: isDark ? '#94a3b8' : '#64748b' }}>
                                                Đang tải danh mục...
                                            </Text>
                                        </View>
                                    ) : (
                                        <ScrollView style={[styles.businessList, isDark && styles.businessListDark]} nestedScrollEnabled>
                                            {/* All option */}
                                            <TouchableOpacity
                                                style={[
                                                    styles.businessItem,
                                                    isDark && styles.businessItemDark,
                                                    selectedBusiness === '' && (isDark ? styles.businessItemActiveDark : styles.businessItemActive)
                                                ]}
                                                onPress={() => setSelectedBusiness('')}
                                            >
                                                <Text
                                                    style={[
                                                        styles.businessItemText,
                                                        styles.businessItemTextParent,
                                                        isDark && styles.businessItemTextDark,
                                                        selectedBusiness === '' && styles.businessItemTextActive
                                                    ]}
                                                >
                                                    Tất cả ngành nghề
                                                </Text>
                                                {selectedBusiness === '' && <Check size={16} color={isDark ? '#38bdf8' : '#222353'} />}
                                            </TouchableOpacity>

                                            {sortedBusinessList.map((biz: any) => {
                                                const bizId = biz.id || biz.Id || biz.maNghe || biz.MaNghe;
                                                const tenNghe = biz.tenNghe || biz.TenNghe || biz.maNghe || biz.MaNghe;
                                                const maNghe = biz.maNghe || biz.MaNghe;
                                                const maNganh = (biz.maNganh || biz.MaNganh || '').toString().trim();
                                                
                                                // Quan hệ: Cha là không có MaNganh, Con là có MaNganh
                                                const isParent = !maNganh || maNganh === 'null' || maNganh === 'undefined';

                                                // Nếu là Cha: Hiển thị dạng Header đề mục nhóm (không click chọn)
                                                if (isParent) {
                                                    return (
                                                        <View
                                                            key={bizId || tenNghe}
                                                            style={[
                                                                styles.businessItemLevel0,
                                                                isDark && styles.businessItemLevel0Dark
                                                            ]}
                                                        >
                                                            <Text
                                                                style={[
                                                                    styles.businessItemTextLevel0,
                                                                    isDark && styles.textDark
                                                                ]}
                                                            >
                                                                {tenNghe}
                                                            </Text>
                                                        </View>
                                                    );
                                                }

                                                // Nếu là Con (có MaNganh): Cho phép click chọn và thụt lề rõ ràng ngay dưới Cha
                                                const isSelected = selectedBusiness === bizId || selectedBusiness === maNghe;
                                                const rawLevel = biz.level ?? biz.Level;
                                                const level = Number(rawLevel ?? 1);
                                                const indentPadding = Math.min(60, 18 + Math.max(0, level - 1) * 16);

                                                return (
                                                    <TouchableOpacity
                                                        key={bizId}
                                                        style={[
                                                            styles.businessItem,
                                                            isDark && styles.businessItemDark,
                                                            isSelected && (isDark ? styles.businessItemActiveDark : styles.businessItemActive),
                                                            { paddingLeft: indentPadding }
                                                        ]}
                                                        onPress={() => setSelectedBusiness(bizId || '')}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.businessItemText,
                                                                styles.businessItemTextChild,
                                                                isDark && styles.businessItemTextDark,
                                                                isSelected && styles.businessItemTextActive
                                                            ]}
                                                        >
                                                            {'↳ '}{tenNghe}
                                                        </Text>
                                                        {isSelected && <Check size={16} color={isDark ? '#38bdf8' : '#222353'} />}
                                                    </TouchableOpacity>
                                                );
                                            })}

                                            {sortedBusinessList.length === 0 && (
                                                <View style={{ padding: 12, alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 12, color: isDark ? '#94a3b8' : '#64748b' }}>
                                                        Không tìm thấy danh mục phù hợp
                                                    </Text>
                                                </View>
                                            )}
                                        </ScrollView>
                                    )}
                                </View>
                            )}

                            {/* Section 2: Period Filter Selector (All Reports) */}
                            <View>
                                <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
                                    Thời Gian Báo Cáo
                                </Text>

                                {/* Tabs: Ngày, Tháng, Quý, Năm */}
                                <View style={[styles.tabSelector, isDark && styles.tabSelectorDark]}>
                                    {(['day', 'month', 'quarter', 'year'] as PeriodType[]).map((tab) => {
                                        const labels: Record<PeriodType, string> = {
                                            day: 'Ngày',
                                            month: 'Tháng',
                                            quarter: 'Quý',
                                            year: 'Năm'
                                        };
                                        const isActive = periodType === tab;
                                        return (
                                            <TouchableOpacity
                                                key={tab}
                                                style={[
                                                    styles.tabItem,
                                                    isActive && (isDark ? styles.tabItemActiveDark : styles.tabItemActive)
                                                ]}
                                                onPress={() => setPeriodType(tab)}
                                            >
                                                <Text
                                                    style={[
                                                        styles.tabItemText,
                                                        isDark && styles.tabItemTextDark,
                                                        isActive && styles.tabItemTextActive
                                                    ]}
                                                >
                                                    {labels[tab]}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </View>

                            {/* Dynamic Inputs based on Period Type */}
                            {periodType === 'day' && (
                                <View style={styles.formRow}>
                                    <View style={styles.formGroup}>
                                        <Text style={[styles.inputLabel, isDark && styles.textMutedDark]}>Từ ngày</Text>
                                        <TextInput
                                            style={[styles.textInput, isDark && styles.textInputDark]}
                                            value={fromDate}
                                            onChangeText={setFromDate}
                                            placeholder="YYYY-MM-DD"
                                            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
                                        />
                                    </View>
                                    <View style={styles.formGroup}>
                                        <Text style={[styles.inputLabel, isDark && styles.textMutedDark]}>Đến ngày</Text>
                                        <TextInput
                                            style={[styles.textInput, isDark && styles.textInputDark]}
                                            value={toDate}
                                            onChangeText={setToDate}
                                            placeholder="YYYY-MM-DD"
                                            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
                                        />
                                    </View>
                                </View>
                            )}

                            {periodType === 'month' && (
                                <View style={{ gap: 12 }}>
                                    <View>
                                        <Text style={[styles.inputLabel, isDark && styles.textMutedDark]}>Chọn tháng</Text>
                                        <View style={styles.pillGrid}>
                                            {monthsList.map((m) => (
                                                <TouchableOpacity
                                                    key={m}
                                                    style={[
                                                        styles.pillItem,
                                                        isDark && styles.pillItemDark,
                                                        selectedMonth === m && (isDark ? styles.pillItemActiveDark : styles.pillItemActive)
                                                    ]}
                                                    onPress={() => setSelectedMonth(m)}
                                                >
                                                    <Text
                                                        style={[
                                                            styles.pillText,
                                                            isDark && styles.pillTextDark,
                                                            selectedMonth === m && styles.pillTextActive
                                                        ]}
                                                    >
                                                        Tháng {m}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>

                                    <View>
                                        <Text style={[styles.inputLabel, isDark && styles.textMutedDark]}>Chọn năm</Text>
                                        <View style={styles.pillGrid}>
                                            {yearsList.map((y) => (
                                                <TouchableOpacity
                                                    key={y}
                                                    style={[
                                                        styles.pillItem,
                                                        isDark && styles.pillItemDark,
                                                        selectedYear === y && (isDark ? styles.pillItemActiveDark : styles.pillItemActive)
                                                    ]}
                                                    onPress={() => setSelectedYear(y)}
                                                >
                                                    <Text
                                                        style={[
                                                            styles.pillText,
                                                            isDark && styles.pillTextDark,
                                                            selectedYear === y && styles.pillTextActive
                                                        ]}
                                                    >
                                                        {y}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            )}

                            {periodType === 'quarter' && (
                                <View style={{ gap: 12 }}>
                                    <View>
                                        <Text style={[styles.inputLabel, isDark && styles.textMutedDark]}>Chọn quý</Text>
                                        <View style={styles.pillGrid}>
                                            {quartersList.map((q) => (
                                                <TouchableOpacity
                                                    key={q}
                                                    style={[
                                                        styles.pillItem,
                                                        isDark && styles.pillItemDark,
                                                        selectedQuarter === q && (isDark ? styles.pillItemActiveDark : styles.pillItemActive)
                                                    ]}
                                                    onPress={() => setSelectedQuarter(q)}
                                                >
                                                    <Text
                                                        style={[
                                                            styles.pillText,
                                                            isDark && styles.pillTextDark,
                                                            selectedQuarter === q && styles.pillTextActive
                                                        ]}
                                                    >
                                                        Quý {q}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>

                                    <View>
                                        <Text style={[styles.inputLabel, isDark && styles.textMutedDark]}>Chọn năm</Text>
                                        <View style={styles.pillGrid}>
                                            {yearsList.map((y) => (
                                                <TouchableOpacity
                                                    key={y}
                                                    style={[
                                                        styles.pillItem,
                                                        isDark && styles.pillItemDark,
                                                        selectedYear === y && (isDark ? styles.pillItemActiveDark : styles.pillItemActive)
                                                    ]}
                                                    onPress={() => setSelectedYear(y)}
                                                >
                                                    <Text
                                                        style={[
                                                            styles.pillText,
                                                            isDark && styles.pillTextDark,
                                                            selectedYear === y && styles.pillTextActive
                                                        ]}
                                                    >
                                                        {y}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            )}

                            {periodType === 'year' && (
                                <View>
                                    <Text style={[styles.inputLabel, isDark && styles.textMutedDark]}>Chọn năm</Text>
                                    <View style={styles.pillGrid}>
                                        {yearsList.map((y) => (
                                            <TouchableOpacity
                                                key={y}
                                                style={[
                                                    styles.pillItem,
                                                    isDark && styles.pillItemDark,
                                                    selectedYear === y && (isDark ? styles.pillItemActiveDark : styles.pillItemActive)
                                                ]}
                                                onPress={() => setSelectedYear(y)}
                                            >
                                                <Text
                                                    style={[
                                                        styles.pillText,
                                                        isDark && styles.pillTextDark,
                                                        selectedYear === y && styles.pillTextActive
                                                    ]}
                                                >
                                                    {y}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            )}
                        </ScrollView>

                        {/* Modal Action Buttons */}
                        <View style={[styles.actionButtons, isDark && styles.actionButtonsDark]}>
                            <TouchableOpacity
                                style={[styles.cancelBtn, isDark && styles.cancelBtnDark]}
                                onPress={handleCloseModal}
                            >
                                <Text style={[styles.cancelBtnText, isDark && styles.cancelBtnTextDark]}>
                                    Đóng
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.submitBtn, isDark && styles.submitBtnDark]}
                                onPress={handleSubmitReport}
                            >
                                <Text style={styles.submitBtnText}>
                                    Xem Báo Cáo
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Reports;
