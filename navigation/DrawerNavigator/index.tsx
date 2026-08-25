import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Sidebar } from '../../screens';
import { useTheme } from '../../store';
import styles from './style';

interface DrawerNavigatorProps {
    isSidebarOpen: boolean;
    slideAnim: Animated.Value;
    drawerWidth: number;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onCloseSidebar: () => void;
    onLogout: () => void;
}

export const DrawerNavigator: React.FC<DrawerNavigatorProps> = ({
    isSidebarOpen,
    slideAnim,
    drawerWidth,
    activeTab,
    setActiveTab,
    onCloseSidebar,
    onLogout,
}) => {
    const insets = useSafeAreaInsets();
    const { isDark } = useTheme();

    return (
        <Animated.View
            pointerEvents={isSidebarOpen ? 'auto' : 'none'}
            style={[
                styles.drawerContainer,
                isDark && styles.drawerContainerDark,
                {
                    width: drawerWidth,
                    transform: [{ translateX: slideAnim }]
                }
            ]}
        >
            <View style={[styles.drawerHeader, isDark && styles.borderDark, { paddingTop: Math.max(insets.top, 20) }]}>
                <Text style={[styles.drawerTitle, isDark && styles.textDark]}>Menu</Text>
                <TouchableOpacity onPress={onCloseSidebar} style={styles.closeButton}>
                    <Text style={[{ fontSize: 20 }, isDark && styles.textDark]}>✕</Text>
                </TouchableOpacity>
            </View>
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
        </Animated.View>
    );
};

export default DrawerNavigator;
