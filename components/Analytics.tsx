// @ts-nocheck
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, useWindowDimensions, Modal } from 'react-native';
import { Search, Filter, Table, FileText, Share2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, RefreshCw, X, Info, Calendar as CalendarIcon, Hash, Building2, ClipboardList } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import { API_BASE_URL } from '../config';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

// CAMPAIGN_DATA removed as we're using live data now

export const Analytics = () => {
    const { isDark } = useTheme();
    const { width } = useWindowDimensions();
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
        from: 0,
        to: 0
    });
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDetailLoading, setIsDetailLoading] = useState(false);

    const fetchData = async (page = 1) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/thuetainguyen?page=${page}`);
            const json = await response.json();
            if (json.success) {
                setData(json.data.data);
                setPagination({
                    current_page: json.data.current_page,
                    last_page: json.data.last_page,
                    total: json.data.total,
                    from: json.data.from,
                    to: json.data.to
                });
            }
        } catch (error) {
            console.error('Error fetching tax data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleShowDetail = async (mahs) => {
        setIsModalVisible(true);
        setIsDetailLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/thuetainguyen/${mahs}`);
            const json = await response.json();
            if (json.success) {
                setSelectedRecord(json.data);
            }
        } catch (error) {
            console.error('Error fetching record detail:', error);
        } finally {
            setIsDetailLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getStatusStyles = (status) => {
        if (status === 'HT') {
            return { color: '#dcfce7', text: '#166534', label: 'Hoàn thành' };
        }
        return { color: '#fef3c7', text: '#92400e', label: 'Chưa hoàn thành' };
    };

    return (
        <View style={styles.container}>
            {/* Search and Filter Bar */}
            {/* <View style={[styles.searchFilterContainer, width > 768 && styles.searchFilterContainerDesktop]}>
                <View style={[styles.searchContainer, isDark && styles.searchContainerDark]}>
                    <Search size={20} color={isDark ? "#94a3b8" : "#777683"} style={styles.searchIcon} />
                    <TextInput
                        style={[styles.searchInput, isDark && styles.textDark]}
                        placeholder="Search campaigns..."
                        placeholderTextColor={isDark ? "#94a3b8" : "#777683"}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity style={[styles.filterButton, isDark && styles.filterButtonDark]}>
                    <Filter size={20} color={isDark ? "#c1c1fc" : "#222353"} />
                    <Text style={[styles.filterText, isDark && styles.filterTextDark]}>Status</Text>
                </TouchableOpacity>
            </View> */}

            {/* Summary Toolbar */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.toolbarScroll}
                contentContainerStyle={styles.toolbarContainer}
            >
                <TouchableOpacity style={styles.toolbarButtonPrimary} onPress={() => fetchData(pagination.current_page)}>
                    <RefreshCw size={16} color="#ffffff" />
                    <Text style={styles.toolbarButtonTextPrimary}>Làm mới</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={[styles.toolbarButton, isDark && styles.toolbarButtonDark]}>
                    <Table size={16} color={isDark ? "#94a3b8" : "#464652"} />
                    <Text style={[styles.toolbarButtonText, isDark && styles.textMutedDark]}>Excel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.toolbarButton, isDark && styles.toolbarButtonDark]}>
                    <FileText size={16} color={isDark ? "#94a3b8" : "#464652"} />
                    <Text style={[styles.toolbarButtonText, isDark && styles.textMutedDark]}>PDF</Text>
                </TouchableOpacity> */}
            </ScrollView>

            {/* Excel-style Data Table */}
            <View style={[styles.tableCard, isDark && styles.tableCardDark]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                    <View style={styles.tableInner}>
                        {/* Table Header */}
                        <View style={[styles.tableHeader, isDark && styles.tableHeaderDark]}>
                            <View style={[styles.headerCell, styles.colMahs]}>
                                <Text style={[styles.headerText, isDark && styles.textMutedDark]}>Mã hồ sơ</Text>
                            </View>
                            <View style={[styles.headerCell, styles.colSoqd]}>
                                <Text style={[styles.headerText, isDark && styles.textMutedDark]}>Số quyết định</Text>
                            </View>
                            <View style={[styles.headerCell, styles.colCqbh]}>
                                <Text style={[styles.headerText, isDark && styles.textMutedDark]}>Nội dung</Text>
                            </View>
                            <View style={[styles.headerCell, styles.colThoidiem]}>
                                <Text style={[styles.headerText, isDark && styles.textMutedDark]}>Thời điểm</Text>
                            </View>
                            <View style={[styles.headerCell, styles.colTrangthai]}>
                                <Text style={[styles.headerText, isDark && styles.textMutedDark]}>Trạng thái</Text>
                            </View>
                        </View>

                        {/* Table Body */}
                        {loading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#222353" />
                                <Text style={[styles.loadingText, isDark && styles.textMutedDark]}>Đang tải dữ liệu...</Text>
                            </View>
                        ) : data.map((row, index) => {
                            const status = getStatusStyles(row.trangthai);
                            return (
                                <View
                                    key={row.mahs}
                                    style={[
                                        styles.tableRow,
                                        isDark && styles.tableRowDark,
                                        index % 2 !== 0 && (isDark ? styles.tableRowAltDark : styles.tableRowAlt)
                                    ]}
                                >
                                    <TouchableOpacity
                                        style={[styles.cell, styles.colMahs]}
                                        onPress={() => handleShowDetail(row.mahs)}
                                    >
                                        <Text style={[styles.cellTextName, { color: '#38396a', textDecorationLine: 'underline' }, isDark && styles.textPrimaryDark]}>
                                            {row.mahs}
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={[styles.cell, styles.colSoqd]}>
                                        <Text style={[styles.cellTextNumber, isDark && styles.textDark]}>{row.soqd}</Text>
                                    </View>
                                    <View style={[styles.cell, styles.colCqbh]}>
                                        <Text style={[styles.cellTextNumber, isDark && styles.textDark]}>{row.cqbh}</Text>
                                    </View>
                                    <View style={[styles.cell, styles.colThoidiem]}>
                                        <Text style={[styles.cellTextDate, isDark && styles.textMutedDark]}>
                                            {new Date(row.thoidiem).toLocaleDateString('vi-VN')}
                                        </Text>
                                    </View>
                                    <View style={[styles.cell, styles.colTrangthai]}>
                                        <View style={[styles.statusBadge, { backgroundColor: isDark ? status.color + '40' : status.color }]}>
                                            <Text style={[styles.statusText, { color: isDark ? status.color : status.text }]}>{status.label}</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>

                {/* Pagination */}
                <View style={[styles.pagination, isDark && styles.paginationDark]}>
                    <Text style={[styles.paginationText, isDark && styles.textMutedDark]}>
                        Hiển thị {pagination.from} - {pagination.to} trong {pagination.total} hồ sơ
                    </Text>
                    <View style={styles.paginationControls}>
                        <TouchableOpacity
                            style={[styles.pageButton, isDark && styles.pageButtonDark, pagination.current_page === 1 && { opacity: 0.5 }]}
                            disabled={pagination.current_page === 1}
                            onPress={() => fetchData(pagination.current_page - 1)}
                        >
                            <ChevronLeft size={16} color={isDark ? "#94a3b8" : "#464652"} />
                        </TouchableOpacity>

                        <View style={styles.pageNumbers}>
                            <View style={styles.pageNumberActive}>
                                <Text style={styles.pageNumberTextActive}>{pagination.current_page}</Text>
                            </View>
                            <Text style={[styles.pageNumberText, isDark && styles.textMutedDark, { marginHorizontal: 8 }]}>/ {pagination.last_page}</Text>
                        </View>

                        <TouchableOpacity
                            style={[styles.pageButton, isDark && styles.pageButtonDark, pagination.current_page === pagination.last_page && { opacity: 0.5 }]}
                            disabled={pagination.current_page === pagination.last_page}
                            onPress={() => fetchData(pagination.current_page + 1)}
                        >
                            <ChevronRight size={16} color={isDark ? "#94a3b8" : "#464652"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Detail Modal */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, isDark && styles.modalContentDark]}>
                        <View style={[styles.modalHeader, isDark && styles.modalHeaderDark]}>
                            <View style={styles.modalHeaderLeft}>
                                <Info size={24} color={isDark ? "#c1c1fc" : "#222353"} />
                                <Text style={[styles.modalTitle, isDark && styles.textDark]}>Chi tiết hồ sơ</Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                                setIsModalVisible(false);
                                setSelectedRecord(null);
                            }}>
                                <X size={24} color={isDark ? "#94a3b8" : "#464652"} />
                            </TouchableOpacity>
                        </View>

                        {isDetailLoading ? (
                            <View style={styles.modalLoading}>
                                <ActivityIndicator size="large" color="#222353" />
                                <Text style={[styles.loadingText, { marginTop: 12 }, isDark && styles.textMutedDark]}>Đang tải chi tiết...</Text>
                            </View>
                        ) : selectedRecord ? (
                            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                                {/* Header Section */}
                                <View style={[styles.detailSection, isDark && styles.detailSectionDark]}>
                                    <View style={styles.sectionHeader}>
                                        <ClipboardList size={18} color="#222353" />
                                        <Text style={styles.sectionTitle}>Thông tin chung</Text>
                                    </View>

                                    <View style={styles.infoGrid}>
                                        <View style={styles.infoItem}>
                                            <Hash size={14} color="#64748b" />
                                            <Text style={styles.infoLabel}>Mã hồ sơ:</Text>
                                            <Text style={[styles.infoValue, isDark && styles.textDark]}>{selectedRecord.header.mahs}</Text>
                                        </View>
                                        <View style={styles.infoItem}>
                                            <FileText size={14} color="#64748b" />
                                            <Text style={styles.infoLabel}>Số quyết định:</Text>
                                            <Text style={[styles.infoValue, isDark && styles.textDark]}>{selectedRecord.header.soqd}</Text>
                                        </View>
                                        <View style={styles.infoItem}>
                                            <CalendarIcon size={14} color="#64748b" />
                                            <Text style={styles.infoLabel}>Ngày ban hành:</Text>
                                            <Text style={[styles.infoValue, isDark && styles.textDark]}>
                                                {new Date(selectedRecord.header.thoidiem).toLocaleDateString('vi-VN')}
                                            </Text>
                                        </View>
                                        <View style={styles.infoItem}>
                                            <Building2 size={14} color="#64748b" />
                                            <Text style={styles.infoLabel}>Nội dung:</Text>
                                            <Text style={[styles.infoValue, isDark && styles.textDark]}>{selectedRecord.header.cqbh}</Text>
                                        </View>
                                    </View>

                                    {selectedRecord.header.ghichu && (
                                        <View style={styles.noteBox}>
                                            <Text style={styles.infoLabel}>Ghi chú:</Text>
                                            <Text style={[styles.noteText, isDark && styles.textDark]}>{selectedRecord.header.ghichu}</Text>
                                        </View>
                                    )}
                                </View>

                                {/* List Section */}
                                <View style={styles.detailSection}>
                                    <View style={styles.sectionHeader}>
                                        <Table size={18} color="#222353" />
                                        <Text style={styles.sectionTitle}>Chi tiết tài nguyên</Text>
                                    </View>

                                    <View style={[styles.miniTable, isDark && styles.miniTableDark]}>
                                        <View style={[styles.miniTableHeader, isDark && styles.miniTableHeaderDark]}>
                                            <Text style={[styles.miniHeaderText, { flex: 3 }, isDark && styles.textMutedDark]}>Tên tài nguyên</Text>
                                            <Text style={[styles.miniHeaderText, { flex: 1, textAlign: 'center' }, isDark && styles.textMutedDark]}>ĐVT</Text>
                                            <Text style={[styles.miniHeaderText, { flex: 1.5, textAlign: 'right' }, isDark && styles.textMutedDark]}>Giá</Text>
                                        </View>
                                        {selectedRecord.details.map((item, idx) => (
                                            <View key={item.id} style={[styles.miniTableRow, isDark && styles.miniTableRowDark, idx % 2 !== 0 && (isDark ? styles.miniTableRowAltDark : styles.miniTableRowAlt)]}>
                                                <Text style={[styles.miniCellText, { flex: 3 }, isDark && styles.textDark]}>{item.ten}</Text>
                                                <Text style={[styles.miniCellText, { flex: 1, textAlign: 'center' }, isDark && styles.textMutedDark]}>{item.dvt}</Text>
                                                <Text style={[styles.miniCellText, { flex: 1.5, textAlign: 'right', fontWeight: '700' }, isDark && styles.textDark]}>
                                                    {Number(item.gia).toLocaleString('vi-VN')}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </ScrollView>
                        ) : (
                            <View style={styles.modalError}>
                                <Text style={styles.errorText}>Không thể tải dữ liệu chi tiết.</Text>
                            </View>
                        )}

                        <View style={[styles.modalFooter, isDark && styles.modalFooterDark]}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => {
                                    setIsModalVisible(false);
                                    setSelectedRecord(null);
                                }}
                            >
                                <Text style={styles.closeButtonText}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 24,
    },
    searchFilterContainer: {
        flexDirection: 'column',
        gap: 12,
    },
    searchFilterContainerDesktop: {
        flexDirection: 'row',
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e7e8e9',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 48,
    },
    searchContainerDark: {
        backgroundColor: '#1e293b',
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        fontFamily: 'Inter',
        color: '#191c1d',
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        paddingHorizontal: 24,
        height: 48,
        gap: 8,
    },
    filterButtonDark: {
        backgroundColor: '#1e293b',
    },
    filterText: {
        fontFamily: 'Inter',
        fontWeight: '500',
        fontSize: 16,
        color: '#222353',
    },
    filterTextDark: {
        color: '#c1c1fc',
    },
    toolbarScroll: {
        marginHorizontal: -24,
    },
    toolbarContainer: {
        paddingHorizontal: 24,
        gap: 8,
    },
    toolbarButtonPrimary: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#222353',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 999,
        gap: 8,
    },
    toolbarButtonTextPrimary: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Inter',
    },
    toolbarButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 999,
        gap: 8,
    },
    toolbarButtonDark: {
        backgroundColor: '#1e293b',
    },
    toolbarButtonText: {
        color: '#464652',
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Inter',
    },
    tableCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        overflow: 'hidden',
    },
    tableCardDark: {
        backgroundColor: '#1e293b',
    },
    tableInner: {
        minWidth: 800,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#edeeef',
        borderBottomWidth: 1,
        borderBottomColor: '#e1e3e4',
    },
    tableHeaderDark: {
        backgroundColor: '#0f172a',
        borderBottomColor: '#334155',
    },
    headerCell: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        gap: 4,
    },
    headerText: {
        fontFamily: 'Manrope',
        fontSize: 12,
        fontWeight: '700',
        color: '#464652',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    sortIcons: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e1e3e4',
    },
    tableRowDark: {
        borderBottomColor: '#334155',
    },
    tableRowAlt: {
        backgroundColor: 'rgba(243, 244, 245, 0.3)',
    },
    tableRowAltDark: {
        backgroundColor: 'rgba(15, 23, 42, 0.3)',
    },
    cell: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        justifyContent: 'center',
    },
    colMahs: {
        width: 150,
    },
    colSoqd: {
        width: 150,
    },
    colCqbh: {
        width: 250,
    },
    colThoidiem: {
        width: 120,
    },
    colTrangthai: {
        width: 150,
    },
    loadingContainer: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    loadingText: {
        fontSize: 14,
        color: '#64748b',
        fontFamily: 'Inter',
    },
    cellTextName: {
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: '600',
        color: '#222353',
    },
    statusBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 999,
    },
    statusText: {
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '500',
    },
    cellTextNumber: {
        fontFamily: 'Inter',
        fontSize: 14,
        color: '#191c1d',
        fontVariant: ['tabular-nums'],
    },
    cellTextRoi: {
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: '700',
        color: '#222353',
        fontVariant: ['tabular-nums'],
    },
    cellTextDate: {
        fontFamily: 'Inter',
        fontSize: 14,
        color: '#777683',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#edeeef',
    },
    paginationDark: {
        borderTopColor: '#334155',
    },
    paginationText: {
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '500',
        color: '#464652',
    },
    paginationControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    pageButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#f3f4f5',
    },
    pageButtonDark: {
        backgroundColor: '#334155',
    },
    pageNumbers: {
        flexDirection: 'row',
        gap: 4,
    },
    pageNumberActive: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#222353',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageNumberTextActive: {
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '700',
        color: '#ffffff',
    },
    pageNumber: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageNumberDark: {
        backgroundColor: 'transparent',
    },
    pageNumberText: {
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '500',
        color: '#464652',
    },
    textDark: {
        color: '#ffffff',
    },
    textMutedDark: {
        color: '#94a3b8',
    },
    textPrimaryDark: {
        color: '#c1c1fc',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        height: '85%',
        paddingTop: 8,
    },
    modalContentDark: {
        backgroundColor: '#0f172a',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#edeeef',
    },
    modalHeaderDark: {
        borderBottomColor: '#1e293b',
    },
    modalHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    modalTitle: {
        fontFamily: 'Manrope',
        fontSize: 18,
        fontWeight: '700',
        color: '#222353',
    },
    modalLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBody: {
        flex: 1,
        padding: 24,
    },
    detailSection: {
        marginBottom: 32,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
    },
    sectionTitle: {
        fontFamily: 'Manrope',
        fontSize: 16,
        fontWeight: '700',
        color: '#222353',
    },
    infoGrid: {
        gap: 12,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    infoLabel: {
        fontSize: 13,
        color: '#64748b',
        width: 120,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#222353',
        flex: 1,
    },
    noteBox: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#f8fafc',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#edeeef',
    },
    noteText: {
        fontSize: 13,
        lineHeight: 20,
        color: '#464652',
        marginTop: 4,
    },
    miniTable: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#edeeef',
    },
    miniTableDark: {
        backgroundColor: '#1e293b',
        borderColor: '#334155',
    },
    miniTableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f1f5f9',
        padding: 12,
    },
    miniTableHeaderDark: {
        backgroundColor: 'rgba(51, 65, 85, 0.5)',
    },
    miniHeaderText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    miniTableRow: {
        flexDirection: 'row',
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        alignItems: 'center',
    },
    miniTableRowDark: {
        borderTopColor: '#334155',
    },
    miniTableRowAlt: {
        backgroundColor: 'rgba(241, 245, 249, 0.3)',
    },
    miniTableRowAltDark: {
        backgroundColor: 'rgba(51, 65, 85, 0.2)',
    },
    miniCellText: {
        fontSize: 13,
        color: '#222353',
    },
    modalFooter: {
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: '#edeeef',
    },
    modalFooterDark: {
        borderTopColor: '#1e293b',
    },
    closeButton: {
        backgroundColor: '#222353',
        paddingVertical: 14,
        borderRadius: 16,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
    modalError: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    errorText: {
        color: '#ba1a1a',
        fontSize: 14,
        textAlign: 'center',
    },
});
