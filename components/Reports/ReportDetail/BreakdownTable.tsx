import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface BreakdownRow {
    id: string;
    label: string;
    subLabel?: string;
    count: number;
    percentage: number;
    statusBadge?: {
        text: string;
        color: string;
        bgColor: string;
    };
    barColor?: string;
}

interface BreakdownTableProps {
    title?: string;
    subtitle?: string;
    rows: BreakdownRow[];
    isDark?: boolean;
}

export const BreakdownTable: React.FC<BreakdownTableProps> = ({
    title = 'Chi tiết phân bổ số liệu',
    subtitle = 'Bảng dữ liệu phân rã theo nhóm và tiến độ',
    rows,
    isDark = false,
}) => {
    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            <View style={styles.header}>
                <Text style={[styles.title, isDark && styles.textDark]}>{title}</Text>
                {subtitle && (
                    <Text style={[styles.subtitle, isDark && styles.textMutedDark]}>{subtitle}</Text>
                )}
            </View>

            <View style={styles.tableBody}>
                {rows.map((row, index) => {
                    const isLast = index === rows.length - 1;
                    return (
                        <View
                            key={row.id}
                            style={[
                                styles.row,
                                !isLast && (isDark ? styles.rowBorderDark : styles.rowBorder)
                            ]}
                        >
                            <View style={styles.rowTop}>
                                <View style={styles.labelCol}>
                                    <Text style={[styles.labelText, isDark && styles.textDark]} numberOfLines={1}>
                                        {row.label}
                                    </Text>
                                    {row.subLabel && (
                                        <Text style={[styles.subLabelText, isDark && styles.textMutedDark]}>
                                            {row.subLabel}
                                        </Text>
                                    )}
                                </View>

                                <View style={styles.valueCol}>
                                    <Text style={[styles.countText, isDark && styles.textDark]}>
                                        {row.count} hồ sơ
                                    </Text>
                                    <Text style={[styles.percentText, isDark && styles.textMutedDark]}>
                                        {row.percentage}%
                                    </Text>
                                </View>
                            </View>

                            {/* Mini horizontal progress bar */}
                            <View style={[styles.progressTrack, isDark && styles.progressTrackDark]}>
                                <View
                                    style={[
                                        styles.progressBar,
                                        {
                                            width: `${Math.min(Math.max(row.percentage, 2), 100)}%`,
                                            backgroundColor: row.barColor || '#2563eb'
                                        }
                                    ]}
                                />
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
        marginBottom: 20,
    },
    containerDark: {
        backgroundColor: '#1e293b',
        borderColor: '#334155',
    },
    header: {
        marginBottom: 14,
    },
    title: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0f172a',
    },
    subtitle: {
        fontSize: 12,
        color: '#64748b',
        marginTop: 2,
    },
    tableBody: {
        gap: 12,
    },
    row: {
        paddingBottom: 10,
    },
    rowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    rowBorderDark: {
        borderBottomWidth: 1,
        borderBottomColor: '#334155',
    },
    rowTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    labelCol: {
        flex: 1,
        marginRight: 12,
    },
    labelText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1e293b',
    },
    subLabelText: {
        fontSize: 11,
        color: '#64748b',
        marginTop: 2,
    },
    valueCol: {
        alignItems: 'flex-end',
    },
    countText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#0f172a',
    },
    percentText: {
        fontSize: 11,
        color: '#64748b',
        marginTop: 1,
    },
    progressTrack: {
        height: 6,
        borderRadius: 3,
        backgroundColor: '#f1f5f9',
        overflow: 'hidden',
    },
    progressTrackDark: {
        backgroundColor: '#334155',
    },
    progressBar: {
        height: '100%',
        borderRadius: 3,
    },
    textDark: {
        color: '#f8fafc',
    },
    textMutedDark: {
        color: '#94a3b8',
    },
});

export default BreakdownTable;
