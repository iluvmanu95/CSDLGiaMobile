/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Animated, Pressable, PanResponder, useWindowDimensions, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dashboard } from './components/Dashboard';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { Search, Bell, Menu, X } from 'lucide-react-native';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { isDark } = useTheme();
  const isDesktop = width >= 1024;
  const DRAWER_WIDTH = width > 450 ? 300 : width * 0.8;
  
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      case 'notifications':
        return (
          <View style={styles.centerContent}>
            <Text style={[styles.placeholderText, isDark && styles.textDark]}>Notifications coming soon</Text>
          </View>
        );
      default:
        return <Dashboard />;
    }
  };

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
        <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
      </Animated.View>

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
              <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
                <Menu size={28} color={isDark ? "#ffffff" : "#222353"} strokeWidth={2.5} />
              </TouchableOpacity>
              <Text style={[styles.headerTitle, isDark && styles.textDark]}>
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </Text>
            </View>
            
            <View style={styles.headerRight}>
              {isDesktop && (
                <View style={styles.desktopNav}>
                  <TouchableOpacity onPress={() => handleTabChange('dashboard')}>
                    <Text style={[styles.navText, isDark && styles.textMutedDark, activeTab === 'dashboard' && (isDark ? styles.textDark : styles.activeNavText)]}>Dashboard</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={[styles.navText, isDark && styles.textMutedDark]}>Explore</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={[styles.navText, isDark && styles.textMutedDark]}>Community</Text>
                  </TouchableOpacity>
                </View>
              )}
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

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  layout: {
    flex: 1,
    flexDirection: 'row',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuButton: {
    padding: 8,
    marginLeft: -8,
  },
  pushOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: 'transparent',
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    zIndex: 1001,
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  drawerHeader: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#222353',
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: 'Manrope',
    fontWeight: '800',
    fontSize: 18,
    color: '#222353',
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  desktopNav: {
    flexDirection: 'row',
    gap: 24,
    marginRight: 24,
  },
  navText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#464652',
  },
  activeNavText: {
    color: '#222353',
  },
  activeNavTextDark: {
    color: '#ffffff',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    backgroundColor: '#ba1a1a',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#464652',
  },
  containerDark: {
    backgroundColor: '#0f172a',
  },
  headerDark: {
    backgroundColor: '#1e293b',
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  drawerContainerDark: {
    backgroundColor: '#1e293b',
  },
  textDark: {
    color: '#ffffff',
  },
  textMutedDark: {
    color: '#94a3b8',
  },
  borderDark: {
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
});

