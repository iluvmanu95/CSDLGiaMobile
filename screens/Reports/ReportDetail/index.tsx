import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import {
    TrendingUp,
    FileCheck,
    Clock,
    AlertCircle,
    BarChart3,
    PieChart as PieIcon,
    Waves,
    FileSpreadsheet,
    Building2,
    Calendar
} from 'lucide-react-native';
import styles from './style';
import { useTheme } from '../../../store';
import { ReportOption, PeriodType } from '../types';
import {
    dinhGiaService,
    keKhaiDangKyGiaService,
    thamDinhGiaService,
    giaThiTruongService,
    danhMucDonViService,
    danhMucKinhDoanhService
} from '../../../services';

// Subcomponents from global components folder
import {
    ReportHeader,
    StatSummaryCards,
    StatItem,
    InsightsBanner,
    SineWaveLineChart,
    ChartDataPoint,
    BarChart,
    BarChartDataPoint,
    DonutChart,
    PieDataPoint,
    BreakdownTable,
    BreakdownRow,
    ExportModal
} from '../../../components/Reports';

interface ReportDetailProps {
    report: ReportOption;
    periodType: PeriodType;
    filterSummary: string;
    businessName?: string;
    selectedBusiness?: string;
    selectedMonth?: number;
    selectedQuarter?: number;
    selectedYear?: number;
    fromDate?: string;
    toDate?: string;
    onBack: () => void;
}

