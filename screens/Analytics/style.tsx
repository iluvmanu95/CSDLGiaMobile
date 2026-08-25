import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
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
    toolbarScroll: {
        marginHorizontal: -24,
    },
    toolbarContainer: {
        paddingHorizontal: 24,
        gap: 8,
    },
    toolbarButtonPrimary: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#222353',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 999,
        gap: 8,
    },
    toolbarButtonTextPrimary: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '600',
    },
    filterPillActive: {
        backgroundColor: '#222353',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 999,
    },
    filterPillTextActive: {
        color: '#ffffff',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1,
    },
    filterPill: {
        backgroundColor: '#e7e8e9',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 999,
    },
    filterPillDark: {
        backgroundColor: '#1e293b',
    },
    filterPillText: {
        color: '#464652',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1,
    },
    tableCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)',
    },
    tableCardDark: {
        backgroundColor: '#1e293b',
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    tableInner: {
        minWidth: 700,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f8fafc',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    tableHeaderDark: {
        backgroundColor: '#0f172a',
        borderBottomColor: '#334155',
    },
    headerCell: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        justifyContent: 'center',
    },
    headerText: {
        fontFamily: 'Manrope',
        fontSize: 11,
        fontWeight: '700',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    tableRowDark: {
        borderBottomColor: '#334155',
    },
    tableRowAlt: {
        backgroundColor: 'rgba(248, 250, 252, 0.5)',
    },
    tableRowAltDark: {
        backgroundColor: 'rgba(15, 23, 42, 0.3)',
    },
    cell: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        justifyContent: 'center',
    },
    colStt: {
        width: 60,
    },
    colTenDonVi: {
        width: 250,
    },
    colCap: {
        width: 100,
    },
    colNguoiQuanLy: {
        width: 180,
    },
    colSoDienThoai: {
        width: 130,
    },
    cellTextName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#222353',
    },
    cellTextNumber: {
        fontSize: 14,
        color: '#191c1d',
    },
    cellTextDate: {
        fontSize: 13,
        color: '#64748b',
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 14,
        color: '#64748b',
    },
    textDark: {
        color: '#ffffff',
    },
    textMutedDark: {
        color: '#94a3b8',
    },
    textPrimaryDark: {
        color: '#c1c1fc',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        maxHeight: '80%',
        paddingTop: 8,
    },
    modalContentDark: {
        backgroundColor: '#0f172a',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#edeeef',
    },
    modalHeaderDark: {
        borderBottomColor: '#1e293b',
    },
    modalHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    modalTitle: {
        fontFamily: 'Manrope',
        fontSize: 18,
        fontWeight: '700',
        color: '#222353',
    },
    modalBody: {
        padding: 24,
    },
    detailSection: {
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
    },
    sectionTitle: {
        fontFamily: 'Manrope',
        fontSize: 16,
        fontWeight: '700',
        color: '#222353',
    },
    infoGrid: {
        gap: 12,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
    },
    infoLabel: {
        fontSize: 13,
        color: '#64748b',
        width: 120,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#222353',
        flex: 1,
    },
    modalFooter: {
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: '#edeeef',
    },
    modalFooterDark: {
        borderTopColor: '#1e293b',
    },
    closeButton: {
        backgroundColor: '#222353',
        paddingVertical: 14,
        borderRadius: 16,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default styles;
