import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Line, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';

export interface BarChartDataPoint {
    label: string;
    value: number;
    subValue?: number;
    color?: string;
}

interface BarChartProps {
    data: BarChartDataPoint[];
    height?: number;
    primaryColor?: string;
    showGrid?: boolean;
    isDark?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({
    data,
    height = 200,
    primaryColor = '#10b981',
    showGrid = true,
    isDark = false,
}) => {
    if (!data || data.length === 0) return null;

    const [chartWidth, setChartWidth] = React.useState(320);

    const paddingHorizontal = 36;
    const paddingBottom = 28;
    const paddingTop = 24;
    const chartAreaWidth = Math.max(chartWidth - paddingHorizontal * 2, 50);
    const chartAreaHeight = height - paddingTop - paddingBottom;

    const values = data.map(d => d.value);
    const maxVal = Math.max(...values, 10) * 1.15;
    const minVal = 0;

    const barGroupWidth = chartAreaWidth / data.length;
    const barWidth = Math.min(Math.max(barGroupWidth * 0.45, 14), 32);

    const gridColor = isDark ? '#334155' : '#e2e8f0';
    const textColor = isDark ? '#94a3b8' : '#64748b';

    return (
        <View
            style={styles.container}
            onLayout={(e) => {
                const w = e.nativeEvent.layout.width;
                if (w > 0) setChartWidth(w);
            }}
        >
            <Svg width={chartWidth} height={height}>
                <Defs>
                    <LinearGradient id="barGradientPrimary" x1="0" y1="0" x2="0" y2="1">
                        <Stop offset="0%" stopColor={primaryColor} stopOpacity="1" />
                        <Stop offset="100%" stopColor={primaryColor} stopOpacity="0.7" />
                    </LinearGradient>
                </Defs>

                {/* Horizontal Grid lines */}
                {showGrid && [0, 0.33, 0.66, 1].map((ratio, idx) => {
                    const y = paddingTop + chartAreaHeight * (1 - ratio);
                    const gridVal = Math.round(minVal + (maxVal - minVal) * ratio);
                    return (
                        <React.Fragment key={idx}>
                            <Line
                                x1={paddingHorizontal - 6}
                                y1={y}
                                x2={chartWidth - paddingHorizontal + 6}
                                y2={y}
                                stroke={gridColor}
                                strokeDasharray="3 3"
                                strokeWidth="1"
                            />
                            <SvgText
                                x={paddingHorizontal - 10}
                                y={y + 3}
                                fill={textColor}
                                fontSize="10"
                                textAnchor="end"
                                fontWeight="500"
                            >
                                {gridVal}
                            </SvgText>
                        </React.Fragment>
                    );
                })}

                {/* Bars & Labels */}
                {data.map((item, index) => {
                    const groupCenterX = paddingHorizontal + index * barGroupWidth + barGroupWidth / 2;
                    const barHeight = (item.value / maxVal) * chartAreaHeight;
                    const barY = paddingTop + (chartAreaHeight - barHeight);
                    const barX = groupCenterX - barWidth / 2;

                    return (
                        <React.Fragment key={index}>
                            {/* Bar shape */}
                            <Rect
                                x={barX}
                                y={barY}
                                width={barWidth}
                                height={Math.max(barHeight, 2)}
                                rx={barWidth / 3}
                                ry={barWidth / 3}
                                fill={item.color || 'url(#barGradientPrimary)'}
                            />

                            {/* Value label on top of bar */}
                            <SvgText
                                x={groupCenterX}
                                y={barY - 6}
                                fill={isDark ? '#e2e8f0' : '#1e293b'}
                                fontSize="11"
                                fontWeight="700"
                                textAnchor="middle"
                            >
                                {item.value}
                            </SvgText>

                            {/* X-axis label */}
                            <SvgText
                                x={groupCenterX}
                                y={height - 8}
                                fill={textColor}
                                fontSize="10"
                                fontWeight="600"
                                textAnchor="middle"
                            >
                                {item.label.length > 14 ? item.label.slice(0, 12) + '…' : item.label}
                            </SvgText>
                        </React.Fragment>
                    );
                })}
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default BarChart;
