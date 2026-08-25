import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header: {
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.05)',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    headerDark: {
        backgroundColor: '#1e293b',
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    menuButton: {
        padding: 8,
        marginLeft: -8,
    },
    headerTitle: {
        fontFamily: 'Manrope',
        fontWeight: '800',
        fontSize: 18,
        color: '#222353',
        letterSpacing: -0.5,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationBadge: {
        position: 'absolute',
        top: 2,
        right: 2,
        width: 8,
        height: 8,
        backgroundColor: '#ba1a1a',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#ffffff',
    },
    textDark: {
        color: '#ffffff',
    },
});

export default styles;
