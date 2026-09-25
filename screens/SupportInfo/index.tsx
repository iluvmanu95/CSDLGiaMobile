import styles from './style';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { useTheme, useAuth } from '../../store';
import { Info, Phone, PhoneCall, ShieldAlert, Headphones, Mail, Building, Clock, CheckCircle2 } from 'lucide-react-native';
import { formatDateFullVN, formatTime, getGreeting } from '../../helper';

export const SupportInfo: React.FC<{ user?: any }> = ({ user: propUser }) => {
  const { isDark } = useTheme();
  const { user: authUser } = useAuth();
  const user = propUser || authUser;
  const [now, setNow] = useState(new Date());

  const supportStaff = [
    { name: 'Hoàng Ngọc Long', phone: '0985.365.683', role: 'Chuyên viên hỗ trợ kỹ thuật' },
    { name: 'Nguyễn Trần Huynh', phone: '0964 304 891', role: 'Chuyên viên triển khai hệ thống' },
    { name: 'Trịnh Minh Khải', phone: '0389 095 454', role: 'Chuyên viên cơ sở dữ liệu' },
    { name: 'Nguyễn Xuân Trường', phone: '0917.737.456', role: 'Chuyên viên phụ trách phần mềm' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCall = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/[^0-9]/g, '');
    Linking.openURL(`tel:${cleaned}`).catch(() => {
      Alert.alert('Không thể thực hiện cuộc gọi', `Vui lòng liên hệ số: ${phoneNumber}`);
    });
  };

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  return (
    <ScrollView
      style={[styles.container, isDark && styles.containerDark]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Date Time Header */}
      <View style={[styles.heroSection, { justifyContent: 'flex-end', marginBottom: 12 }]}>
        <View style={[styles.dateTimeContainer, isDark && styles.cardDark]}>
          <Text style={[styles.dateText, isDark && styles.textMutedDark]}>
            {formatDateFullVN(now)} | <Text style={[styles.timeTextInline, isDark && styles.textDark]}>{formatTime(now)}</Text>
          </Text>
        </View>
      </View>

      {/* Greeting Hero */}
      <View style={styles.heroSection}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.heroTitle, isDark && styles.textDark]}>
            {getGreeting(now)}, {user?.name || user?.username || user?.Name || user?.Username || 'Thành viên'}.
          </Text>
          <Text style={[styles.heroSubtitle, isDark && styles.textMutedDark]}>
            Trung tâm hỗ trợ kỹ thuật & giải đáp thắc mắc hệ thống
          </Text>
        </View>
      </View>

      {/* Main Support Info Card */}
      <View style={[styles.card, isDark && styles.cardDark]}>
        <View style={styles.cardHeaderRow}>
          <Headphones size={22} color={isDark ? '#93c5fd' : '#2563eb'} />
          <Text style={[styles.cardTitle, isDark && styles.textDark]}>Thông tin hỗ trợ khách hàng</Text>
        </View>

        <View style={styles.supportIntroduction}>
          <Text style={[styles.supportText, isDark && styles.textMutedDark]}>
            Công ty LifeSoft chân thành cảm ơn quý khách hàng đã tin tưởng sử dụng phần mềm của công ty. Thay mặt toàn bộ cán bộ nhân viên trong công ty gửi đến khách hàng lời chúc sức khỏe - thành công.
          </Text>
          <Text style={[styles.supportText, isDark && styles.textMutedDark, { marginTop: 10 }]}>
            Nhằm chăm sóc, hỗ trợ khách hàng nhanh chóng và tiện dụng nhất công ty xin cung cấp thông tin các cán bộ hỗ trợ khách hàng trong quá trình sử dụng. Mọi vấn đề khúc mắc khách hàng có thể liên hệ trực tiếp cho cán bộ để được hỗ trợ kịp thời!
          </Text>
        </View>

        {/* Security Alert Notice */}
        <View style={[styles.securityNotice, isDark && styles.securityNoticeDark]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <ShieldAlert size={16} color="#e11d48" />
            <Text style={styles.securityTitle}>Lưu ý bảo mật tài khoản</Text>
          </View>
          <Text style={styles.securityText}>
            Do các thay đổi trong chính sách bảo mật hệ thống. Các mật khẩu yếu nên thay đổi lại để tránh việc bị can thiệp trái phép. Mật khẩu mới nên đảm bảo: tối thiểu 06 ký tự, có ít nhất 01 chữ số và 01 ký tự đặc biệt hoặc chữ hoa.
          </Text>
        </View>

        {/* Tech Lead Banner */}
        <View style={[styles.techLeadCard, isDark && styles.techLeadCardDark]}>
          <View style={styles.techLeadInfo}>
            <Text style={styles.techLeadRole}>Phụ trách khối kỹ thuật</Text>
            <Text style={[styles.techLeadName, isDark && styles.textDark]}>Phó giám đốc: Trần Ngọc Hiếu</Text>
            <Text style={[styles.techLeadPhone, isDark && styles.textPrimaryDark]}>Số điện thoại: 096 8206844</Text>
          </View>
          <TouchableOpacity
            style={styles.callLeadBtn}
            onPress={() => handleCall('096 8206844')}
            activeOpacity={0.8}
          >
            <PhoneCall size={16} color="#ffffff" />
            <Text style={styles.callLeadBtnText}>Gọi ngay</Text>
          </TouchableOpacity>
        </View>

        {/* Support Staff List */}
        <Text style={[styles.sectionTitle, isDark && styles.textMutedDark]}>
          Phòng Triển Khai - Hỗ Trợ Trực Tuyến
        </Text>

        <View style={[styles.staffListContainer, isDark && styles.staffListContainerDark]}>
          {supportStaff.map((staff, index) => (
            <View
              key={index}
              style={[
                styles.staffRow,
                isDark && styles.staffRowDark,
                index % 2 !== 0 && (isDark ? styles.staffRowAltDark : styles.staffRowAlt)
              ]}
            >
              <View style={styles.staffLeft}>
                <View style={[styles.staffAvatarCircle, isDark && styles.staffAvatarCircleDark]}>
                  <Text style={[styles.staffAvatarText, isDark && styles.staffAvatarTextDark]}>
                    {getInitials(staff.name)}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.staffName, isDark && styles.textDark]}>{staff.name}</Text>
                  <Text style={[styles.staffRole, isDark && styles.textMutedDark]}>{staff.role}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.callStaffBtn, isDark && styles.callStaffBtnDark]}
                onPress={() => handleCall(staff.phone)}
                activeOpacity={0.7}
              >
                <Phone size={14} color={isDark ? '#93c5fd' : '#2563eb'} />
                <Text style={[styles.staffPhoneText, isDark && styles.textPrimaryDark]}>
                  {staff.phone}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* General Hotline */}
        <View style={[styles.hotlineCard, isDark && styles.hotlineCardDark]}>
          <Building size={24} color="#059669" />
          <View style={{ flex: 1 }}>
            <Text style={styles.hotlineTitle}>Tổng đài dịch vụ khách hàng LifeSoft</Text>
            <Text style={[styles.hotlineValue, isDark && { color: '#34d399' }]}>1900 6868 (Giờ hành chính)</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SupportInfo;
