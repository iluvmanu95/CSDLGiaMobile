import { StyleSheet } from 'react-native';

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
        marginRight: 40,
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

export default styles;
