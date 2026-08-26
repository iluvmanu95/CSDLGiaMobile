import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Sparkles } from 'lucide-react-native';

interface InsightsBannerProps {
    title?: string;
    description: string;
    highlights?: string[];
    isDark?: boolean;
}

export const InsightsBanner: React.FC<InsightsBannerProps> = ({
    title = 'Nhận định tổng quan',
    description,
    highlights,
    isDark = false,
}) => {
    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            <View style={styles.headerRow}>
                <View style={styles.iconBadge}>
                    <Sparkles size={16} color="#d97706" />
                </View>
                <Text style={[styles.title, isDark && styles.titleDark]}>{title}</Text>
            </View>

            <Text style={[styles.description, isDark && styles.descriptionDark]}>
                {description}
            </Text>

            {highlights && highlights.length > 0 && (
                <View style={styles.highlightsContainer}>
                    {highlights.map((item, idx) => (
                        <View key={idx} style={styles.highlightRow}>
                            <View style={styles.bulletDot} />
                            <Text style={[styles.highlightText, isDark && styles.highlightTextDark]}>
                                {item}
                            </Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fffbeb',
        borderRadius: 14,
        padding: 14,
        borderWidth: 1,
        borderColor: '#fef3c7',
        marginBottom: 16,
    },
    containerDark: {
        backgroundColor: 'rgba(217, 119, 6, 0.12)',
        borderColor: 'rgba(217, 119, 6, 0.25)',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 6,
    },
    iconBadge: {
        width: 26,
        height: 26,
        borderRadius: 7,
        backgroundColor: '#fef3c7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 13,
        fontWeight: '700',
        color: '#92400e',
    },
    titleDark: {
        color: '#fbbf24',
    },
    description: {
        fontSize: 12,
        color: '#78350f',
        lineHeight: 18,
    },
    descriptionDark: {
        color: '#fde68a',
    },
    highlightsContainer: {
        marginTop: 8,
        gap: 4,
    },
    highlightRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    bulletDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#d97706',
    },
    highlightText: {
        fontSize: 11.5,
        color: '#92400e',
        fontWeight: '500',
    },
    highlightTextDark: {
        color: '#fef3c7',
    },
});

export default InsightsBanner;
