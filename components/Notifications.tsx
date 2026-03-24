import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Bell, ChevronLeft, Calendar, Info } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    containerDark: {
        backgroundColor: '#0f172a',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    borderDark: {
        borderBottomColor: '#334155',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    backText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#222353',
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        color: '#222353',
        marginRight: 40, // To center title despite back button
    },
    listContent: {
        padding: 16,
        gap: 12,
    },
    notificationItem: {
        flexDirection: 'row',
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        padding: 16,
        gap: 16,
    },
    itemDark: {
        backgroundColor: '#1e293b',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconInfo: {
        backgroundColor: '#3b82f6',
    },
    iconAlert: {
        backgroundColor: '#ef4444',
    },
    content: {
        flex: 1,
        gap: 4,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#222353',
    },
    itemMessage: {
        fontSize: 14,
        color: '#464652',
        lineHeight: 20,
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
    },
    timeText: {
        fontSize: 12,
        color: '#777683',
    },
    textDark: {
        color: '#ffffff',
    },
    textMutedDark: {
        color: '#94a3b8',
    },
});
