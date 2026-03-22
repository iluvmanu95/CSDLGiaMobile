import { StyleSheet } from 'react-native';
import React from 'react'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    layout: {
        flex: 1,
        flexDirection: 'row',
    },
    main: {
        flex: 1,
        flexDirection: 'column',
    },
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
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    menuButton: {
        padding: 8,
        marginLeft: -8,
    },
    pushOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        backgroundColor: 'transparent',
    },
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
    desktopNav: {
        flexDirection: 'row',
        gap: 24,
        marginRight: 24,
    },
    navText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#464652',
    },
    activeNavText: {
        color: '#222353',
    },
    activeNavTextDark: {
        color: '#ffffff',
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
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 100,
    },
    centerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 400,
    },
    placeholderText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#464652',
    },
    containerDark: {
        backgroundColor: '#0f172a',
    },
    headerDark: {
        backgroundColor: '#1e293b',
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    drawerContainerDark: {
        backgroundColor: '#1e293b',
    },
    textDark: {
        color: '#ffffff',
    },
    textMutedDark: {
        color: '#94a3b8',
    },
    borderDark: {
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
});

export default styles