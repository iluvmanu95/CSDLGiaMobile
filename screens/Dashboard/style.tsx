import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120,
  },
  heroSection: {
    marginBottom: 32,
    gap: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroTitle: {
    fontFamily: 'Manrope',
    fontSize: 32,
    fontWeight: '800',
    color: '#222353',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#464652',
  },
  containerDark: {
    backgroundColor: '#0f172a',
  },
  textDark: {
    color: '#ffffff',
  },
  textMutedDark: {
    color: '#94a3b8',
  },
  cardDark: {
    backgroundColor: '#1e293b',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  dateTimeContainer: {
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
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
    fontSize: 14,
    fontWeight: '800',
    color: '#222353',
  },
  supportCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    marginBottom: 32,
  },
  supportHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  supportTitle: {
    fontFamily: 'Manrope',
    fontSize: 20,
    fontWeight: '700',
    color: '#222353',
  },
  supportIntroduction: {
    marginBottom: 20,
  },
  supportText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#464652',
  },
  securityNotice: {
    backgroundColor: '#fff1f2',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#f43f5e',
  },
  securityNoticeDark: {
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
  },
  securityText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#be123c',
    fontWeight: '500',
  },
  techLeadText: {
    fontSize: 14,
    color: '#222353',
    marginBottom: 24,
  },
  staffHeaderContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 8,
  },
  staffHeaderText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#222353',
    letterSpacing: 1,
  },
  staffListContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  staffListContainerDark: {
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  staffListHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  staffListHeaderText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  staffRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  staffRowAlt: {
    backgroundColor: 'rgba(0, 0, 0, 0.01)',
  },
  staffRowAltDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  staffNameCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  staffIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  staffIconCircleDark: {
    backgroundColor: '#334155',
  },
  staffNameText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222353',
  },
  staffPhoneText: {
    fontSize: 14,
    color: '#464652',
    fontVariant: ['tabular-nums'],
    width: 120,
    textAlign: 'right',
  },
});

export default styles;
