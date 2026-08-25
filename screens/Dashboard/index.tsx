import styles from './style';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme, useAuth } from '../../store';
import { Info } from 'lucide-react-native';

import { formatDateFullVN, formatTime, getGreeting } from '../../helper';

export const Dashboard: React.FC<{ user?: any }> = ({ user: propUser }) => {
  const { isDark } = useTheme();
  const { user: authUser } = useAuth();
  const user = propUser || authUser;
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

  return (
    <ScrollView style={[styles.container, isDark && styles.containerDark]} contentContainerStyle={styles.scrollContent}>
      <View style={[styles.heroSection, { justifyContent: 'flex-end', marginBottom: 16 }]}>
        <View style={[styles.dateTimeContainer, isDark && styles.cardDark]}>
          <Text style={[styles.dateText, isDark && styles.textMutedDark]}>
            {formatDateFullVN(now)}  |  <Text style={[styles.timeTextInline, isDark && styles.textDark]}>{formatTime(now)}</Text>
          </Text>
        </View>
      </View>

      <View style={styles.heroSection}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.heroTitle, isDark && styles.textDark]}>
            {getGreeting(now)}, {user?.name || user?.username || user?.Name || user?.Username || 'Thành viên'}.
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
export default Dashboard;
