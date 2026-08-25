import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    drawerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: '#ffffff',
        zIndex: 1001,
        elevation: 16,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
    },
    drawerContainerDark: {
        backgroundColor: '#1e293b',
    },
    drawerHeader: {
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    },
    drawerTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#222353',
    },
    closeButton: {
        padding: 4,
    },
    textDark: {
        color: '#ffffff',
    },
    borderDark: {
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
});

export default styles;
