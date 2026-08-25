import styles from './style';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Building2, Users, ShieldAlert, Award } from 'lucide-react-native';
import { useTheme } from '../../store';
import Svg, { Circle } from 'react-native-svg';
import { danhMucDonViService, DanhMucDonViItem } from '../../services';
import { Loading } from '../../components';

export const Reports = () => {
    const { isDark } = useTheme();
    const [loading, setLoading] = useState(true);
    const [donVis, setDonVis] = useState<DanhMucDonViItem[]>([]);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const res = await danhMucDonViService.getAll();
                if (res.success && Array.isArray(res.data)) {
                    setDonVis(res.data);
                }
            } catch (error) {
                console.error('Error fetching don vi stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const total = donVis.length;
    const cap1Count = donVis.filter(d => d.level === 1).length;
    const cap2Count = donVis.filter(d => d.level === 2).length;
    const cap3Count = donVis.filter(d => d.level === 3).length;

    const cap1Percentage = total > 0 ? Math.round((cap1Count / total) * 100) : 0;
    const cap2Percentage = total > 0 ? Math.round((cap2Count / total) * 100) : 0;
    const cap3Percentage = total > 0 ? Math.round((cap3Count / total) * 100) : 0;

    const radius = 80;
    const strokeWidth = 24;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (cap1Percentage / 100) * circumference;

    return (
        <View style={styles.container}>
            {/* Header Summary */}
            <View style={styles.headerSection}>
                <Text style={[styles.title, isDark && styles.textDark]}>Thống kê Đơn vị</Text>
                <Text style={[styles.subtitle, isDark && styles.textMutedDark]}>
                    Tổng hợp cơ cấu phân cấp đơn vị trực thuộc
                </Text>
            </View>

            {loading ? (
                <Loading message="Đang tính toán số liệu thống kê..." />
            ) : (
                <>
                    {/* Main Analytics Card: Donut Chart */}
                    <View style={[styles.card, isDark && styles.cardDark]}>
                        <View style={styles.cardHeader}>
                            <View>
                                <Text style={[styles.cardTitle, isDark && styles.textDark]}>Phân bố cấp bậc đơn vị</Text>
                                <Text style={[styles.cardSubtitle, isDark && styles.textMutedDark]}>Tỷ lệ đơn vị cấp 1</Text>
                            </View>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{cap1Percentage}% Cấp 1</Text>
                            </View>
                        </View>

                        <View style={styles.chartContainer}>
                            <View style={styles.svgWrapper}>
                                <Svg height="200" width="200" viewBox="0 0 200 200">
                                    <Circle
                                        cx="100"
                                        cy="100"
                                        r={radius}
                                        stroke={isDark ? "#334155" : "#e2e8f0"}
                                        strokeWidth={strokeWidth}
                                        fill="transparent"
                                    />
                                    <Circle
                                        cx="100"
                                        cy="100"
                                        r={radius}
                                        stroke={isDark ? "#c1c1fc" : "#222353"}
                                        strokeWidth={strokeWidth}
                                        strokeDasharray={circumference}
                                        strokeDashoffset={strokeDashoffset}
                                        strokeLinecap="round"
                                        fill="transparent"
                                        transform="rotate(-90 100 100)"
                                    />
                                </Svg>
                                <View style={styles.donutContent}>
                                    <Text style={[styles.donutValue, isDark && styles.textDark]}>{total}</Text>
                                    <Text style={[styles.donutLabel, isDark && styles.textMutedDark]}>TỔNG ĐƠN VỊ</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.statsGrid}>
                            <View style={styles.statItem}>
                                <View style={styles.statLabelContainer}>
                                    <View style={[styles.dot, { backgroundColor: '#222353' }]} />
                                    <Text style={[styles.statLabel, isDark && styles.textMutedDark]}>CẤP 1</Text>
                                </View>
                                <Text style={[styles.statValue, isDark && styles.textDark]}>{cap1Count} ({cap1Percentage}%)</Text>
                            </View>
                            <View style={styles.statItem}>
                                <View style={styles.statLabelContainer}>
                                    <View style={[styles.dot, { backgroundColor: '#5a5b82' }]} />
                                    <Text style={[styles.statLabel, isDark && styles.textMutedDark]}>CẤP 2</Text>
                                </View>
                                <Text style={[styles.statValue, isDark && styles.textDark]}>{cap2Count} ({cap2Percentage}%)</Text>
                            </View>
                            <View style={styles.statItem}>
                                <View style={styles.statLabelContainer}>
                                    <View style={[styles.dot, { backgroundColor: '#c1c1fc' }]} />
                                    <Text style={[styles.statLabel, isDark && styles.textMutedDark]}>CẤP 3</Text>
                                </View>
                                <Text style={[styles.statValue, isDark && styles.textDark]}>{cap3Count} ({cap3Percentage}%)</Text>
                            </View>
                        </View>
                    </View>

                    {/* Breakdown Grid */}
                    <View style={styles.gridContainer}>
                        <View style={[styles.gridCard, isDark && styles.cardDark]}>
                            <Building2 size={24} color={isDark ? "#c1c1fc" : "#222353"} style={{ marginBottom: 8 }} />
                            <Text style={[styles.gridCardTitle, isDark && styles.textDark]}>Phòng ban & Chi nhánh</Text>
                            <Text style={[styles.gridStatValue, { fontSize: 22 }, isDark && styles.textDark]}>{total}</Text>
                            <Text style={[styles.gridStatLabel, isDark && styles.textMutedDark]}>Đơn vị đã đăng ký</Text>
                        </View>

                        <View style={[styles.gridCard, isDark && styles.cardDark]}>
                            <Users size={24} color={isDark ? "#c1c1fc" : "#222353"} style={{ marginBottom: 8 }} />
                            <Text style={[styles.gridCardTitle, isDark && styles.textDark]}>Người quản lý</Text>
                            <Text style={[styles.gridStatValue, { fontSize: 22 }, isDark && styles.textDark]}>
                                {donVis.filter(d => !!d.hoVaTenNguoiQuanLy).length}
                            </Text>
                            <Text style={[styles.gridStatLabel, isDark && styles.textMutedDark]}>Đã gán phụ trách</Text>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
};
export default Reports;
