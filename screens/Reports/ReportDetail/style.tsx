import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 40,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: '#64748b',
        fontWeight: '500',
    },
    sectionCard: {
        backgroundColor: '#ffffff',
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
        marginBottom: 16,
    },
    sectionCardDark: {
        backgroundColor: '#1e293b',
        borderColor: '#334155',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    sectionHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    sectionIconWrapper: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionTitleCol: {
        gap: 2,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0f172a',
    },
    sectionSubtitle: {
        fontSize: 11,
        color: '#64748b',
    },
    legendBadgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingTop: 10,
        marginTop: 6,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    legendBadgeRowDark: {
        borderTopColor: '#334155',
    },
    legendBadgeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    legendBadgeDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    legendBadgeText: {
        fontSize: 11,
        color: '#64748b',
        fontWeight: '500',
    },
    textDark: {
        color: '#f8fafc',
    },
    textMutedDark: {
        color: '#94a3b8',
    },
});

export default styles;
