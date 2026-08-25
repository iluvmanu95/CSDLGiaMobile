import styles from './style';
import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LayoutDashboard, User, Settings, LogOut, LineChart, BarChart2 } from 'lucide-react-native';
import { useTheme, useAuth } from '../../store';
import defaultAvatar from '../../assets/avatars/default-user.png';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const { isDark } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    if (onLogout) onLogout();
  };

  const navItems = [
    { id: 'dashboard', title: 'Trang chủ', icon: LayoutDashboard },
    { id: 'analytics', title: 'Báo cáo thống kê', icon: LineChart },
    { id: 'reports', title: 'Biểu đồ thống kê', icon: BarChart2 },
    { id: 'profile', title: 'Trang cá nhân', icon: User },
    { id: 'settings', title: 'Cài đặt', icon: Settings },
  ];

  const getIconColor = (itemId: string) => {
    if (activeTab === itemId) {
      return isDark ? '#ffffff' : '#222353';
    }
    return isDark ? '#94a3b8' : '#464652';
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatarWrapper, isDark && styles.avatarWrapperDark]}>
              <Image
                alt="Avatar"
                style={styles.avatar}
                source={user?.avatar ? (typeof user.avatar === 'string' ? { uri: user.avatar } : user.avatar) : defaultAvatar}
              />
            </View>
            <View style={[styles.statusDot, isDark && styles.statusDotDark]} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, isDark && styles.textDark]}>{user?.name || user?.username || user?.Name || user?.Username || 'Khách'}</Text>
            <Text style={[styles.profileEmail, isDark && styles.textMutedDark]}>{user?.email || user?.Email || 'Chưa cập nhật email'}</Text>
            <View style={[styles.badge, isDark && styles.badgeDark]}>
              <Text style={[styles.badgeText, isDark && styles.textDark]}>{user?.role || user?.Role || 'Người dùng'}</Text>
            </View>
          </View>
        </View>

        {/* Nav Links */}
        <View style={styles.nav}>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setActiveTab(item.id)}
              style={[
                styles.navItem,
                activeTab === item.id && (isDark ? styles.activeNavItemDark : styles.activeNavItem)
              ]}
            >
              <item.icon
                size={20}
                color={getIconColor(item.id)}
              />
              <Text style={[
                styles.navLabel,
                isDark && styles.textMutedDark,
                activeTab === item.id && (isDark ? styles.activeNavLabelDark : styles.activeNavLabel)
              ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}

          <View style={[styles.divider, isDark && styles.dividerDark]} />

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#ba1a1a" />
            <Text style={styles.logoutLabel}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={[styles.footer, isDark && styles.footerDark]}>
        <Text style={[styles.brand, isDark && styles.textDark]}>Curator</Text>
        <Text style={[styles.version, isDark && styles.textMutedDark]}>v1.0.4</Text>
      </View>
    </View>
  );
};
export default Sidebar;
