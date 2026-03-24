import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FileText, BarChart2, Activity, Download, Eye } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import Svg, { Circle } from 'react-native-svg';
import { API_BASE_URL } from '../config';

export const Reports = () => {
    const { isDark } = useTheme();
    const [stats, setStats] = useState({ total: 0, completed: 0, incomplete: 0 });
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/thuetainguyen/stats?filter=${activeFilter}`);
                const json = await response.json();
                if (json.success) {
                    setStats(json.data);
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, [activeFilter]);

    const completedPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

    const radius = 80;
    const strokeWidth = 24;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (completedPercentage / 100) * circumference;

    return (
        <View style={styles.container}>
            {/* Header Summary */}
            <View style={styles.headerSection}>
                <Text style={[styles.title, isDark && styles.textDark]}>Thống kê</Text>
                <Text style={[styles.subtitle, isDark && styles.textMutedDark]}>
                    Tổng hợp hồ sơ
                </Text>
            </View>

            {/* Interactive Filter */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filterScroll}
                contentContainerStyle={styles.filterContainer}
            >
                <TouchableOpacity 
                    onPress={() => setActiveFilter('all')}
                    style={activeFilter === 'all' ? styles.filterPillActive : [styles.filterPill, isDark && styles.filterPillDark]}
                >
                    <Text style={activeFilter === 'all' ? styles.filterPillTextActive : [styles.filterPillText, isDark && styles.textMutedDark]}>TẤT CẢ</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => setActiveFilter('week')}
                    style={activeFilter === 'week' ? styles.filterPillActive : [styles.filterPill, isDark && styles.filterPillDark]}
                >
                    <Text style={activeFilter === 'week' ? styles.filterPillTextActive : [styles.filterPillText, isDark && styles.textMutedDark]}>THEO TUẦN</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => setActiveFilter('month')}
                    style={activeFilter === 'month' ? styles.filterPillActive : [styles.filterPill, isDark && styles.filterPillDark]}
                >
                    <Text style={activeFilter === 'month' ? styles.filterPillTextActive : [styles.filterPillText, isDark && styles.textMutedDark]}>THEO THÁNG</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => setActiveFilter('quarter')}
                    style={activeFilter === 'quarter' ? styles.filterPillActive : [styles.filterPill, isDark && styles.filterPillDark]}
                >
                    <Text style={activeFilter === 'quarter' ? styles.filterPillTextActive : [styles.filterPillText, isDark && styles.textMutedDark]}>THEO QUÝ</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => setActiveFilter('year')}
                    style={activeFilter === 'year' ? styles.filterPillActive : [styles.filterPill, isDark && styles.filterPillDark]}
                >
                    <Text style={activeFilter === 'year' ? styles.filterPillTextActive : [styles.filterPillText, isDark && styles.textMutedDark]}>THEO NĂM</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Main Analytics Card: Donut Chart */}
            <View style={[styles.card, isDark && styles.cardDark]}>
                <View style={styles.cardHeader}>
                    <View>
                        <Text style={[styles.cardTitle, isDark && styles.textDark]}>Biểu đồ hồ sơ Thuế tài nguyên</Text>
                        <Text style={[styles.cardSubtitle, isDark && styles.textMutedDark]}>Tổng hợp hồ sơ</Text>
                    </View>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>+{completedPercentage}%</Text>
                    </View>
                </View>

                <View style={styles.chartContainer}>
                    <View style={styles.svgWrapper}>
                        <Svg height="200" width="200" viewBox="0 0 200 200">
                            {/* Background Circle */}
                            <Circle
                                cx="100"
                                cy="100"
                                r={radius}
                                stroke={isDark ? "#334155" : "#e2e8f0"}
                                strokeWidth={strokeWidth}
                                fill="transparent"
                            />
                            {/* Progress Circle */}
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
                            <Text style={[styles.donutValue, isDark && styles.textDark]}>{completedPercentage}%</Text>
                            <Text style={[styles.donutLabel, isDark && styles.textMutedDark]}>HOÀN THÀNH</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.statsGrid}>
                    <View style={styles.statItem}>
                        <View style={styles.statLabelContainer}>
                            <View style={[styles.dot, { backgroundColor: '#222353' }]} />
                            <Text style={[styles.statLabel, isDark && styles.textMutedDark]}>TỔNG CỘNG</Text>
                        </View>
                        <Text style={[styles.statValue, isDark && styles.textDark]}>{stats.total}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <View style={styles.statLabelContainer}>
                            <View style={[styles.dot, { backgroundColor: '#5a5b82' }]} />
                            <Text style={[styles.statLabel, isDark && styles.textMutedDark]}>ĐÃ HOÀN THÀNH</Text>
                        </View>
                        <Text style={[styles.statValue, isDark && styles.textDark]}>{stats.completed}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <View style={styles.statLabelContainer}>
                            <View style={[styles.dot, { backgroundColor: '#c1c1fc' }]} />
                            <Text style={[styles.statLabel, isDark && styles.textMutedDark]}>CHƯA HOÀN THÀNH</Text>
                        </View>
                        <Text style={[styles.statValue, isDark && styles.textDark]}>{stats.incomplete}</Text>
                    </View>
                </View>
            </View>

            {/* Category Breakdown Grid */}
            <View style={styles.gridContainer}>
                {/* Card 1: Device Usage */}
                <View style={[styles.gridCard, isDark && styles.cardDark]}>
                    <Text style={[styles.gridCardTitle, isDark && styles.textDark]}>Device Usage</Text>
                    <View style={styles.miniChartContainer}>
                        <View style={[styles.miniPieChart, isDark && styles.miniPieChartDark]} />
                    </View>
                    <View style={styles.gridStatRow}>
                        <Text style={[styles.gridStatLabel, isDark && styles.textMutedDark]}>Mobile</Text>
                        <Text style={[styles.gridStatValue, isDark && styles.textDark]}>62%</Text>
                    </View>
                    <View style={styles.gridStatRow}>
                        <Text style={[styles.gridStatLabel, isDark && styles.textMutedDark]}>Desktop</Text>
                        <Text style={[styles.gridStatValue, isDark && styles.textDark]}>38%</Text>
                    </View>
                </View>

                {/* Card 2: User Growth */}
                <View style={[styles.gridCard, isDark && styles.cardDark]}>
                    <Text style={[styles.gridCardTitle, isDark && styles.textDark]}>User Growth</Text>
                    <View style={styles.miniChartContainer}>
                        <View style={[styles.miniPieChart, isDark && styles.miniPieChartDark]} />
                    </View>
                    <View style={styles.gridStatRow}>
                        <Text style={[styles.gridStatLabel, isDark && styles.textMutedDark]}>NAM</Text>
                        <Text style={[styles.gridStatValue, isDark && styles.textDark]}>74%</Text>
                    </View>
                    <View style={styles.gridStatRow}>
                        <Text style={[styles.gridStatLabel, isDark && styles.textMutedDark]}>EMEA</Text>
                        <Text style={[styles.gridStatValue, isDark && styles.textDark]}>26%</Text>
                    </View>
                </View>
            </View>

            {/* Recent Reports List */}
            <View style={styles.listSection}>
                <View style={styles.listHeader}>
                    <Text style={[styles.listTitle, isDark && styles.textDark]}>Recent Reports</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.listContainer}>
                    {/* Report Item 1 */}
                    <TouchableOpacity style={[styles.listItem, isDark && styles.cardDark]}>
                        <View style={styles.listItemLeft}>
                            <View style={[styles.iconContainer, isDark && styles.iconContainerDark]}>
                                <FileText size={24} color={isDark ? "#c1c1fc" : "#222353"} />
                            </View>
                            <View>
                                <Text style={[styles.listItemTitle, isDark && styles.textDark]}>Q3 Revenue Breakdown</Text>
                                <Text style={[styles.listItemSubtitle, isDark && styles.textMutedDark]}>PDF • 2.4 MB • Oct 12</Text>
                            </View>
                        </View>
                        <View style={[styles.actionButton, isDark && styles.actionButtonDark]}>
                            <Download size={20} color={isDark ? "#c1c1fc" : "#38396a"} />
                        </View>
                    </TouchableOpacity>

                    {/* Report Item 2 */}
                    <TouchableOpacity style={[styles.listItem, isDark && styles.cardDark]}>
                        <View style={styles.listItemLeft}>
                            <View style={[styles.iconContainer, isDark && styles.iconContainerDark]}>
                                <BarChart2 size={24} color={isDark ? "#c1c1fc" : "#222353"} />
                            </View>
                            <View>
                                <Text style={[styles.listItemTitle, isDark && styles.textDark]}>Marketing Funnel Analysis</Text>
                                <Text style={[styles.listItemSubtitle, isDark && styles.textMutedDark]}>XLSX • 1.1 MB • Oct 10</Text>
                            </View>
                        </View>
                        <View style={[styles.actionButton, isDark && styles.actionButtonDark]}>
                            <Eye size={20} color={isDark ? "#c1c1fc" : "#38396a"} />
                        </View>
                    </TouchableOpacity>

                    {/* Report Item 3 */}
                    <TouchableOpacity style={[styles.listItem, isDark && styles.cardDark]}>
                        <View style={styles.listItemLeft}>
                            <View style={[styles.iconContainer, isDark && styles.iconContainerDark]}>
                                <Activity size={24} color={isDark ? "#c1c1fc" : "#222353"} />
                            </View>
                            <View>
                                <Text style={[styles.listItemTitle, isDark && styles.textDark]}>System Health Check</Text>
                                <Text style={[styles.listItemSubtitle, isDark && styles.textMutedDark]}>PDF • 4.8 MB • Oct 08</Text>
                            </View>
                        </View>
                        <View style={[styles.actionButton, isDark && styles.actionButtonDark]}>
                            <Download size={20} color={isDark ? "#c1c1fc" : "#38396a"} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 24,
    },
    headerSection: {
        paddingHorizontal: 8,
    },
    title: {
        fontFamily: 'Manrope',
        fontSize: 24,
        fontWeight: '800',
        color: '#222353',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        color: '#464652',
        marginTop: 4,
        lineHeight: 20,
    },
    filterScroll: {
        marginHorizontal: -24,
    },
    filterContainer: {
        paddingHorizontal: 24,
        gap: 8,
    },
    filterPillActive: {
        backgroundColor: '#222353',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 999,
    },
    filterPillTextActive: {
        color: '#ffffff',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1,
    },
    filterPill: {
        backgroundColor: '#e7e8e9',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 999,
    },
    filterPillDark: {
        backgroundColor: '#1e293b',
    },
    filterPillText: {
        color: '#464652',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 24,
        shadowColor: '#191c1d',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.04,
        shadowRadius: 40,
        elevation: 2,
    },
    cardDark: {
        backgroundColor: '#1e293b',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    cardTitle: {
        fontFamily: 'Manrope',
        fontSize: 18,
        fontWeight: '700',
        color: '#222353',
    },
    cardSubtitle: {
        fontSize: 12,
        color: '#464652',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginTop: 2,
    },
    badge: {
        backgroundColor: '#ffdbcb',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    badgeText: {
        color: '#341100',
        fontSize: 10,
        fontWeight: '700',
    },
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    svgWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    donutContent: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    donutChart: {
        width: 192,
        height: 192,
        borderRadius: 96,
        borderWidth: 24,
        borderColor: '#222353',
        borderTopColor: '#5a5b82',
        borderRightColor: '#c1c1fc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    donutChartDark: {
        borderColor: '#c1c1fc',
        borderTopColor: '#5a5b82',
        borderRightColor: '#222353',
    },
    donutValue: {
        fontFamily: 'Manrope',
        fontSize: 36,
        fontWeight: '800',
        color: '#222353',
    },
    donutLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#464652',
        textTransform: 'uppercase',
        letterSpacing: -0.5,
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 32,
    },
    statItem: {
        gap: 4,
    },
    statLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    statLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#464652',
    },
    statValue: {
        fontFamily: 'Manrope',
        fontSize: 14,
        fontWeight: '700',
        color: '#222353',
    },
    gridContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    gridCard: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#191c1d',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.04,
        shadowRadius: 40,
        elevation: 2,
    },
    gridCardTitle: {
        fontFamily: 'Manrope',
        fontSize: 14,
        fontWeight: '700',
        color: '#222353',
        marginBottom: 16,
    },
    miniChartContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    miniPieChart: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: '#222353',
        borderRightWidth: 48,
        borderBottomWidth: 48,
        borderColor: '#f3f4f5',
    },
    miniPieChartDark: {
        backgroundColor: '#c1c1fc',
        borderColor: '#0f172a',
    },
    gridStatRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    gridStatLabel: {
        fontSize: 10,
        fontWeight: '500',
        color: '#464652',
    },
    gridStatValue: {
        fontSize: 10,
        fontWeight: '700',
        color: '#222353',
    },
    listSection: {
        gap: 16,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    listTitle: {
        fontFamily: 'Manrope',
        fontSize: 16,
        fontWeight: '700',
        color: '#222353',
    },
    viewAllText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#38396a',
    },
    listContainer: {
        gap: 12,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 12,
    },
    listItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#f3f4f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainerDark: {
        backgroundColor: '#334155',
    },
    listItemTitle: {
        fontFamily: 'Manrope',
        fontSize: 14,
        fontWeight: '700',
        color: '#222353',
    },
    listItemSubtitle: {
        fontSize: 11,
        color: '#464652',
        marginTop: 2,
    },
    actionButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#edeeef',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonDark: {
        backgroundColor: '#334155',
    },
    textDark: {
        color: '#ffffff',
    },
    textMutedDark: {
        color: '#94a3b8',
    },
});