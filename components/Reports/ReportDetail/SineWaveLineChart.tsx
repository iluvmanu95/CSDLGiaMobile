import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Line, Text as SvgText, Circle } from 'react-native-svg';

export interface ChartDataPoint {
    label: string;
    value: number;
    secondaryValue?: number;
}

interface SineWaveLineChartProps {
    data: ChartDataPoint[];
    height?: number;
    color?: string;
    secondaryColor?: string;
    showArea?: boolean;
    showGrid?: boolean;
    unit?: string;
    isDark?: boolean;
}

export const SineWaveLineChart: React.FC<SineWaveLineChartProps> = ({
    data,
    height = 200,
    color = '#2563eb',
    secondaryColor = '#10b981',
    showArea = true,
    showGrid = true,
    unit = 'hồ sơ',
    isDark = false,
}) => {
    if (!data || data.length === 0) return null;

    const [chartWidth, setChartWidth] = React.useState(320);

    const paddingHorizontal = 36;
    const paddingVertical = 26;
    const chartAreaWidth = Math.max(chartWidth - paddingHorizontal * 2, 50);
    const chartAreaHeight = height - paddingVertical * 2;

    const values = data.map(d => d.value);
    const minVal = 0;
    const maxVal = Math.max(...values, 10) * 1.2;

    // Coordinate mapping
    const getX = (index: number) => {
        if (data.length <= 1) return paddingHorizontal + chartAreaWidth / 2;
        return paddingHorizontal + (index / (data.length - 1)) * chartAreaWidth;
    };

    const getY = (val: number) => {
        const normalized = (val - minVal) / (maxVal - minVal);
        return paddingVertical + chartAreaHeight * (1 - normalized);
    };

    // Generate smooth cubic bezier curve path (sin-wave like)
    const points = data.map((d, i) => ({ x: getX(i), y: getY(d.value) }));

    const createSmoothPath = (pts: { x: number; y: number }[]) => {
        if (pts.length === 0) return '';
        if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;

        let d = `M ${pts[0].x} ${pts[0].y}`;
        for (let i = 0; i < pts.length - 1; i++) {
            const p0 = pts[i === 0 ? 0 : i - 1];
            const p1 = pts[i];
            const p2 = pts[i + 1];
            const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];

            // Tension parameter for smooth wave
            const tension = 0.35;
            const cp1x = p1.x + (p2.x - p0.x) * tension;
            const cp1y = p1.y + (p2.y - p0.y) * tension;
            const cp2x = p2.x - (p3.x - p1.x) * tension;
            const cp2y = p2.y - (p3.y - p1.y) * tension;

            d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
        }
        return d;
    };

    const linePath = createSmoothPath(points);
    const areaBottom = paddingVertical + chartAreaHeight;
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${areaBottom} L ${points[0].x} ${areaBottom} Z`;

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
                    <LinearGradient id="sineAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <Stop offset="0%" stopColor={color} stopOpacity="0.45" />
                        <Stop offset="50%" stopColor={color} stopOpacity="0.15" />
                        <Stop offset="100%" stopColor={color} stopOpacity="0.0" />
                    </LinearGradient>
                    <LinearGradient id="sineLineGradient" x1="0" y1="0" x2="1" y2="0">
                        <Stop offset="0%" stopColor={color} />
                        <Stop offset="100%" stopColor="#38bdf8" />
                    </LinearGradient>
                </Defs>

                {/* Horizontal Grid lines */}
                {showGrid && [0, 0.33, 0.66, 1].map((ratio, idx) => {
                    const y = paddingVertical + chartAreaHeight * (1 - ratio);
                    const gridVal = Math.round(minVal + (maxVal - minVal) * ratio);
                    return (
                        <React.Fragment key={idx}>
                            <Line
                                x1={paddingHorizontal - 8}
                                y1={y}
                                x2={chartWidth - paddingHorizontal + 8}
                                y2={y}
                                stroke={gridColor}
                                strokeDasharray="3 3"
                                strokeWidth="1"
                            />
                            <SvgText
                                x={paddingHorizontal - 12}
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

                {/* Area Fill under curve */}
                {showArea && (
                    <Path
                        d={areaPath}
                        fill="url(#sineAreaGradient)"
                    />
                )}

                {/* Smooth Sine Wave Line */}
                <Path
                    d={linePath}
                    fill="none"
                    stroke="url(#sineLineGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Points & Labels */}
                {points.map((pt, index) => (
                    <React.Fragment key={index}>
                        {/* Glow Circle */}
                        <Circle
                            cx={pt.x}
                            cy={pt.y}
                            r="6"
                            fill={color}
                            opacity="0.25"
                        />
                        {/* Core Circle */}
                        <Circle
                            cx={pt.x}
                            cy={pt.y}
                            r="3.5"
                            fill="#ffffff"
                            stroke={color}
                            strokeWidth="2.5"
                        />
                        {/* X-axis label */}
                        <SvgText
                            x={pt.x}
                            y={height - 6}
                            fill={textColor}
                            fontSize="10"
                            textAnchor="middle"
                            fontWeight="600"
                        >
                            {data[index].label}
                        </SvgText>
                    </React.Fragment>
                ))}
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

export default SineWaveLineChart;
