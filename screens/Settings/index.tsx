import styles from './style';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { EyeOff, ShieldAlert, Globe, ChevronRight, ChevronDown, Trash2, Moon } from 'lucide-react-native';
import { useTheme, useAuth, ThemeMode } from '../../store';
import { getTimezone } from '../../helper';

export const Settings: React.FC = () => {
  const { theme, setTheme, isDark } = useTheme();
  const { user } = useAuth();

  const email = user?.email || user?.Email || (user?.username ? `${user.username}@lifesoft.vn` : 'Chưa cập nhật');

  // Format ngày tạo/tham gia
  const getCreatedDate = () => {
    const rawDate = user?.created_at || user?.createdAt || user?.ngayTao || user?.NgayTao;
    if (rawDate) {
      try {
        const d = new Date(rawDate);
        if (!isNaN(d.getTime())) {
          return `Tháng ${d.getMonth() + 1}, ${d.getFullYear()}`;
        }
      } catch (e) {
        // fallback
      }
    }
    return 'Tháng 10, 2023';
  };


  const themeOptions: { label: string; value: ThemeMode }[] = [
    { label: 'SÁNG', value: 'light' },
    { label: 'TỐI', value: 'dark' },
    { label: 'HỆ THỐNG', value: 'system' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={[styles.title, isDark && styles.textDark]}>Cài đặt tài khoản</Text>
        <Text style={[styles.subtitle, isDark && styles.textMutedDark]}>Quản lý thông tin tài khoản và giao diện hiển thị.</Text>
      </View>

      <View style={styles.grid}>
        {/* Account Section */}
        <View style={[styles.card, isDark && styles.cardDark]}>
          <View style={styles.cardHeader}>
            <View>
              <View style={[styles.badge, isDark && styles.badgeDark]}>
                <Text style={[styles.badgeText, isDark && styles.textDark]}>ĐỊNH DANH</Text>
              </View>
              <Text style={[styles.cardTitle, isDark && styles.textDark]}>Thông tin tài khoản</Text>
            </View>
            {/* <TouchableOpacity style={[styles.editButton, isDark && styles.editButtonDark]}>
              <Text style={[styles.editButtonText, isDark && styles.textDark]}>Chỉnh sửa</Text>
            </TouchableOpacity> */}
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, isDark && styles.textMutedDark]}>ĐỊA CHỈ EMAIL</Text>
              <Text style={[styles.detailValue, isDark && styles.textDark]}>{email}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, isDark && styles.textMutedDark]}>NGÀY THAM GIA</Text>
              <Text style={[styles.detailValue, isDark && styles.textDark]}>{getCreatedDate()}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, isDark && styles.textMutedDark]}>MÚI GIỜ</Text>
              <Text style={[styles.detailValue, isDark && styles.textDark]}>{getTimezone()}</Text>
            </View>
          </View>
        </View>

        {/* Theme Toggle Card */}
        <View style={[styles.card, styles.themeCard]}>
          <View>
            <Moon size={32} color="#ffffff" style={styles.cardIcon} />
            <Text style={styles.themeCardTitle}>Giao diện</Text>
            <Text style={styles.themeCardSubtitle}>Tùy chỉnh chế độ giao diện sáng, tối hoặc theo cài đặt hệ thống.</Text>
          </View>
          <View style={styles.themeToggleContainer}>
            {themeOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => setTheme(option.value)}
                style={[styles.themeOption, theme === option.value && styles.activeThemeOption]}
              >
                <Text style={[styles.themeOptionText, theme === option.value && styles.activeThemeOptionText]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Privacy & Security */}
        {/* <View style={styles.section}>
          <Text style={[styles.sectionLabel, isDark && styles.textMutedDark]}>BẢO MẬT & QUYỀN RIÊNG TƯ</Text>
          <View style={[styles.listContainer, isDark && styles.cardDark, isDark && styles.borderDark]}>
            
            <TouchableOpacity style={[styles.listItem, isDark && styles.borderDark]}>
              <View style={styles.listItemLeft}>
                <View style={[styles.iconContainer, isDark && styles.iconContainerDark]}>
                  <EyeOff size={20} color={isDark ? "#ffffff" : "#222353"} />
                </View>
                <View>
                  <Text style={[styles.listItemTitle, isDark && styles.textDark]}>Quyền riêng tư hồ sơ</Text>
                  <Text style={[styles.listItemSubtitle, isDark && styles.textMutedDark]}>Quản lý ai có thể xem bộ sưu tập của bạn</Text>
                </View>
              </View>
              <ChevronRight size={20} color={isDark ? "#94a3b8" : "#464652"} />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.listItem, isDark && styles.borderDark]}>
              <View style={styles.listItemLeft}>
                <View style={[styles.iconContainer, isDark && styles.iconContainerDark]}>
                  <ShieldAlert size={20} color={isDark ? "#ffffff" : "#222353"} />
                </View>
                <View>
                  <Text style={[styles.listItemTitle, isDark && styles.textDark]}>Xác thực 2 yếu tố</Text>
                  <Text style={[styles.listItemSubtitle, isDark && styles.textMutedDark]}>Bảo vệ tài khoản bằng bảo mật 2 lớp (2FA)</Text>
                </View>
              </View>
              <View style={styles.listItemRight}>
                <View style={[styles.statusBadge, isDark && styles.iconContainerDark]}>
                  <Text style={[styles.statusBadgeText, isDark && styles.textMutedDark]}>CHƯA BẬT</Text>
                </View>
                <ChevronRight size={20} color={isDark ? "#94a3b8" : "#464652"} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.listItem, { borderBottomWidth: 0 }]}>
              <View style={styles.listItemLeft}>
                <View style={[styles.iconContainer, isDark && styles.iconContainerDark]}>
                  <Globe size={20} color={isDark ? "#ffffff" : "#222353"} />
                </View>
                <View>
                  <Text style={[styles.listItemTitle, isDark && styles.textDark]}>Ngôn ngữ ứng dụng</Text>
                  <Text style={[styles.listItemSubtitle, isDark && styles.textMutedDark]}>Hiện tại: Tiếng Việt</Text>
                </View>
              </View>
              <ChevronDown size={20} color={isDark ? "#94a3b8" : "#464652"} />
            </TouchableOpacity>
          </View>
        </View> */}

        {/* Dangerous Zone Section */}
        {/* <View style={[styles.dangerZone, isDark && styles.dangerZoneDark]}>
          <View style={styles.dangerZoneText}>
            <Text style={styles.dangerTitle}>Khu vực nguy hiểm</Text>
            <Text style={[styles.dangerSubtitle, isDark && styles.textMutedDark]}>Xóa vĩnh viễn tài khoản và toàn bộ dữ liệu liên quan.</Text>
          </View>
          <TouchableOpacity style={styles.deleteButton}>
            <Trash2 size={16} color="#ba1a1a" />
            <Text style={styles.deleteButtonText}>Xóa tài khoản</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};
export default Settings;
