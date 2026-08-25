import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BadgeProps {
    label: string;
    variant?: 'success' | 'warning' | 'info' | 'danger' | 'default';
    isDark?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'default', isDark = false }) => {
    const getColors = () => {
        switch (variant) {
            case 'success':
                return {
                    bg: isDark ? 'rgba(22, 101, 52, 0.3)' : '#dcfce7',
                    text: isDark ? '#86efac' : '#166534'
                };
            case 'warning':
                return {
                    bg: isDark ? 'rgba(146, 64, 14, 0.3)' : '#fef3c7',
                    text: isDark ? '#fde047' : '#92400e'
                };
            case 'danger':
                return {
                    bg: isDark ? 'rgba(186, 26, 26, 0.3)' : '#fee2e2',
                    text: isDark ? '#fca5a5' : '#ba1a1a'
                };
            case 'info':
                return {
                    bg: isDark ? 'rgba(59, 130, 246, 0.3)' : '#dbeafe',
                    text: isDark ? '#93c5fd' : '#1e40af'
                };
            default:
                return {
                    bg: isDark ? 'rgba(51, 65, 85, 0.5)' : '#f1f5f9',
                    text: isDark ? '#cbd5e1' : '#475569'
                };
        }
    };

    const colors = getColors();

    return (
        <View style={[styles.badge, { backgroundColor: colors.bg }]}>
            <Text style={[styles.badgeText, { color: colors.text }]}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 999,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
    },
});

export default Badge;
