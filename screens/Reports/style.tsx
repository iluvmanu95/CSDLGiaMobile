import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 24,
    },
    headerSection: {
        paddingHorizontal: 8,
    },
    title: {
        fontFamily: 'Manrope',
        fontSize: 24,
        fontWeight: '800',
        color: '#222353',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        color: '#464652',
        marginTop: 4,
        lineHeight: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#191c1d',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.04,
        shadowRadius: 40,
        elevation: 2,
    },
    cardDark: {
        backgroundColor: '#1e293b',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    cardTitle: {
        fontFamily: 'Manrope',
        fontSize: 18,
        fontWeight: '700',
        color: '#222353',
    },
    cardSubtitle: {
        fontSize: 12,
        color: '#464652',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginTop: 2,
    },
    badge: {
        backgroundColor: 'rgba(34, 35, 83, 0.1)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    badgeText: {
        color: '#222353',
        fontSize: 11,
        fontWeight: '700',
    },
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    svgWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    donutContent: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    donutValue: {
        fontFamily: 'Manrope',
        fontSize: 32,
        fontWeight: '800',
        color: '#222353',
    },
    donutLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#464652',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 28,
    },
    statItem: {
        gap: 4,
    },
    statLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    statLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#464652',
    },
    statValue: {
        fontFamily: 'Manrope',
        fontSize: 14,
        fontWeight: '700',
        color: '#222353',
    },
    gridContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    gridCard: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#191c1d',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.04,
        shadowRadius: 40,
        elevation: 2,
    },
    gridCardTitle: {
        fontFamily: 'Manrope',
        fontSize: 14,
        fontWeight: '700',
        color: '#222353',
        marginBottom: 8,
    },
    gridStatValue: {
        fontSize: 22,
        fontWeight: '800',
        color: '#222353',
        marginBottom: 2,
    },
    gridStatLabel: {
        fontSize: 12,
        color: '#64748b',
    },
    textDark: {
        color: '#ffffff',
    },
    textMutedDark: {
        color: '#94a3b8',
    },
});

export default styles;
