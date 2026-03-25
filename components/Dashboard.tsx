import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Info, Users } from 'lucide-react-native';

export const Dashboard: React.FC<{ user?: any }> = ({ user }) => {
  const { isDark } = useTheme();
  const [now, setNow] = useState(new Date());

  const supportStaff = [
    { name: 'Hoàng Ngọc Long', phone: '0985.365.683' },
    { name: 'Nguyễn Trần Huynh', phone: '0964 304 891' },
    { name: 'Trịnh Minh Khải', phone: '0389 095 454' },
    { name: 'Nguyễn Xuân Trường', phone: '0917.737.456' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = now.getHours();
    if (hour < 12) return 'Chào buổi sáng';
    if (hour < 18) return 'Chào buổi chiều';
    if (hour < 22) return 'Chào buổi tối';
    return 'Chào buổi đêm';
  };

  const formatDate = (date: Date) => {
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const months = ['tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6', 'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12'];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <ScrollView style={[styles.container, isDark && styles.containerDark]} contentContainerStyle={styles.scrollContent}>
      <View style={[styles.heroSection, { justifyContent: 'flex-end', marginBottom: 16 }]}>
        <View style={[styles.dateTimeContainer, isDark && styles.cardDark]}>
          <Text style={[styles.dateText, isDark && styles.textMutedDark]}>
            {formatDate(now)}  |  <Text style={[styles.timeTextInline, isDark && styles.textDark]}>{formatTime(now)}</Text>
          </Text>
        </View>
      </View>

      <View style={styles.heroSection}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.heroTitle, isDark && styles.textDark]}>
            {getGreeting()}, {user?.name || 'Thành viên'}.
          </Text>
          <Text style={[styles.heroSubtitle, isDark && styles.textMutedDark]}>Chúc bạn một ngày làm việc hiệu quả!</Text>
        </View>
      </View>

      <View style={[styles.supportCard, isDark && styles.cardDark]}>
        <View style={styles.supportHeaderRow}>
          <Info size={20} color={isDark ? "#c1c1fc" : "#222353"} />
          <Text style={[styles.supportTitle, isDark && styles.textDark]}>Thông tin hỗ trợ</Text>
        </View>

        <View style={styles.supportIntroduction}>
          <Text style={[styles.supportText, isDark && styles.textMutedDark]}>
            Công ty LifeSoft chân thành cảm ơn quý khách hàng đã tin tưởng sử dụng phần mềm của công ty. Thay mặt toàn bộ cán bộ nhân viên trong công ty gửi đến khách hàng lời chúc sức khỏe - thành công.
          </Text>
          <Text style={[styles.supportText, isDark && styles.textMutedDark, { marginTop: 12 }]}>
            Nhằm chăm sóc, hỗ trợ khách hàng nhanh chóng và tiện dụng nhất công ty xin cung cấp thông tin các cán bộ hỗ trợ khách hàng trong quá trình sử dụng. Mọi vấn đề khúc mắc khách hàng có thể liên hệ trực tiếp cho cán bộ để được hỗ trợ!
          </Text>
        </View>

        <View style={[styles.securityNotice, isDark && styles.securityNoticeDark]}>
          <Text style={styles.securityText}>
            Do các thay đổi trong chính sách bảo mật hệ thống. Các mật khẩu yếu nên thay đổi lại để tránh việc bị ăn cắp tài khoản. Mật khẩu mới nên đảm bảo các yếu tố: tối thiểu 06 ký tự, ít nhất có 01 chữ số, ít nhất 01 chữ cái hoặc ký tự đặc biệt.
          </Text>
        </View>

        <Text style={[styles.techLeadText, isDark && styles.textDark]}>
          Phụ trách khối kỹ thuật: Phó giám đốc: <Text style={{ fontWeight: '800' }}>Trần Ngọc Hiếu</Text> - Số điện thoại: <Text style={{ fontWeight: '800' }}>096 8206844</Text>
        </Text>

        <View style={styles.staffHeaderContainer}>
          <Text style={[styles.staffHeaderText, isDark && styles.textMutedDark]}>PHÒNG TRIỂN KHAI - HỖ TRỢ</Text>
        </View>

        <View style={[styles.staffListContainer, isDark && styles.staffListContainerDark]}>
          <View style={styles.staffListHeader}>
            <Text style={[styles.staffListHeaderText, { flex: 1 }]}>CÁN BỘ HỖ TRỢ</Text>
            <Text style={[styles.staffListHeaderText, { width: 120, textAlign: 'right' }]}>SỐ ĐIỆN THOẠI</Text>
          </View>
          {supportStaff.map((staff, index) => (
            <View key={index} style={[styles.staffRow, index % 2 !== 0 && (isDark ? styles.staffRowAltDark : styles.staffRowAlt)]}>
              <View style={styles.staffNameCol}>
                {/* <View style={[styles.staffIconCircle, isDark && styles.staffIconCircleDark]}>
                  <Users size={14} color={isDark ? "#c1c1fc" : "#222353"} />
                </View> */}
                <Text style={[styles.staffNameText, isDark && styles.textDark]}>{staff.name}</Text>
              </View>
              <Text style={[styles.staffPhoneText, isDark && styles.textMutedDark]}>{staff.phone}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120,
  },
  heroSection: {
    marginBottom: 32,
    gap: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroTitle: {
    fontFamily: 'Manrope',
    fontSize: 32,
    fontWeight: '800',
    color: '#222353',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#464652',
  },
  containerDark: {
    backgroundColor: '#0f172a',
  },
  textDark: {
    color: '#ffffff',
  },
  textMutedDark: {
    color: '#94a3b8',
  },
  cardDark: {
    backgroundColor: '#1e293b',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  dateTimeContainer: {
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#64748b',
  },
  timeTextInline: {
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '800',
    color: '#222353',
  },
  supportCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    marginBottom: 32,
  },
  supportHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  supportTitle: {
    fontFamily: 'Manrope',
    fontSize: 20,
    fontWeight: '700',
    color: '#222353',
  },
  supportIntroduction: {
    marginBottom: 20,
  },
  supportText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#464652',
  },
  securityNotice: {
    backgroundColor: '#fff1f2',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#f43f5e',
  },
  securityNoticeDark: {
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
  },
  securityText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#be123c',
    fontWeight: '500',
  },
  techLeadText: {
    fontSize: 14,
    color: '#222353',
    marginBottom: 24,
  },
  staffHeaderContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 8,
  },
  staffHeaderText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#222353',
    letterSpacing: 1,
  },
  staffListContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  staffListContainerDark: {
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  staffListHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  staffListHeaderText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  staffRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  staffRowAlt: {
    backgroundColor: 'rgba(0, 0, 0, 0.01)',
  },
  staffRowAltDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  staffNameCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  staffIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  staffIconCircleDark: {
    backgroundColor: '#334155',
  },
  staffNameText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222353',
  },
  staffPhoneText: {
    fontSize: 14,
    color: '#464652',
    fontVariant: ['tabular-nums'],
    width: 120,
    textAlign: 'right',
  },
});