export const ReportDetail: React.FC<ReportDetailProps> = ({
    report,
    periodType,
    filterSummary,
    businessName,
    selectedBusiness,
    selectedMonth = 8,
    selectedQuarter = 3,
    selectedYear = new Date().getFullYear(),
    fromDate,
    toDate,
    onBack,
}) => {
    const { isDark } = useTheme();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [exportModalVisible, setExportModalVisible] = useState(false);

    // Calculated Dashboard state
    const [statItems, setStatItems] = useState<StatItem[]>([]);
    const [waveData, setWaveData] = useState<ChartDataPoint[]>([]);
    const [barData, setBarData] = useState<BarChartDataPoint[]>([]);
    const [pieData, setPieData] = useState<PieDataPoint[]>([]);
    const [breakdownRows, setBreakdownRows] = useState<BreakdownRow[]>([]);
    const [insightText, setInsightText] = useState<string>('');
    const [insightHighlights, setInsightHighlights] = useState<string[]>([]);

    const fetchReportData = async () => {
        setLoading(true);
        try {
            let rawList: any[] = [];

            // 1. Fetch real records depending on type
            if (report.type === 'dinh_gia') {
                const res = await dinhGiaService.getAll({ maNghe: selectedBusiness });
                if (res && res.success && Array.isArray(res.data)) {
                    rawList = res.data;
                }
            } else if (report.type === 'ke_khai') {
                const res = await keKhaiDangKyGiaService.getAll({ maNghe: selectedBusiness });
                if (res && res.success && Array.isArray(res.data)) {
                    rawList = res.data;
                }
            } else if (report.type === 'tham_dinh') {
                const res = await thamDinhGiaService.getAll();
                if (res && res.success && Array.isArray(res.data)) {
                    rawList = res.data;
                }
            } else if (report.type === 'thi_truong') {
                const res = await giaThiTruongService.getAll({ nam: selectedYear?.toString() });
                if (res && res.success && Array.isArray(res.data)) {
                    rawList = res.data;
                }
            }

            // 2. Filter records by period criteria
            const activeList = rawList.filter((item) => {
                const dateStr = item.thoiDiem || item.thoidiem || item.createdDate || item.ngayTao;
                if (!dateStr || dateStr.startsWith('0001')) return true; // Keep if no specific date

                const date = new Date(dateStr);
                if (isNaN(date.getTime())) return true;

                if (periodType === 'day') {
                    if (fromDate && toDate) {
                        const from = new Date(fromDate);
                        const to = new Date(toDate);
                        to.setHours(23, 59, 59, 999);
                        return date >= from && date <= to;
                    }
                    return true;
                } else if (periodType === 'month') {
                    if (selectedYear && date.getFullYear() !== Number(selectedYear)) return false;
                    if (selectedMonth && (date.getMonth() + 1) !== Number(selectedMonth)) return false;
                    return true;
                } else if (periodType === 'quarter') {
                    if (selectedYear && date.getFullYear() !== Number(selectedYear)) return false;
                    if (selectedQuarter) {
                        const itemQuarter = Math.ceil((date.getMonth() + 1) / 3);
                        return itemQuarter === Number(selectedQuarter);
                    }
                    return true;
                } else if (periodType === 'year') {
                    if (selectedYear && date.getFullYear() !== Number(selectedYear)) return false;
                    return true;
                }
                return true;
            });

            const totalRecords = activeList.length;

            // 3. Count status from actual records
            // DD = Đã duyệt, DADUYET, HOANTHANH, CONGBO / 1
            // CC = Đang thụ lý, CHOCHUYEN, DANGXULY, CD = Chưa duyệt / Chờ duyệt, CXD = Chưa xác định
            let approvedCount = 0;
            let processingCount = 0;
            let pendingCount = 0;

            activeList.forEach((item) => {
                const status = (item.trangThai || '').toUpperCase();
                const congBo = (item.congBo || '').toUpperCase();

                if (
                    status === 'DD' ||
                    status === 'DADUYET' ||
                    status === 'HOANTHANH' ||
                    congBo === '1' ||
                    congBo === 'CONGBO' ||
                    congBo === 'DACONGBO' ||
                    Boolean(item.soQdPheDuyet)
                ) {
                    approvedCount++;
                } else if (
                    status === 'CC' ||
                    status === 'DANGXULY' ||
                    status === 'CHOCHUYEN' ||
                    status === 'XULY'
                ) {
                    processingCount++;
                } else {
                    pendingCount++;
                }
            });

            const completionRate = totalRecords > 0 ? Math.round((approvedCount / totalRecords) * 100) : 0;
            const processingRate = totalRecords > 0 ? Math.round((processingCount / totalRecords) * 100) : 0;
            const pendingRate = totalRecords > 0 ? Math.round((pendingCount / totalRecords) * 100) : 0;

            // 4. Setup Stats Cards with actual numbers
            setStatItems([
                {
                    id: 'total',
                    title: 'Tổng số hồ sơ',
                    value: totalRecords,
                    subText: `Kỳ: ${filterSummary}`,
                    changeRate: totalRecords > 0 ? '100%' : '0%',
                    isIncrease: true,
                    icon: FileCheck,
                    color: '#2563eb',
                    bgColor: '#eff6ff',
                    sparklineData: [0, Math.round(totalRecords * 0.3), Math.round(totalRecords * 0.6), totalRecords],
                },
                {
                    id: 'approved',
                    title: 'Hồ sơ đã duyệt / Công bố',
                    value: approvedCount,
                    subText: `Đạt ${completionRate}% tổng số`,
                    changeRate: `${completionRate}%`,
                    isIncrease: true,
                    icon: TrendingUp,
                    color: '#059669',
                    bgColor: '#ecfdf5',
                    sparklineData: [0, Math.round(approvedCount * 0.5), approvedCount],
                },
                {
                    id: 'processing',
                    title: 'Đang xử lý / Tiếp nhận',
                    value: processingCount,
                    subText: `Chiếm ${processingRate}% tổng số`,
                    changeRate: `${processingRate}%`,
                    isIncrease: false,
                    icon: Clock,
                    color: '#d97706',
                    bgColor: '#fffbeb',
                    sparklineData: [0, processingCount],
                },
                {
                    id: 'pending',
                    title: 'Chờ duyệt / Chưa xác định',
                    value: pendingCount,
                    subText: `Chiếm ${pendingRate}% tổng số`,
                    changeRate: `${pendingRate}%`,
                    isIncrease: false,
                    icon: AlertCircle,
                    color: '#dc2626',
                    bgColor: '#fef2f2',
                    sparklineData: [0, pendingCount],
                },
            ]);

            // 5. Setup Timeline Wave Data from actual records
            if (periodType === 'quarter') {
                const q = selectedQuarter || 3;
                const startMonth = (q - 1) * 3 + 1;
                const counts = [0, 0, 0];
                activeList.forEach((item) => {
                    const dStr = item.thoiDiem || item.thoidiem || item.createdDate;
                    if (dStr && !dStr.startsWith('0001')) {
                        const m = new Date(dStr).getMonth() + 1;
                        if (m >= startMonth && m <= startMonth + 2) {
                            counts[m - startMonth]++;
                        }
                    } else {
                        counts[1]++;
                    }
                });
                setWaveData([
                    { label: `Tháng ${startMonth}`, value: counts[0] },
                    { label: `Tháng ${startMonth + 1}`, value: counts[1] },
                    { label: `Tháng ${startMonth + 2}`, value: counts[2] },
                ]);
            } else if (periodType === 'year') {
                const counts = [0, 0, 0, 0];
                activeList.forEach((item) => {
                    const dStr = item.thoiDiem || item.thoidiem || item.createdDate;
                    if (dStr && !dStr.startsWith('0001')) {
                        const m = new Date(dStr).getMonth() + 1;
                        const qIdx = Math.min(3, Math.floor((m - 1) / 3));
                        counts[qIdx]++;
                    } else {
                        counts[2]++;
                    }
                });
                setWaveData([
                    { label: 'Quý 1', value: counts[0] },
                    { label: 'Quý 2', value: counts[1] },
                    { label: 'Quý 3', value: counts[2] },
                    { label: 'Quý 4', value: counts[3] },
                ]);
            } else {
                // Day or Month: group by 4 intervals / weeks
                const counts = [0, 0, 0, 0];
                activeList.forEach((item) => {
                    const dStr = item.thoiDiem || item.thoidiem || item.createdDate;
                    if (dStr && !dStr.startsWith('0001')) {
                        const day = new Date(dStr).getDate();
                        const weekIdx = Math.min(3, Math.floor((day - 1) / 7));
                        counts[weekIdx]++;
                    } else {
                        counts[1]++;
                    }
                });
                setWaveData([
                    { label: 'Tuần 1', value: counts[0] },
                    { label: 'Tuần 2', value: counts[1] },
                    { label: 'Tuần 3', value: counts[2] },
                    { label: 'Tuần 4', value: counts[3] },
                ]);
            }

            // 6. Setup Bar Chart Data (Comparison by actual DonVi / Ngành nghề)
            // Fetch names dictionary from DanhMucDonVi & DanhMucKinhDoanh
            let donViMap: Record<string, string> = {};
            let kinhDoanhMap: Record<string, string> = {};

            try {
                const [donViRes, kinhDoanhRes] = await Promise.all([
                    danhMucDonViService.getAll().catch(() => null),
                    danhMucKinhDoanhService.getAll().catch(() => null)
                ]);

                if (donViRes && donViRes.success && Array.isArray(donViRes.data)) {
                    donViRes.data.forEach((u: any) => {
                        if (u.id) donViMap[u.id.toLowerCase()] = u.tenDonVi || u.tenDonViBaoCao || u.name || '';
                        if (u.maDonVi) donViMap[u.maDonVi.toLowerCase()] = u.tenDonVi || '';
                    });
                }

                if (kinhDoanhRes && kinhDoanhRes.success && Array.isArray(kinhDoanhRes.data)) {
                    kinhDoanhRes.data.forEach((k: any) => {
                        if (k.maNghe) kinhDoanhMap[k.maNghe.toLowerCase()] = k.tenNghe || '';
                    });
                }
            } catch (err) {
                console.warn('Could not fetch unit/category dictionary for chart names:', err);
            }

            const unitCounts: Record<string, number> = {};
            activeList.forEach((item) => {
                let label = '';
                const donViId = (item.donViQuanLyId || item.DonViQuanLyId || '').toString().toLowerCase();
                const maNghe = (item.maNghe || item.MaNghe || '').toString().toLowerCase();

                if (donViId && donViMap[donViId]) {
                    label = donViMap[donViId];
                } else if (maNghe && kinhDoanhMap[maNghe]) {
                    label = kinhDoanhMap[maNghe];
                } else if (item.maNghe) {
                    label = item.maNghe;
                } else if (item.donViQuanLyId) {
                    label = `Đơn vị ${item.donViQuanLyId.slice(0, 6)}...`;
                } else {
                    label = 'Cơ quan quản lý';
                }

                unitCounts[label] = (unitCounts[label] || 0) + 1;
            });

            const barEntries = Object.entries(unitCounts);
            if (barEntries.length > 0) {
                const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
                setBarData(
                    barEntries.slice(0, 5).map(([label, value], idx) => ({
                        label: label.length > 18 ? label.slice(0, 16) + '..' : label,
                        value,
                        color: colors[idx % colors.length]
                    }))
                );
            } else {
                setBarData([
                    { label: 'Đơn vị QL', value: totalRecords, color: '#3b82f6' }
                ]);
            }

            // 7. Setup Donut Chart Data (Actual Status distribution)
            const donutItems: PieDataPoint[] = [];
            if (approvedCount > 0) {
                donutItems.push({ label: 'Đã duyệt / Công bố', value: approvedCount, color: '#059669' });
            }
            if (processingCount > 0) {
                donutItems.push({ label: 'Đang thụ lý', value: processingCount, color: '#2563eb' });
            }
            if (pendingCount > 0) {
                donutItems.push({ label: 'Chờ duyệt / Chưa XD', value: pendingCount, color: '#dc2626' });
            }
            if (donutItems.length === 0) {
                donutItems.push({ label: 'Không có dữ liệu', value: 1, color: '#94a3b8' });
            }
            setPieData(donutItems);

            // 8. Setup Breakdown Table Rows from actual records
            const breakdown: BreakdownRow[] = [];
            if (approvedCount > 0) {
                breakdown.push({
                    id: 'approved',
                    label: 'Hồ sơ đã được phê duyệt / Công bố',
                    subLabel: 'Đã hoàn thành đầy đủ quy trình và quyết định',
                    count: approvedCount,
                    percentage: completionRate,
                    barColor: '#059669',
                });
            }
            if (processingCount > 0) {
                breakdown.push({
                    id: 'processing',
                    label: 'Hồ sơ đang trong quy trình thụ lý',
                    subLabel: 'Cán bộ đang thẩm định và rà soát hồ sơ',
                    count: processingCount,
                    percentage: processingRate,
                    barColor: '#2563eb',
                });
            }
            if (pendingCount > 0) {
                breakdown.push({
                    id: 'pending',
                    label: 'Hồ sơ chờ duyệt / Chưa xác định',
                    subLabel: 'Mới khởi tạo hoặc cần bổ sung tài liệu',
                    count: pendingCount,
                    percentage: pendingRate,
                    barColor: '#dc2626',
                });
            }
            if (breakdown.length === 0) {
                breakdown.push({
                    id: 'empty',
                    label: 'Chưa có dữ liệu hồ sơ trong kỳ báo cáo',
                    subLabel: 'Vui lòng kiểm tra lại điều kiện lọc thời gian',
                    count: 0,
                    percentage: 0,
                    barColor: '#94a3b8',
                });
            }
            setBreakdownRows(breakdown);

            // 9. Setup Insights Banner with actual computed insights
            setInsightText(
                totalRecords > 0
                    ? `Hệ thống ghi nhận tổng cộng ${totalRecords} hồ sơ thực tế trong ${filterSummary.toLowerCase()}. Tỷ lệ giải quyết hoàn thành đạt ${completionRate}%.`
                    : `Hiện tại chưa có phát sinh hồ sơ thực tế nào trong ${filterSummary.toLowerCase()}.`
            );
            setInsightHighlights([
                `Tổng số hồ sơ tiếp nhận thực tế: ${totalRecords} hồ sơ.`,
                `Tỷ lệ hồ sơ đã phê duyệt/công bố: ${completionRate}% (${approvedCount}/${totalRecords}).`,
                `Lĩnh vực / Phạm vi lọc: ${businessName || 'Toàn bộ danh mục'}.`
            ]);

        } catch (err) {
            console.error('Error computing report detail:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchReportData();
    }, [report, periodType, selectedBusiness, selectedMonth, selectedQuarter, selectedYear]);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchReportData();
    };

    if (loading && !refreshing) {
        return (
            <View style={styles.container}>
                <ReportHeader
                    report={report}
                    periodType={periodType}
                    filterSummary={filterSummary}
                    businessName={businessName}
                    onBack={onBack}
                    onRefresh={handleRefresh}
                    onExport={() => setExportModalVisible(true)}
                    isDark={isDark}
                />
                <View style={styles.loadingContainer}>
                    <Text style={[styles.loadingText, isDark && styles.textMutedDark]}>
                        Đang trích xuất dữ liệu thực tế...
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header with back button, report type, filter pill tags, export button */}
            <ReportHeader
                report={report}
                periodType={periodType}
                filterSummary={filterSummary}
                businessName={businessName}
                onBack={onBack}
                onRefresh={handleRefresh}
                onExport={() => setExportModalVisible(true)}
                isDark={isDark}
            />

            {/* Smart KPI / Stat Cards with Sparklines */}
            <StatSummaryCards items={statItems} isDark={isDark} />

            {/* AI / Quick Insights Banner */}
            <InsightsBanner
                title="Nhận định nhanh & Xu hướng nổi bật"
                description={insightText}
                highlights={insightHighlights}
                isDark={isDark}
            />

            {/* CHART 1: Smooth Sine Wave Line Area Chart */}
            <View style={[styles.sectionCard, isDark && styles.sectionCardDark]}>
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionHeaderLeft}>
                        <View style={[styles.sectionIconWrapper, { backgroundColor: '#eff6ff' }]}>
                            <Waves size={18} color="#2563eb" />
                        </View>
                        <View style={styles.sectionTitleCol}>
                            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
                                Biến động xu hướng hồ sơ
                            </Text>
                            <Text style={[styles.sectionSubtitle, isDark && styles.textMutedDark]}>
                                Biểu đồ đường cong hình sin theo mốc thời gian
                            </Text>
                        </View>
                    </View>
                </View>

                <SineWaveLineChart
                    data={waveData}
                    height={190}
                    color={report.color || '#2563eb'}
                    isDark={isDark}
                />

                {/* Legend explanation */}
                <View style={[styles.legendBadgeRow, isDark && styles.legendBadgeRowDark]}>
                    <View style={styles.legendBadgeItem}>
                        <View style={[styles.legendBadgeDot, { backgroundColor: report.color || '#2563eb' }]} />
                        <Text style={[styles.legendBadgeText, isDark && styles.textMutedDark]}>
                            Dòng số lượng hồ sơ tiếp nhận và xử lý
                        </Text>
                    </View>
                </View>
            </View>

            {/* CHART 2: Interactive Bar Chart */}
            <View style={[styles.sectionCard, isDark && styles.sectionCardDark]}>
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionHeaderLeft}>
                        <View style={[styles.sectionIconWrapper, { backgroundColor: '#ecfdf5' }]}>
                            <BarChart3 size={18} color="#059669" />
                        </View>
                        <View style={styles.sectionTitleCol}>
                            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
                                Phân bố theo đối tượng / cấp quản lý
                            </Text>
                            <Text style={[styles.sectionSubtitle, isDark && styles.textMutedDark]}>
                                Biểu đồ cột so sánh định mức số lượng
                            </Text>
                        </View>
                    </View>
                </View>

                <BarChart
                    data={barData}
                    height={190}
                    primaryColor="#059669"
                    isDark={isDark}
                />

                <View style={[styles.legendBadgeRow, isDark && styles.legendBadgeRowDark]}>
                    <View style={styles.legendBadgeItem}>
                        <View style={[styles.legendBadgeDot, { backgroundColor: '#059669' }]} />
                        <Text style={[styles.legendBadgeText, isDark && styles.textMutedDark]}>
                            Khối lượng hồ sơ phân bổ theo từng đơn vị
                        </Text>
                    </View>
                </View>
            </View>

            {/* CHART 3: Donut / Pie Chart with detailed Legend */}
            <View style={[styles.sectionCard, isDark && styles.sectionCardDark]}>
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionHeaderLeft}>
                        <View style={[styles.sectionIconWrapper, { backgroundColor: '#fffbeb' }]}>
                            <PieIcon size={18} color="#d97706" />
                        </View>
                        <View style={styles.sectionTitleCol}>
                            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
                                Cơ cấu phân bổ trạng thái hồ sơ
                            </Text>
                            <Text style={[styles.sectionSubtitle, isDark && styles.textMutedDark]}>
                                Biểu đồ tròn hiển thị tỷ lệ % chi tiết
                            </Text>
                        </View>
                    </View>
                </View>

                <DonutChart
                    data={pieData}
                    size={170}
                    strokeWidth={22}
                    centerSubLabel="Tổng hồ sơ"
                    isDark={isDark}
                />
            </View>

            {/* Detailed Breakdown Summary Table */}
            <BreakdownTable
                title="Bảng phân tích phân bổ nghiệp vụ"
                subtitle="Chi tiết khối lượng và tỷ trọng các nhóm hồ sơ"
                rows={breakdownRows}
                isDark={isDark}
            />

            {/* Export & Sharing Modal */}
            <ExportModal
                visible={exportModalVisible}
                onClose={() => setExportModalVisible(false)}
                report={report}
                filterSummary={filterSummary}
                businessName={businessName}
                statItems={statItems}
                waveData={waveData}
                barData={barData}
                pieData={pieData}
                breakdownRows={breakdownRows}
                isDark={isDark}
            />
        </View>
    );
};

export default ReportDetail;
