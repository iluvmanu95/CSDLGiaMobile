import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Login } from '../../screens';
import { useTheme } from '../../store';
import styles from './style';

export const AuthNavigator: React.FC = () => {
    const { isDark } = useTheme();

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            <StatusBar style={isDark ? "light" : "dark"} />
            <Login />
        </View>
    );
};

export default AuthNavigator;
