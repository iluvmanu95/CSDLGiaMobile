import styles from './style';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Table, Building2, ChevronRight, RefreshCw, X, Info, Hash, MapPin, Phone, User, ShieldCheck } from 'lucide-react-native';
import { useTheme } from '../../store';
import { danhMucDonViService, DanhMucDonViItem } from '../../services';
import { Badge, Loading } from '../../components';

export const Analytics = () => {
    const { isDark } = useTheme();
    const [data, setData] = useState<DanhMucDonViItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLevel, setSelectedLevel] = useState<number | undefined>(undefined);
    const [selectedRecord, setSelectedRecord] = useState<DanhMucDonViItem | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const fetchData = async (level?: number) => {
        setLoading(true);
        try {
            const json = await danhMucDonViService.getAll(level);
            if (json.success && Array.isArray(json.data)) {
                setData(json.data);
            }
        } catch (error) {
            console.error('Error fetching don vi data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterLevel = (level?: number) => {
        setSelectedLevel(level);
        fetchData(level);
    };

    const handleShowDetail = (item: DanhMucDonViItem) => {
        setSelectedRecord(item);
        setIsModalVisible(true);
    };

    useEffect(() => {
        fetchData(selectedLevel);
    }, []);

    return (
        <View style={styles.container}>
            {/* Header Description */}
            <View style={styles.headerSection}>
                <Text style={[styles.title, isDark && styles.textDark]}>Danh Mục Đơn Vị</Text>
                <Text style={[styles.subtitle, isDark && styles.textMutedDark]}>
                    Danh sách các phòng ban, đơn vị quản lý trong hệ thống
                </Text>
            </View>

            {/* Filter Level Pills & Refresh Toolbar */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.toolbarScroll}
                contentContainerStyle={styles.toolbarContainer}
            >
                <TouchableOpacity
                    style={styles.toolbarButtonPrimary}
                    onPress={() => fetchData(selectedLevel)}
                >
                    <RefreshCw size={16} color="#ffffff" />
                    <Text style={styles.toolbarButtonTextPrimary}>Làm mới</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={selectedLevel === undefined ? styles.filterPillActive : [styles.filterPill, isDark && styles.filterPillDark]}
                    onPress={() => handleFilterLevel(undefined)}
                >
                    <Text style={selectedLevel === undefined ? styles.filterPillTextActive : [styles.filterPillText, isDark && styles.textMutedDark]}>
                        TẤT CẢ
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={selectedLevel === 1 ? styles.filterPillActive : [styles.filterPill, isDark && styles.filterPillDark]}
                    onPress={() => handleFilterLevel(1)}
                >
                    <Text style={selectedLevel === 1 ? styles.filterPillTextActive : [styles.filterPillText, isDark && styles.textMutedDark]}>
                        CẤP 1
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={selectedLevel === 2 ? styles.filterPillActive : [styles.filterPill, isDark && styles.filterPillDark]}
                    onPress={() => handleFilterLevel(2)}
                >
                    <Text style={selectedLevel === 2 ? styles.filterPillTextActive : [styles.filterPillText, isDark && styles.textMutedDark]}>
                        CẤP 2
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={selectedLevel === 3 ? styles.filterPillActive : [styles.filterPill, isDark && styles.filterPillDark]}
                    onPress={() => handleFilterLevel(3)}
                >
                    <Text style={selectedLevel === 3 ? styles.filterPillTextActive : [styles.filterPillText, isDark && styles.textMutedDark]}>
                        CẤP 3
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Data Table */}
            <View style={[styles.tableCard, isDark && styles.tableCardDark]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                    <View style={styles.tableInner}>
                        {/* Table Header */}
                        <View style={[styles.tableHeader, isDark && styles.tableHeaderDark]}>
                            <View style={[styles.headerCell, styles.colStt]}>
                                <Text style={[styles.headerText, isDark && styles.textMutedDark]}>STT</Text>
                            </View>
                            <View style={[styles.headerCell, styles.colTenDonVi]}>
                                <Text style={[styles.headerText, isDark && styles.textMutedDark]}>Tên đơn vị</Text>
                            </View>
                            <View style={[styles.headerCell, styles.colCap]}>
                                <Text style={[styles.headerText, isDark && styles.textMutedDark]}>Cấp đơn vị</Text>
                            </View>
                            <View style={[styles.headerCell, styles.colNguoiQuanLy]}>
                                <Text style={[styles.headerText, isDark && styles.textMutedDark]}>Người quản lý</Text>
                            </View>
                            <View style={[styles.headerCell, styles.colSoDienThoai]}>
                                <Text style={[styles.headerText, isDark && styles.textMutedDark]}>Số điện thoại</Text>
                            </View>
                        </View>

                        {/* Table Body */}
                        {loading ? (
                            <Loading message="Đang tải danh sách đơn vị..." />
                        ) : data.length === 0 ? (
                            <View style={styles.emptyContainer}>
                                <Text style={[styles.emptyText, isDark && styles.textMutedDark]}>
                                    Không có đơn vị nào phù hợp
                                </Text>
                            </View>
                        ) : data.map((row, index) => {
                            return (
                                <View
                                    key={row.id}
                                    style={[
                                        styles.tableRow,
                                        isDark && styles.tableRowDark,
                                        index % 2 !== 0 && (isDark ? styles.tableRowAltDark : styles.tableRowAlt)
                                    ]}
                                >
                                    <View style={[styles.cell, styles.colStt]}>
                                        <Text style={[styles.cellTextNumber, isDark && styles.textDark]}>
                                            {row.sttsapXep || index + 1}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        style={[styles.cell, styles.colTenDonVi]}
                                        onPress={() => handleShowDetail(row)}
                                    >
                                        <Text style={[styles.cellTextName, { color: '#38396a', textDecorationLine: 'underline' }, isDark && styles.textPrimaryDark]}>
                                            {row.tenDonVi}
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={[styles.cell, styles.colCap]}>
                                        <Badge
                                            label={`Cấp ${row.level}`}
                                            variant={row.level === 1 ? 'info' : row.level === 2 ? 'success' : 'default'}
                                            isDark={isDark}
                                        />
                                    </View>
                                    <View style={[styles.cell, styles.colNguoiQuanLy]}>
                                        <Text style={[styles.cellTextNumber, isDark && styles.textDark]}>
                                            {row.hoVaTenNguoiQuanLy || '-'}
                                        </Text>
                                    </View>
                                    <View style={[styles.cell, styles.colSoDienThoai]}>
                                        <Text style={[styles.cellTextDate, isDark && styles.textMutedDark]}>
                                            {row.soDienThoai || '-'}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
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
                                <Text style={[styles.modalTitle, isDark && styles.textDark]}>Chi tiết đơn vị</Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                                setIsModalVisible(false);
                                setSelectedRecord(null);
                            }}>
                                <X size={24} color={isDark ? "#94a3b8" : "#464652"} />
                            </TouchableOpacity>
                        </View>

                        {selectedRecord ? (
                            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                                <View style={styles.detailSection}>
                                    <View style={styles.sectionHeader}>
                                        <Building2 size={18} color="#222353" />
                                        <Text style={styles.sectionTitle}>Thông tin đơn vị</Text>
                                    </View>

                                    <View style={styles.infoGrid}>
                                        <View style={styles.infoItem}>
                                            <Building2 size={14} color="#64748b" />
                                            <Text style={styles.infoLabel}>Tên đơn vị:</Text>
                                            <Text style={[styles.infoValue, isDark && styles.textDark]}>{selectedRecord.tenDonVi}</Text>
                                        </View>
                                        <View style={styles.infoItem}>
                                            <Hash size={14} color="#64748b" />
                                            <Text style={styles.infoLabel}>Cấp đơn vị:</Text>
                                            <Text style={[styles.infoValue, isDark && styles.textDark]}>Cấp {selectedRecord.level}</Text>
                                        </View>
                                        <View style={styles.infoItem}>
                                            <User size={14} color="#64748b" />
                                            <Text style={styles.infoLabel}>Người quản lý:</Text>
                                            <Text style={[styles.infoValue, isDark && styles.textDark]}>{selectedRecord.hoVaTenNguoiQuanLy || 'Chưa cập nhật'}</Text>
                                        </View>
                                        <View style={styles.infoItem}>
                                            <ShieldCheck size={14} color="#64748b" />
                                            <Text style={styles.infoLabel}>Chức danh:</Text>
                                            <Text style={[styles.infoValue, isDark && styles.textDark]}>{selectedRecord.chucDanhQuanLy || 'Chưa cập nhật'}</Text>
                                        </View>
                                        <View style={styles.infoItem}>
                                            <Phone size={14} color="#64748b" />
                                            <Text style={styles.infoLabel}>Số điện thoại:</Text>
                                            <Text style={[styles.infoValue, isDark && styles.textDark]}>{selectedRecord.soDienThoai || 'Chưa cập nhật'}</Text>
                                        </View>
                                        <View style={styles.infoItem}>
                                            <MapPin size={14} color="#64748b" />
                                            <Text style={styles.infoLabel}>Địa chỉ:</Text>
                                            <Text style={[styles.infoValue, isDark && styles.textDark]}>{selectedRecord.diaChi || 'Chưa cập nhật'}</Text>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        ) : null}

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
export default Analytics;
