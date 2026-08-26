import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft, RefreshCw, Calendar, Tag, Share2 } from 'lucide-react-native';
import { ReportOption, PeriodType } from '../../../screens/Reports/types';

interface ReportHeaderProps {
    report: ReportOption;
    periodType: PeriodType;
    filterSummary: string;
    businessName?: string;
    onBack: () => void;
    onRefresh: () => void;
    onExport?: () => void;
    isDark?: boolean;
}

export const ReportHeader: React.FC<ReportHeaderProps> = ({
    report,
    periodType,
    filterSummary,
    businessName,
    onBack,
    onRefresh,
    onExport,
    isDark = false,
}) => {
    return (
        <View style={styles.container}>
            {/* Top row with Back button & Action buttons */}
            <View style={styles.topRow}>
                <TouchableOpacity
                    style={[styles.backButton, isDark && styles.iconBtnDark]}
                    onPress={onBack}
                    activeOpacity={0.7}
                >
                    <ArrowLeft size={20} color={isDark ? '#f8fafc' : '#1e293b'} />
                </TouchableOpacity>

                <View style={styles.actions}>
                    <TouchableOpacity
                        style={[styles.actionBtn, isDark && styles.iconBtnDark]}
                        onPress={onRefresh}
                        activeOpacity={0.7}
                    >
                        <RefreshCw size={17} color={isDark ? '#cbd5e1' : '#475569'} />
                    </TouchableOpacity>

                    {onExport && (
                        <TouchableOpacity
                            style={[styles.actionBtn, isDark && styles.iconBtnDark]}
                            onPress={onExport}
                            activeOpacity={0.7}
                        >
                            <Share2 size={17} color={isDark ? '#cbd5e1' : '#475569'} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Title & Description */}
            <View style={styles.titleSection}>
                <View style={styles.titleBadgeRow}>
                    <View style={[styles.typeBadge, { backgroundColor: report.bgColor }]}>
                        <Text style={[styles.typeBadgeText, { color: report.color }]}>
                            {report.type === 'dinh_gia' ? 'ĐỊNH GIÁ' :
                             report.type === 'ke_khai' ? 'KÊ KHAI GIÁ' :
                             report.type === 'tham_dinh' ? 'THẨM ĐỊNH GIÁ' : 'GIÁ THỊ TRƯỜNG'}
                        </Text>
                    </View>
                </View>

                <Text style={[styles.title, isDark && styles.textDark]}>
                    {report.title}
                </Text>
                <Text style={[styles.subtitle, isDark && styles.textMutedDark]}>
                    {report.description}
                </Text>
            </View>

            {/* Filter Pills Summary */}
            <View style={styles.filterPillsContainer}>
                <View style={[styles.filterPill, isDark && styles.filterPillDark]}>
                    <Calendar size={13} color={isDark ? '#94a3b8' : '#64748b'} />
                    <Text style={[styles.filterPillText, isDark && styles.textDark]}>
                        {filterSummary}
                    </Text>
                </View>

                {businessName && (
                    <View style={[styles.filterPill, isDark && styles.filterPillDark]}>
                        <Tag size={13} color={isDark ? '#94a3b8' : '#64748b'} />
                        <Text style={[styles.filterPillText, isDark && styles.textDark]} numberOfLines={1}>
                            {businessName}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    backButton: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    actionBtn: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    iconBtnDark: {
        backgroundColor: '#1e293b',
        borderColor: '#334155',
    },
    titleSection: {
        gap: 4,
    },
    titleBadgeRow: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    typeBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    typeBadgeText: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    title: {
        fontSize: 19,
        fontWeight: '800',
        color: '#0f172a',
        lineHeight: 24,
        letterSpacing: -0.4,
    },
    subtitle: {
        fontSize: 12,
        color: '#64748b',
        lineHeight: 16,
    },
    filterPillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 12,
    },
    filterPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        backgroundColor: '#f1f5f9',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    filterPillDark: {
        backgroundColor: '#1e293b',
        borderColor: '#334155',
    },
    filterPillText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#334155',
    },
    textDark: {
        color: '#f8fafc',
    },
    textMutedDark: {
        color: '#94a3b8',
    },
});

export default ReportHeader;
