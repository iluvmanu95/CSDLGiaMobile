import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Home, Search, Bell, User } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const { isDark } = useTheme();

  const getIconColor = (tabId: string) => {
    if (activeTab === tabId) {
      return '#ffffff';
    }
    return isDark ? '#94a3b8' : '#64748b';
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <TouchableOpacity 
        onPress={() => setActiveTab('dashboard')}
        style={[styles.navItem, activeTab === 'dashboard' && (isDark ? styles.activeNavItemDark : styles.activeNavItem)]}
      >
        <Home size={24} color={getIconColor('dashboard')} />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem}>
        <Search size={24} color={isDark ? '#94a3b8' : '#64748b'} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={() => setActiveTab('notifications')}
        style={[styles.navItem, activeTab === 'notifications' && (isDark ? styles.activeNavItemDark : styles.activeNavItem)]}
      >
        <Bell size={24} color={getIconColor('notifications')} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={() => setActiveTab('profile')}
        style={[styles.navItem, activeTab === 'profile' && (isDark ? styles.activeNavItemDark : styles.activeNavItem)]}
      >
        <User size={24} color={getIconColor('profile')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  navItem: {
    padding: 12,
    borderRadius: 999,
  },
  activeNavItem: {
    backgroundColor: '#222353',
  },
  containerDark: {
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeNavItemDark: {
    backgroundColor: '#334155',
  },
});
