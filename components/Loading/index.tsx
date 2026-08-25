import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../store';

interface LoadingProps {
    message?: string;
    size?: 'small' | 'large';
}

export const Loading: React.FC<LoadingProps> = ({ message = 'Đang tải dữ liệu...', size = 'large' }) => {
    const { isDark } = useTheme();

    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={isDark ? "#c1c1fc" : "#222353"} />
            {message ? (
                <Text style={[styles.text, isDark && styles.textDark]}>{message}</Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    text: {
        fontSize: 14,
        color: '#64748b',
    },
    textDark: {
        color: '#94a3b8',
    },
});

export default Loading;
