import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react-native';

export interface StatItem {
    id: string;
    title: string;
    value: string | number;
    subText?: string;
    changeRate?: string;
    isIncrease?: boolean;
    icon: LucideIcon;
    color: string;
    bgColor: string;
    sparklineData?: number[];
}

interface StatSummaryCardsProps {
    items: StatItem[];
    isDark?: boolean;
}

export const StatSummaryCards: React.FC<StatSummaryCardsProps> = ({ items, isDark = false }) => {
    const renderMiniSparkline = (data: number[] = [30, 45, 35, 60, 55, 80], color: string = '#2563eb') => {
        const width = 70;
        const height = 28;
        const max = Math.max(...data, 1);
        const min = Math.min(...data, 0);

        const pts = data.map((v, i) => {
            const x = (i / (data.length - 1)) * width;
            const y = height - ((v - min) / (max - min || 1)) * (height - 6) - 3;
            return `${x},${y}`;
        });

        const pathD = `M ${pts.join(' L ')}`;

        return (
            <Svg width={width} height={height} style={styles.sparkline}>
                <Path
                    d={pathD}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.8"
                />
            </Svg>
        );
    };

    return (
        <View style={styles.container}>
            {items.map((item) => {
                const IconComponent = item.icon;
                return (
                    <View
                        key={item.id}
                        style={[
                            styles.card,
                            isDark && styles.cardDark,
                            { borderLeftColor: item.color, borderLeftWidth: 4 }
                        ]}
                    >
                        <View style={styles.cardHeader}>
                            <View style={[styles.iconWrapper, { backgroundColor: item.bgColor }]}>
                                <IconComponent size={18} color={item.color} />
                            </View>

                            {item.changeRate && (
                                <View
                                    style={[
                                        styles.badge,
                                        item.isIncrease ? styles.badgeSuccess : styles.badgeDanger,
                                        isDark && (item.isIncrease ? styles.badgeSuccessDark : styles.badgeDangerDark)
                                    ]}
                                >
                                    {item.isIncrease ? (
                                        <TrendingUp size={12} color={item.isIncrease ? '#059669' : '#dc2626'} />
                                    ) : (
                                        <TrendingDown size={12} color="#dc2626" />
                                    )}
                                    <Text
                                        style={[
                                            styles.badgeText,
                                            { color: item.isIncrease ? '#059669' : '#dc2626' }
                                        ]}
                                    >
                                        {item.changeRate}
                                    </Text>
                                </View>
                            )}
                        </View>

                        <View style={styles.cardBody}>
                            <Text style={[styles.title, isDark && styles.textMutedDark]} numberOfLines={1}>
                                {item.title}
                            </Text>
                            <View style={styles.valueRow}>
                                <Text style={[styles.value, isDark && styles.textDark]}>
                                    {item.value}
                                </Text>
                                {renderMiniSparkline(item.sparklineData, item.color)}
                            </View>
                            {item.subText && (
                                <Text style={[styles.subText, isDark && styles.textMutedDark]} numberOfLines={1}>
                                    {item.subText}
                                </Text>
                            )}
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 16,
    },
    card: {
        width: '48%',
        backgroundColor: '#ffffff',
        borderRadius: 14,
        padding: 14,
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    cardDark: {
        backgroundColor: '#1e293b',
        borderColor: '#334155',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    iconWrapper: {
        width: 34,
        height: 34,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        gap: 2,
    },
    badgeSuccess: {
        backgroundColor: '#ecfdf5',
    },
    badgeDanger: {
        backgroundColor: '#fef2f2',
    },
    badgeSuccessDark: {
        backgroundColor: 'rgba(5, 150, 105, 0.2)',
    },
    badgeDangerDark: {
        backgroundColor: 'rgba(220, 38, 38, 0.2)',
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '700',
    },
    cardBody: {
        gap: 4,
    },
    title: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '600',
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    value: {
        fontSize: 20,
        fontWeight: '800',
        color: '#0f172a',
        letterSpacing: -0.5,
    },
    sparkline: {
        marginTop: 2,
    },
    subText: {
        fontSize: 11,
        color: '#94a3b8',
        marginTop: 2,
    },
    textDark: {
        color: '#f8fafc',
    },
    textMutedDark: {
        color: '#94a3b8',
    },
});

export default StatSummaryCards;
