import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import styles from './style';
import { useTheme } from '../../store';
import { DanhMucKinhDoanhItem } from '../../services';
import { ReportOption, PeriodType } from './types';
import { REPORT_OPTIONS } from './constants';
import { ReportCard, ReportFilterModal } from '../../components/Reports';
import { fetchAndBuildBusinessTree } from '../../helper';

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
                const treeList = await fetchAndBuildBusinessTree(report.loaiGia);
                setBusinessList(treeList);
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
                {REPORT_OPTIONS.map((item) => (
                    <ReportCard
                        key={item.id}
                        report={item}
                        isDark={isDark}
                        onPress={openReportModal}
                    />
                ))}
            </View>

            {/* Report Configuration Modal */}
            <ReportFilterModal
                visible={modalVisible}
                report={selectedReport}
                onClose={handleCloseModal}
                onSubmit={handleSubmitReport}
                businessList={businessList}
                loadingBusiness={loadingBusiness}
                selectedBusiness={selectedBusiness}
                onSelectBusiness={setSelectedBusiness}
                searchBusinessText={searchBusinessText}
                onSearchBusinessTextChange={setSearchBusinessText}
                periodType={periodType}
                setPeriodType={setPeriodType}
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                selectedQuarter={selectedQuarter}
                setSelectedQuarter={setSelectedQuarter}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                isDark={isDark}
            />
        </View>
    );
};

export default Reports;
