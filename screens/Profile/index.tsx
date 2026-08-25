import styles from './style';
import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Camera, Share2, MapPin, Building2, Landmark, UserCheck, Award, LogOut } from 'lucide-react-native';
import { useTheme, useAuth } from '../../store';
import defaultAvatar from '../../assets/avatars/default-user.png';
import defaultBanner from '../../assets/banners/banner-dp.png';

interface ProfileProps {
  onLogout?: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ onLogout }) => {
  const { isDark } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    if (onLogout) onLogout();
  };

  const tenDonVi = user?.tenDonViBaoCao || user?.TenDonViBaoCao || 'Chưa cập nhật';
  const tenDonViChuQuan = user?.tenDonViChuQuanBaoCao || user?.TenDonViChuQuanBaoCao || 'Chưa cập nhật';
  const diaDanh = user?.diaDanh || user?.DiaDanh || 'Chưa cập nhật';
  const chucDanhKy = user?.chucDanhKy || user?.ChucDanhKy || 'Chưa cập nhật';
  const hoTenNguoiKy = user?.hoTenNguoiKy || user?.HoTenNguoiKy || 'Chưa cập nhật';

  // const stats = [
  //   { label: 'Người theo dõi', value: '1.2k' },
  //   { label: 'Đang theo dõi', value: '840' },
  //   { label: 'Bộ sưu tập', value: '42' },
  // ];

  return (
    <ScrollView style={[styles.container, isDark && styles.containerDark]} contentContainerStyle={styles.scrollContent}>
      {/* Hero Profile Section */}
      <View style={styles.heroSection}>
        {/* Cover Image */}
        <View style={[styles.coverContainer, isDark && styles.coverContainerDark]}>
          <Image
            style={styles.coverImage}
            source={user?.coverImage ? (typeof user.coverImage === 'string' ? { uri: user.coverImage } : user.coverImage) : defaultBanner}
          />
        </View>

        {/* Profile Info Overlay */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarRow}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              <View style={[styles.avatarWrapper, isDark && styles.avatarWrapperDark]}>
                <Image
                  style={styles.avatar}
                  source={user?.avatar ? (typeof user.avatar === 'string' ? { uri: user.avatar } : user.avatar) : defaultAvatar}
                />
              </View>
              {/* <TouchableOpacity style={[styles.cameraButton, isDark && styles.cameraButtonDark]}>
                <Camera size={18} color={isDark ? "#ffffff" : "#222353"} />
              </TouchableOpacity> */}
            </View>

            {/* Actions */}
            <View style={styles.headerActions}>
              <TouchableOpacity style={[styles.editButton, isDark && styles.editButtonDark]}>
                <Text style={[styles.editButtonText, isDark && styles.editButtonTextDark]}>Chỉnh sửa hồ sơ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.shareButton, isDark && styles.shareButtonDark]}>
                <Share2 size={20} color={isDark ? "#ffffff" : "#222353"} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Identity */}
          <View style={styles.identityContainer}>
            <Text style={[styles.name, isDark && styles.textDark]}>{user?.name || user?.username || user?.Name || user?.Username || 'Khách'}</Text>
            <View style={styles.roleRow}>
              <Text style={[styles.roleText, isDark && styles.textMutedDark]}>{user?.role || user?.Role || 'Người dùng'}</Text>
              <View style={styles.dot} />
              <Text style={[styles.roleText, isDark && styles.textMutedDark]}>LifeSoft</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Profile Content */}
      <View style={styles.content}>
        {/* About Card */}
        <View style={[styles.card, isDark && styles.cardDark]}>
          <Text style={[styles.cardTitle, isDark && styles.textDark]}>Thông tin báo cáo thống kê</Text>

          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Building2 size={18} color={isDark ? "rgba(255, 255, 255, 0.7)" : "#222353"} />
              <View style={styles.metaContent}>
                <Text style={[styles.metaLabel, isDark && styles.textMutedDark]}>Tên đơn vị</Text>
                <Text style={[styles.metaText, isDark && styles.textDark]}>{tenDonVi}</Text>
              </View>
            </View>

            <View style={styles.metaItem}>
              <Landmark size={18} color={isDark ? "rgba(255, 255, 255, 0.7)" : "#222353"} />
              <View style={styles.metaContent}>
                <Text style={[styles.metaLabel, isDark && styles.textMutedDark]}>Tên đơn vị chủ quản</Text>
                <Text style={[styles.metaText, isDark && styles.textDark]}>{tenDonViChuQuan}</Text>
              </View>
            </View>

            <View style={styles.metaItem}>
              <MapPin size={18} color={isDark ? "rgba(255, 255, 255, 0.7)" : "#222353"} />
              <View style={styles.metaContent}>
                <Text style={[styles.metaLabel, isDark && styles.textMutedDark]}>Địa danh</Text>
                <Text style={[styles.metaText, isDark && styles.textDark]}>{diaDanh}</Text>
              </View>
            </View>

            <View style={styles.metaItem}>
              <Award size={18} color={isDark ? "rgba(255, 255, 255, 0.7)" : "#222353"} />
              <View style={styles.metaContent}>
                <Text style={[styles.metaLabel, isDark && styles.textMutedDark]}>Chức danh người ký</Text>
                <Text style={[styles.metaText, isDark && styles.textDark]}>{chucDanhKy}</Text>
              </View>
            </View>

            <View style={styles.metaItem}>
              <UserCheck size={18} color={isDark ? "rgba(255, 255, 255, 0.7)" : "#222353"} />
              <View style={styles.metaContent}>
                <Text style={[styles.metaLabel, isDark && styles.textMutedDark]}>Họ và tên người ký</Text>
                <Text style={[styles.metaText, isDark && styles.textDark]}>{hoTenNguoiKy}</Text>
              </View>
            </View>
          </View>

          {/* <View style={[styles.statsRow, isDark && styles.borderDark]}>
            {stats.map((stat, idx) => (
              <React.Fragment key={stat.label}>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, isDark && styles.textDark]}>{stat.value}</Text>
                  <Text style={[styles.statLabel, isDark && styles.textMutedDark]}>{stat.label}</Text>
                </View>
                {idx < stats.length - 1 && <View style={[styles.statDivider, isDark && styles.dividerDark]} />}
              </React.Fragment>
            ))}
          </View> */}
        </View>

        {/* Tabs */}
        {/* <View style={[styles.tabs, isDark && styles.borderDark]}>
          {[
            { id: 'collections', label: 'Bộ sưu tập' },
            { id: 'activity', label: 'Hoạt động' },
            { id: 'saved', label: 'Đã lưu' }
          ].map((tab, i) => (
            <TouchableOpacity key={tab.id} style={[styles.tab, i === 0 && (isDark ? styles.activeTabDark : styles.activeTab)]}>
              <Text style={[styles.tabText, i === 0 && (isDark ? styles.activeTabTextDark : styles.activeTabText)]}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </View> */}

        {/* Collections Grid */}
        {/* <View style={styles.collectionsGrid}>
          <TouchableOpacity style={[styles.collectionCard, isDark && styles.cardDark]}>
            <View style={styles.collectionImageWrapper}>
              <Image
                style={styles.collectionImage}
                source={{ uri: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=800&auto=format&fit=crop" }}
              />
              <View style={styles.editorBadge}>
                <Text style={styles.editorBadgeText}>Lựa chọn của biên tập viên</Text>
              </View>
            </View>
            <View style={styles.collectionInfo}>
              <Text style={[styles.collectionTitle, isDark && styles.textDark]}>Bauhaus Resonance</Text>
              <Text style={[styles.collectionDesc, isDark && styles.textMutedDark]} numberOfLines={2}>
                A curation of objects and spaces that embody the timeless principles of the Bauhaus movement.
              </Text>
              <View style={styles.collectionFooter}>
                <View style={styles.avatarStack}>
                  {[1, 2, 3].map(i => (
                    <Image
                      key={i}
                      source={{ uri: `https://i.pravatar.cc/100?img=${i + 20}` }}
                      style={[styles.stackAvatar, { marginLeft: i === 1 ? 0 : -10 }, isDark && styles.stackAvatarDark]}
                    />
                  ))}
                  <View style={[styles.moreAvatars, isDark && styles.moreAvatarsDark]}>
                    <Text style={[styles.moreAvatarsText, isDark && styles.textDark]}>+12</Text>
                  </View>
                </View>
                <Text style={[styles.collectionMeta, isDark && styles.textMutedDark]}>24 Mục • 2 ngày trước</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View> */}

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.logoutButton, isDark && styles.logoutButtonDark]}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#ba1a1a" />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default Profile;
