import styles from './style';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Home, BarChart2, LineChart, User } from 'lucide-react-native';
import { useTheme } from '../../store';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const { isDark } = useTheme();

  const getIconColor = (tabId: string) => {
    const isActive = activeTab === tabId || (tabId === 'dashboard' && activeTab === 'notifications');
    if (isActive) {
      return '#ffffff';
    }
    return isDark ? '#94a3b8' : '#64748b';
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <TouchableOpacity
        onPress={() => setActiveTab('dashboard')}
        style={[styles.navItem, (activeTab === 'dashboard' || activeTab === 'notifications') && (isDark ? styles.activeNavItemDark : styles.activeNavItem)]}
      >
        <Home size={24} color={getIconColor('dashboard')} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setActiveTab('reports')}
        style={[styles.navItem, activeTab === 'reports' && (isDark ? styles.activeNavItemDark : styles.activeNavItem)]}
      >
        <BarChart2 size={24} color={getIconColor('reports')} />
      </TouchableOpacity>

      {/* <TouchableOpacity
        onPress={() => setActiveTab('analytics')}
        style={[styles.navItem, activeTab === 'analytics' && (isDark ? styles.activeNavItemDark : styles.activeNavItem)]}
      >
        <LineChart size={24} color={getIconColor('analytics')} />
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={() => setActiveTab('profile')}
        style={[styles.navItem, activeTab === 'profile' && (isDark ? styles.activeNavItemDark : styles.activeNavItem)]}
      >
        <User size={24} color={getIconColor('profile')} />
      </TouchableOpacity>
    </View>
  );
};
export default BottomNav;
