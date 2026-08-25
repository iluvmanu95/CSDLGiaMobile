import styles from './style';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Bell, Info, Calendar } from 'lucide-react-native';
import { useTheme } from '../../store';

interface NotificationsProps {
    onBack: () => void;
}

const NOTIFICATIONS_DATA = [
    {
        id: '1',
        title: 'Cập nhật hệ thống',
        message: 'Hệ thống sẽ được bảo trì vào lúc 22:00 tối nay. Vui lòng lưu lại công việc của bạn.',
        time: '10 phút trước',
        type: 'info'
    },
    {
        id: '2',
        title: 'Hồ sơ mới',
        message: 'Bạn có một hồ sơ Thuế tài nguyên mới cần phê duyệt.',
        time: '1 giờ trước',
        type: 'alert'
    },
    {
        id: '3',
        title: 'Báo cáo hàng tuần',
        message: 'Báo cáo hiệu suất của bạn cho tuần này đã sẵn sàng để xem.',
        time: '5 giờ trước',
        type: 'info'
    }
];

export const Notifications: React.FC<NotificationsProps> = ({ onBack }) => {
    const { isDark } = useTheme();

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            <ScrollView contentContainerStyle={styles.listContent}>
                {NOTIFICATIONS_DATA.map((item) => (
                    <TouchableOpacity key={item.id} style={[styles.notificationItem, isDark && styles.itemDark]}>
                        <View style={[styles.iconContainer, item.type === 'alert' ? styles.iconAlert : styles.iconInfo]}>
                            {item.type === 'alert' ?
                                <Bell size={20} color="#ffffff" /> :
                                <Info size={20} color="#ffffff" />
                            }
                        </View>
                        <View style={styles.content}>
                            <Text style={[styles.itemTitle, isDark && styles.textDark]}>{item.title}</Text>
                            <Text style={[styles.itemMessage, isDark && styles.textMutedDark]}>{item.message}</Text>
                            <View style={styles.timeRow}>
                                <Calendar size={12} color={isDark ? "#94a3b8" : "#777683"} />
                                <Text style={[styles.timeText, isDark && styles.textMutedDark]}>{item.time}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};
export default Notifications;
