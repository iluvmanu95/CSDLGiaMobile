import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Animated, Pressable, PanResponder, useWindowDimensions, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dashboard } from '../components/Dashboard';
import { Profile } from '../components/Profile';
import { Settings } from '../components/Settings';
import { Sidebar } from '../components/Sidebar';
import { BottomNav } from '../components/BottomNav';
import { Login } from '../components/Login';
import { Search, Bell, Menu, X, ChevronLeft } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import { Reports } from '../components/Reports';
import { Analytics } from '../components/Analytics';
import { Notifications } from '../components/Notifications';
import { styles } from '../contains';

const TAB_TITLES: { [key: string]: string } = {
    dashboard: 'Trang chủ',
    analytics: 'Báo cáo thống kê',
    reports: 'Biểu đồ thống kê',
    profile: 'Trang cá nhân',
    notifications: 'Thông báo',
    settings: 'Cài đặt',
};

export default function AppContent() {
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const { isDark } = useTheme();
    const isDesktop = width >= 1024;
    const DRAWER_WIDTH = width > 450 ? 300 : width * 0.8;

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Update slideAnim value if DRAWER_WIDTH changes due to resize
    useEffect(() => {
        if (!isSidebarOpen) {
            slideAnim.setValue(-DRAWER_WIDTH);
        }
    }, [DRAWER_WIDTH]);

    // Swipe gesture handling
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                // Only set responder if swiping from the left edge when closed
                // or swiping anywhere when open (to allow closing)
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
                if (isSidebarOpen) {
                    const newVal = Math.min(0, Math.max(-DRAWER_WIDTH, gestureState.dx));
                    slideAnim.setValue(newVal);
                    fadeAnim.setValue(1 + newVal / DRAWER_WIDTH);
                } else {
                    const newVal = Math.min(0, Math.max(-DRAWER_WIDTH, -DRAWER_WIDTH + gestureState.dx));
                    slideAnim.setValue(newVal);
                    fadeAnim.setValue(1 + newVal / DRAWER_WIDTH);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (!isSidebarOpen) {
                    if (gestureState.dx > DRAWER_WIDTH / 3) {
                        setIsSidebarOpen(true);
                    } else {
                        // Snap back
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
                        // Snap back
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
            // Open drawer
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
            // Close drawer
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

    // Hard reset UI state when auth changes
    useEffect(() => {
        if (!isAuthenticated) {
            setIsSidebarOpen(false);
            slideAnim.setValue(-DRAWER_WIDTH);
        }
    }, [isAuthenticated, DRAWER_WIDTH]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setIsSidebarOpen(false);
    };

    const fetchUser = async (username: string) => {
        try {
            const response = await fetch(`https://subintegumental-earthly-lon.ngrok-free.dev/api/getUsers?username=${username}`);
            const json = await response.json();
            if (json.success) {
                setUser(json.data);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const handleLogin = (username: string) => {
        setIsSidebarOpen(false);
        slideAnim.setValue(-DRAWER_WIDTH);
        setActiveTab('dashboard');
        setIsAuthenticated(true);
        fetchUser(username);
    };

    const handleLogout = () => {
        slideAnim.setValue(-DRAWER_WIDTH); // Reset animation instantly
        setIsAuthenticated(false);
        setActiveTab('dashboard');
        setIsSidebarOpen(false);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard user={user} />;
            case 'reports':
                return <Reports />;
            case 'profile':
                return <Profile onLogout={handleLogout} />;
            case 'settings':
                return <Settings />;
            case 'analytics':
                return <Analytics />;
            case 'notifications':
                return <Notifications onBack={() => setActiveTab('dashboard')} />;
            default:
                return <Dashboard />;
        }
    };

    if (!isAuthenticated) {
        return (
            <View style={[styles.container, isDark && styles.containerDark]}>
                <StatusBar style={isDark ? "light" : "dark"} />
                <Login onLogin={handleLogin} />
            </View>
        );
    }

    return (
        <View style={[styles.container, isDark && styles.containerDark]} {...panResponder.panHandlers}>
            <StatusBar style={isDark ? "light" : "dark"} />
            {/* Drawer Content */}
            <Animated.View
                pointerEvents={isSidebarOpen ? 'auto' : 'none'}
                style={[
                    styles.drawerContainer,
                    isDark && styles.drawerContainerDark,
                    {
                        width: DRAWER_WIDTH,
                        transform: [{ translateX: slideAnim }]
                    }
                ]}
            >
                <View style={[styles.drawerHeader, isDark && styles.borderDark, { paddingTop: Math.max(insets.top, 20) }]}>
                    <Text style={[styles.drawerTitle, isDark && styles.textDark]}>Menu</Text>
                    <TouchableOpacity onPress={() => setIsSidebarOpen(false)} style={styles.closeButton}>
                        <X size={24} color={isDark ? "#ffffff" : "#222353"} />
                    </TouchableOpacity>
                </View>
                <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} onLogout={handleLogout} />
            </Animated.View>

            {/* Dashboard Content */}
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

                    {/* Top Bar */}
                    <View style={[styles.header, isDark && styles.headerDark, { paddingTop: insets.top, height: 64 + insets.top }]}>
                        <View style={styles.headerLeft}>
                            {activeTab === 'notifications' ? (
                                <TouchableOpacity onPress={() => setActiveTab('dashboard')} style={styles.menuButton}>
                                    <ChevronLeft size={28} color={isDark ? "#ffffff" : "#222353"} strokeWidth={2.5} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
                                    <Menu size={28} color={isDark ? "#ffffff" : "#222353"} strokeWidth={2.5} />
                                </TouchableOpacity>
                            )}
                            <Text style={[styles.headerTitle, isDark && styles.textDark]}>
                                {TAB_TITLES[activeTab] || activeTab}
                            </Text>
                        </View>

                        <View style={styles.headerRight}>
                            <TouchableOpacity style={styles.iconButton}>
                                <Search size={20} color={isDark ? "#cbd5e1" : "#464652"} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleTabChange('notifications')} style={styles.iconButton}>
                                <View>
                                    <Bell size={20} color={isDark ? "#cbd5e1" : "#464652"} />
                                    <View style={styles.notificationBadge} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Main Content */}
                    <ScrollView
                        style={styles.content}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {renderContent()}
                    </ScrollView>

                    {/* Bottom Nav for Mobile */}
                    {!isDesktop && <BottomNav activeTab={activeTab} setActiveTab={handleTabChange} />}
                </View>
            </Animated.View>
        </View>
    );
}