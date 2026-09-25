import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  containerDark: {
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  heroSection: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroTitle: {
    fontFamily: 'Manrope',
    fontSize: 26,
    fontWeight: '800',
    color: '#222353',
    marginBottom: 4,
  },
  heroSubtitle: {
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
    color: '#93c5fd',
  },
  cardDark: {
    backgroundColor: '#1e293b',
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  dateTimeContainer: {
    alignItems: 'flex-end',
    backgroundColor: 'rgba(34, 35, 83, 0.05)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#64748b',
  },
  timeTextInline: {
    fontFamily: 'Manrope',
    fontSize: 13,
    fontWeight: '800',
    color: '#222353',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: 'Manrope',
    fontSize: 18,
    fontWeight: '700',
    color: '#222353',
  },
  supportIntroduction: {
    marginBottom: 16,
  },
  supportText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
  },
  securityNotice: {
    backgroundColor: '#fff1f2',
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#f43f5e',
  },
  securityNoticeDark: {
    backgroundColor: 'rgba(244, 63, 94, 0.12)',
    borderLeftColor: '#f43f5e',
  },
  securityTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#be123c',
    marginBottom: 4,
  },
  securityText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#be123c',
  },
  techLeadCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eff6ff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  techLeadCardDark: {
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
    borderColor: 'rgba(59, 130, 246, 0.25)',
  },
  techLeadInfo: {
    flex: 1,
  },
  techLeadRole: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3b82f6',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  techLeadName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: 2,
  },
  techLeadPhone: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563eb',
  },
  callLeadBtn: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  callLeadBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#222353',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  staffListContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  staffListContainerDark: {
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  staffRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  staffRowDark: {
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  staffRowAlt: {
    backgroundColor: 'rgba(241, 245, 249, 0.5)',
  },
  staffRowAltDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  staffLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  staffAvatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  staffAvatarCircleDark: {
    backgroundColor: '#312e81',
  },
  staffAvatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4338ca',
  },
  staffAvatarTextDark: {
    color: '#c7d2fe',
  },
  staffName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },
  staffRole: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  callStaffBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  callStaffBtnDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  staffPhoneText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
  },
  hotlineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#ecfdf5',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#a7f3d0',
    marginTop: 16,
  },
  hotlineCardDark: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(16, 185, 129, 0.25)',
  },
  hotlineTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
    textTransform: 'uppercase',
  },
  hotlineValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#065f46',
  },
});

export default styles;
