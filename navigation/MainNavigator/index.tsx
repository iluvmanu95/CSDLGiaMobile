import styles from './style';
import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, Pressable, PanResponder, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BottomNav } from '../../screens';
import { Header } from '../../components';
import { useTheme, useAuth } from '../../store';
import { DrawerNavigator } from '../DrawerNavigator';
import { TabNavigator } from '../TabNavigator';

const TAB_TITLES: { [key: string]: string } = {
    dashboard: 'Trang chủ',
    analytics: 'Danh mục đơn vị',
    reports: 'Thống kê đơn vị',
    profile: 'Trang cá nhân',
    notifications: 'Thông báo',
    settings: 'Cài đặt',
};

export const MainNavigator: React.FC = () => {
    const { width } = useWindowDimensions();
    const { isDark } = useTheme();
    const { logout } = useAuth();
    const isDesktop = width >= 1024;
    const DRAWER_WIDTH = width > 450 ? 300 : width * 0.8;

    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!isSidebarOpen) {
            slideAnim.setValue(-DRAWER_WIDTH);
        }
    }, [DRAWER_WIDTH]);

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                const isSwipingRight = gestureState.dx > 20;
                const isNearLeftEdge = gestureState.x0 < 40;

                if (!isSidebarOpen && isSwipingRight && isNearLeftEdge) {
                    return true;
                }

                const isSwipingLeft = gestureState.dx < -20;
                if (isSidebarOpen && isSwipingLeft) {
                    return true;
                }

                return false;
            },
            onPanResponderMove: (_, gestureState) => {
                const newVal = isSidebarOpen
                    ? Math.min(0, Math.max(-DRAWER_WIDTH, gestureState.dx))
                    : Math.min(0, Math.max(-DRAWER_WIDTH, -DRAWER_WIDTH + gestureState.dx));
                slideAnim.setValue(newVal);
                fadeAnim.setValue(1 + newVal / DRAWER_WIDTH);
            },
            onPanResponderRelease: (_, gestureState) => {
                if (!isSidebarOpen) {
                    if (gestureState.dx > DRAWER_WIDTH / 3) {
                        setIsSidebarOpen(true);
                    } else {
                        Animated.timing(slideAnim, {
                            toValue: -DRAWER_WIDTH,
                            duration: 200,
                            useNativeDriver: true,
                        }).start();
                    }
                } else {
                    if (gestureState.dx < -DRAWER_WIDTH / 3) {
                        setIsSidebarOpen(false);
                    } else {
                        Animated.timing(slideAnim, {
                            toValue: 0,
                            duration: 200,
                            useNativeDriver: true,
                        }).start();
                    }
                }
            },
        })
    ).current;

    useEffect(() => {
        if (isSidebarOpen) {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -DRAWER_WIDTH,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [isSidebarOpen, DRAWER_WIDTH]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setIsSidebarOpen(false);
    };

    const handleLogout = () => {
        slideAnim.setValue(-DRAWER_WIDTH);
        logout();
        setActiveTab('dashboard');
        setIsSidebarOpen(false);
    };

    return (
        <View style={[styles.container, isDark && styles.containerDark]} {...panResponder.panHandlers}>
            <StatusBar style={isDark ? "light" : "dark"} />

            {/* Drawer Navigator */}
            <DrawerNavigator
                isSidebarOpen={isSidebarOpen}
                slideAnim={slideAnim}
                drawerWidth={DRAWER_WIDTH}
                activeTab={activeTab}
                setActiveTab={handleTabChange}
                onCloseSidebar={() => setIsSidebarOpen(false)}
                onLogout={handleLogout}
            />

            {/* Main Content Layout */}
            <Animated.View
                style={[
                    styles.layout,
                    {
                        transform: [{
                            translateX: slideAnim.interpolate({
                                inputRange: [-DRAWER_WIDTH, 0],
                                outputRange: [0, DRAWER_WIDTH]
                            })
                        }]
                    }
                ]}
            >
                <View style={styles.main}>
                    {/* Transparent close overlay when sidebar is open */}
                    {isSidebarOpen && (
                        <Pressable
                            style={styles.pushOverlay}
                            onPress={() => setIsSidebarOpen(false)}
                        />
                    )}

                    {/* Top Bar Header */}
                    <Header
                        title={TAB_TITLES[activeTab] || activeTab}
                        isNotificationScreen={activeTab === 'notifications'}
                        onToggleSidebar={toggleSidebar}
                        onNotificationPress={() => handleTabChange('notifications')}
                        onBackPress={() => handleTabChange('dashboard')}
                    />

                    {/* Active Tab Screen Content */}
                    <TabNavigator
                        activeTab={activeTab}
                        setActiveTab={handleTabChange}
                        onLogout={handleLogout}
                    />

                    {/* Bottom Nav for Mobile */}
                    {!isDesktop && <BottomNav activeTab={activeTab} setActiveTab={handleTabChange} />}
                </View>
            </Animated.View>
        </View>
    );
};

export default MainNavigator;
