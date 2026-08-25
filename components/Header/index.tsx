import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Search, Bell, Menu, ChevronLeft } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../store';
import styles from './style';

interface HeaderProps {
    title: string;
    isNotificationScreen?: boolean;
    onToggleSidebar: () => void;
    onNotificationPress: () => void;
    onBackPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    title,
    isNotificationScreen = false,
    onToggleSidebar,
    onNotificationPress,
    onBackPress
}) => {
    const insets = useSafeAreaInsets();
    const { isDark } = useTheme();

    return (
        <View style={[styles.header, isDark && styles.headerDark, { paddingTop: insets.top, height: 64 + insets.top }]}>
            <View style={styles.headerLeft}>
                {isNotificationScreen ? (
                    <TouchableOpacity onPress={onBackPress || onToggleSidebar} style={styles.menuButton}>
                        <ChevronLeft size={28} color={isDark ? "#ffffff" : "#222353"} strokeWidth={2.5} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={onToggleSidebar} style={styles.menuButton}>
                        <Menu size={28} color={isDark ? "#ffffff" : "#222353"} strokeWidth={2.5} />
                    </TouchableOpacity>
                )}
                <Text style={[styles.headerTitle, isDark && styles.textDark]}>
                    {title}
                </Text>
            </View>

            <View style={styles.headerRight}>
                <TouchableOpacity style={styles.iconButton}>
                    <Search size={20} color={isDark ? "#cbd5e1" : "#464652"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onNotificationPress} style={styles.iconButton}>
                    <View>
                        <Bell size={20} color={isDark ? "#cbd5e1" : "#464652"} />
                        <View style={styles.notificationBadge} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Header;
