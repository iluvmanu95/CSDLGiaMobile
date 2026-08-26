import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

export interface PieDataPoint {
    label: string;
    value: number;
    color: string;
}

interface DonutChartProps {
    data: PieDataPoint[];
    size?: number;
    strokeWidth?: number;
    centerLabel?: string;
    centerSubLabel?: string;
    isDark?: boolean;
}

export const DonutChart: React.FC<DonutChartProps> = ({
    data,
    size = 180,
    strokeWidth = 24,
    centerLabel,
    centerSubLabel = 'Tổng số',
    isDark = false,
}) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    const radius = (size - strokeWidth) / 2;
    const center = size / 2;

    const createArc = (startAngle: number, endAngle: number) => {
        const startRad = (startAngle - 90) * (Math.PI / 180);
        const endRad = (endAngle - 90) * (Math.PI / 180);

        const x1 = center + radius * Math.cos(startRad);
        const y1 = center + radius * Math.sin(startRad);
        const x2 = center + radius * Math.cos(endRad);
        const y2 = center + radius * Math.sin(endRad);

        const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

        return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
    };

    let currentAngle = 0;
    const slices = data.map((item) => {
        if (total === 0) return { ...item, path: '', percentage: 0 };
        const angle = (item.value / total) * 360;
        const safeAngle = Math.min(Math.max(angle, 1), 359.99);
        const path = createArc(currentAngle, currentAngle + safeAngle);
        currentAngle += angle;
        const percentage = Math.round((item.value / total) * 100);
        return {
            ...item,
            path,
            percentage,
        };
    });

    return (
        <View style={styles.container}>
            <View style={{ width: size, height: size, position: 'relative' }}>
                <Svg width={size} height={size}>
                    <G>
                        {total === 0 ? (
                            <Path
                                d={createArc(0, 359.9)}
                                stroke={isDark ? '#334155' : '#e2e8f0'}
                                strokeWidth={strokeWidth}
                                fill="none"
                            />
                        ) : (
                            slices.map((slice, idx) => (
                                <Path
                                    key={idx}
                                    d={slice.path}
                                    stroke={slice.color}
                                    strokeWidth={strokeWidth}
                                    strokeLinecap="round"
                                    fill="none"
                                />
                            ))
                        )}
                    </G>
                </Svg>

                {/* Center metric text */}
                <View style={styles.centerContainer}>
                    <Text style={[styles.centerValue, isDark && styles.textDark]}>
                        {centerLabel !== undefined ? centerLabel : total}
                    </Text>
                    <Text style={[styles.centerSubText, isDark && styles.textMutedDark]}>
                        {centerSubLabel}
                    </Text>
                </View>
            </View>

            {/* Detailed Legend grid */}
            <View style={styles.legendContainer}>
                {slices.map((item, index) => (
                    <View key={index} style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                        <View style={styles.legendTextWrapper}>
                            <Text style={[styles.legendLabel, isDark && styles.textDark]} numberOfLines={1}>
                                {item.label}
                            </Text>
                            <Text style={[styles.legendValue, isDark && styles.textMutedDark]}>
                                {item.value} ({item.percentage}%)
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    centerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerValue: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1e293b',
    },
    centerSubText: {
        fontSize: 11,
        color: '#64748b',
        fontWeight: '500',
        marginTop: 2,
    },
    legendContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 18,
        justifyContent: 'space-between',
        gap: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%',
    },
    legendDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 8,
    },
    legendTextWrapper: {
        flex: 1,
    },
    legendLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#334155',
    },
    legendValue: {
        fontSize: 11,
        color: '#64748b',
        marginTop: 1,
    },
    textDark: {
        color: '#f8fafc',
    },
    textMutedDark: {
        color: '#94a3b8',
    },
});

export default DonutChart;
