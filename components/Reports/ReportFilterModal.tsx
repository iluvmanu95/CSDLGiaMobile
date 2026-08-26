import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';
import { ReportOption, PeriodType } from '../../screens/Reports/types';
import { DanhMucKinhDoanhItem } from '../../services';
import { BusinessCategoryPicker } from './BusinessCategoryPicker';
import { PeriodSelector } from './PeriodSelector';
import styles from '../../screens/Reports/style';

interface ReportFilterModalProps {
    visible: boolean;
    report: ReportOption | null;
    onClose: () => void;
    onSubmit: () => void;
    // Business props
    businessList: DanhMucKinhDoanhItem[];
    loadingBusiness: boolean;
    selectedBusiness: string;
    onSelectBusiness: (id: string) => void;
    searchBusinessText: string;
    onSearchBusinessTextChange: (val: string) => void;
    // Period props
    periodType: PeriodType;
    setPeriodType: (val: PeriodType) => void;
    fromDate: string;
    setFromDate: (val: string) => void;
    toDate: string;
    setToDate: (val: string) => void;
    selectedMonth: number;
    setSelectedMonth: (val: number) => void;
    selectedQuarter: number;
    setSelectedQuarter: (val: number) => void;
    selectedYear: number;
    setSelectedYear: (val: number) => void;
    isDark: boolean;
}

export const ReportFilterModal: React.FC<ReportFilterModalProps> = ({
    visible,
    report,
    onClose,
    onSubmit,
    businessList,
    loadingBusiness,
    selectedBusiness,
    onSelectBusiness,
    searchBusinessText,
    onSearchBusinessTextChange,
    periodType,
    setPeriodType,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    selectedMonth,
    setSelectedMonth,
    selectedQuarter,
    setSelectedQuarter,
    selectedYear,
    setSelectedYear,
    isDark
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={[styles.modalContainer, isDark && styles.modalContainerDark]}>
                    {/* Modal Header */}
                    <View style={[styles.modalHeader, isDark && styles.modalHeaderDark]}>
                        <Text style={[styles.modalTitle, isDark && styles.textDark]} numberOfLines={2}>
                            {report?.title}
                        </Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X size={22} color={isDark ? '#cbd5e1' : '#64748b'} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                        {/* Section 1: Business Category (If DG or KKG) */}
                        {report?.loaiGia && (
                            <BusinessCategoryPicker
                                businessList={businessList}
                                loading={loadingBusiness}
                                selectedBusiness={selectedBusiness}
                                onSelectBusiness={onSelectBusiness}
                                searchText={searchBusinessText}
                                onSearchChange={onSearchBusinessTextChange}
                                isDark={isDark}
                            />
                        )}

                        {/* Section 2: Period Filter Selector */}
                        <PeriodSelector
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
                    </ScrollView>

                    {/* Modal Action Buttons */}
                    <View style={[styles.actionButtons, isDark && styles.actionButtonsDark]}>
                        <TouchableOpacity
                            style={[styles.cancelBtn, isDark && styles.cancelBtnDark]}
                            onPress={onClose}
                        >
                            <Text style={[styles.cancelBtnText, isDark && styles.cancelBtnTextDark]}>
                                Đóng
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.submitBtn, isDark && styles.submitBtnDark]}
                            onPress={onSubmit}
                        >
                            <Text style={styles.submitBtnText}>
                                Xem Báo Cáo
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ReportFilterModal;
