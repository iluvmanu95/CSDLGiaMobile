import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
        paddingBottom: 24,
    },
    headerSection: {
        paddingHorizontal: 8,
        marginBottom: 8,
    },
    title: {
        fontFamily: 'Manrope',
        fontSize: 22,
        fontWeight: '800',
        color: '#222353',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 13,
        color: '#464652',
        marginTop: 4,
        lineHeight: 18,
    },
    reportList: {
        gap: 12,
    },
    reportCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#191c1d',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    reportCardDark: {
        backgroundColor: '#1e293b',
        borderColor: '#334155',
    },
    iconWrapper: {
        width: 46,
        height: 46,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    reportContent: {
        flex: 1,
    },
    reportTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1e293b',
        lineHeight: 20,
    },
    reportDescription: {
        fontSize: 12,
        color: '#64748b',
        marginTop: 4,
        lineHeight: 16,
    },
    arrowWrapper: {
        paddingLeft: 8,
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 32,
        maxHeight: '90%',
    },
    modalContainerDark: {
        backgroundColor: '#0f172a',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    modalHeaderDark: {
        borderBottomColor: '#334155',
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1e293b',
        flex: 1,
        paddingRight: 12,
    },
    closeButton: {
        padding: 4,
    },
    modalBody: {
        marginTop: 16,
        gap: 16,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#475569',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    // Period Tab Selector
    tabSelector: {
        flexDirection: 'row',
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        padding: 4,
        gap: 4,
    },
    tabSelectorDark: {
        backgroundColor: '#1e293b',
    },
    tabItem: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 8,
    },
    tabItemActive: {
        backgroundColor: '#222353',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    tabItemActiveDark: {
        backgroundColor: '#3b82f6',
    },
    tabItemText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#64748b',
    },
    tabItemTextDark: {
        color: '#94a3b8',
    },
    tabItemTextActive: {
        color: '#ffffff',
        fontWeight: '700',
    },
    // Date & Form Fields
    formRow: {
        flexDirection: 'row',
        gap: 12,
    },
    formGroup: {
        flex: 1,
    },
    inputLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748b',
        marginBottom: 6,
    },
    textInput: {
        height: 44,
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 10,
        paddingHorizontal: 12,
        fontSize: 14,
        color: '#1e293b',
    },
    textInputDark: {
        backgroundColor: '#1e293b',
        borderColor: '#334155',
        color: '#f8fafc',
    },
    // Pill Selectors for Quarters / Months / Years
    pillGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    pillItem: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: '#f1f5f9',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    pillItemDark: {
        backgroundColor: '#1e293b',
        borderColor: '#334155',
    },
    pillItemActive: {
        backgroundColor: '#222353',
        borderColor: '#222353',
    },
    pillItemActiveDark: {
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
    },
    pillText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#475569',
    },
    pillTextDark: {
        color: '#cbd5e1',
    },
    pillTextActive: {
        color: '#ffffff',
        fontWeight: '700',
    },
    // Business Category List
    searchBar: {
        height: 40,
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 10,
        paddingHorizontal: 12,
        fontSize: 13,
        color: '#1e293b',
        marginBottom: 8,
    },
    businessList: {
        maxHeight: 180,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 10,
        backgroundColor: '#f8fafc',
    },
    businessListDark: {
        borderColor: '#334155',
        backgroundColor: '#1e293b',
    },
    businessItem: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    businessItemDark: {
        borderBottomColor: '#334155',
    },
    businessItemActive: {
        backgroundColor: '#eef2ff',
    },
    businessItemActiveDark: {
        backgroundColor: '#1e3a8a',
    },
    businessItemText: {
        fontSize: 13,
        color: '#334155',
        flex: 1,
    },
    businessItemLevel0: {
        backgroundColor: '#f1f5f9',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    businessItemLevel0Dark: {
        backgroundColor: '#1e293b',
        borderBottomColor: '#334155',
    },
    businessItemTextLevel0: {
        fontSize: 13,
        fontWeight: '800',
        color: '#222353',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    businessItemTextParent: {
        fontWeight: '700',
        color: '#1e293b',
    },
    businessItemTextChild: {
        fontWeight: '500',
        color: '#475569',
    },
    businessItemTextDark: {
        color: '#e2e8f0',
    },
    businessItemTextActive: {
        color: '#222353',
        fontWeight: '700',
    },
    // Modal Actions
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 10,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    actionButtonsDark: {
        borderTopColor: '#334155',
    },
    cancelBtn: {
        flex: 1,
        height: 46,
        borderRadius: 12,
        backgroundColor: '#f1f5f9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelBtnDark: {
        backgroundColor: '#334155',
    },
    cancelBtnText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748b',
    },
    cancelBtnTextDark: {
        color: '#cbd5e1',
    },
    submitBtn: {
        flex: 2,
        height: 46,
        borderRadius: 12,
        backgroundColor: '#222353',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnDark: {
        backgroundColor: '#3b82f6',
    },
    submitBtnText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#ffffff',
    },
    textDark: {
        color: '#ffffff',
    },
    textMutedDark: {
        color: '#94a3b8',
    },
});

export default styles;
