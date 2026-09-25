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
    padding: 16,
    paddingBottom: 120,
  },
  // Text Colors & Dark mode utils
  textDark: {
    color: '#f8fafc',
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
    shadowColor: '#000000',
    shadowOpacity: 0.3,
  },

  // Header Section
  headerSection: {
    marginBottom: 16,
  },
  topHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
    gap: 8,
  },
  greetingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#eff6ff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#dbeafe',
    flexShrink: 1,
  },
  greetingBadgeDark: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  greetingText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: '#2563eb',
    flexShrink: 1,
  },
  greetingTextDark: {
    color: '#93c5fd',
  },
  dateTimeBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  dateTimeBadgeDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  dateTimeText: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '600',
    color: '#64748b',
  },
  mainTitle: {
    fontFamily: 'Manrope',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    color: '#1e293b',
    letterSpacing: -0.5,
  },
  mainSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: '#64748b',
    marginTop: 4,
  },

  // Toolbar & Year Filter
  toolbarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 8,
    flexWrap: 'wrap',
  },
  yearPickerContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 3,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  yearPickerContainerDark: {
    backgroundColor: '#1e293b',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  yearBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 9,
  },
  yearBtnActive: {
    backgroundColor: '#2563eb',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  yearBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
  },
  yearBtnTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  refreshBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  refreshBtnDark: {
    backgroundColor: '#1e293b',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  refreshBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },

  // Category Filter Pills
  categoryScroll: {
    marginVertical: 12,
  },
  categoryScrollContent: {
    gap: 8,
    paddingRight: 8,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  categoryPillDark: {
    backgroundColor: '#1e293b',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryPillActive: {
    backgroundColor: '#222353',
    borderColor: '#222353',
  },
  categoryPillActiveDark: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  categoryPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  categoryPillTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  categoryPillBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  categoryPillBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  categoryPillBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  categoryPillBadgeTextActive: {
    color: '#ffffff',
  },

  // Overview Total Card
  totalHeroCard: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    backgroundColor: '#222353',
    shadowColor: '#222353',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
    overflow: 'hidden',
  },
  totalHeroCardDark: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  totalHeroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  totalHeroLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  totalHeroLabel: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    flex: 1,
  },
  growthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexShrink: 0,
  },
  growthBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#34d399',
  },
  totalHeroValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 14,
    flexWrap: 'wrap',
  },
  totalHeroValue: {
    fontFamily: 'Manrope',
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
    color: '#ffffff',
  },
  totalHeroUnit: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  totalHeroStatsGrid: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.12)',
    paddingTop: 12,
    gap: 8,
  },
  totalHeroMiniStat: {
    flex: 1,
  },
  totalHeroMiniStatLabel: {
    fontSize: 10,
    lineHeight: 14,
    color: 'rgba(255, 255, 255, 0.65)',
    marginBottom: 2,
  },
  totalHeroMiniStatVal: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    color: '#ffffff',
  },

  // KPI Grid 2x2
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },
  kpiCard: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 13,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
    overflow: 'hidden',
  },
  kpiHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  kpiIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kpiPercentBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  kpiPercentText: {
    fontSize: 10,
    fontWeight: '700',
  },
  kpiValue: {
    fontFamily: 'Manrope',
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 2,
  },
  kpiTitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
  },
  kpiProgressBarBg: {
    height: 4,
    backgroundColor: '#f1f5f9',
    borderRadius: 2,
    overflow: 'hidden',
  },
  kpiProgressBarBgDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  kpiProgressBarFill: {
    height: '100%',
    borderRadius: 2,
  },

  // General Chart Card
  chartCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
    gap: 8,
  },
  chartTitleContainer: {
    flex: 1,
    marginRight: 6,
  },
  chartTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chartTitle: {
    fontFamily: 'Manrope',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: '#1e293b',
    flex: 1,
  },
  chartSubtitle: {
    fontSize: 11,
    lineHeight: 16,
    color: '#64748b',
    marginTop: 2,
  },
  chartTypeToggle: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 2,
    flexShrink: 0,
    alignSelf: 'flex-start',
  },
  chartTypeToggleDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  chartTypeBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartTypeBtnActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  chartTypeBtnActiveDark: {
    backgroundColor: '#334155',
  },
  chartTypeBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
  },
  chartTypeBtnTextActive: {
    color: '#1e293b',
    fontWeight: '700',
  },

  // Legend List for Donut
  legendContainer: {
    marginTop: 14,
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
  },
  legendItemDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  legendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  legendDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
  },
  legendName: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: '#334155',
    flex: 1,
  },
  legendRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 0,
  },
  legendCount: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
  },
  legendPercent: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    width: 32,
    textAlign: 'right',
  },

  // Status Breakdown Card
  statusList: {
    gap: 12,
    marginTop: 8,
  },
  statusRow: {
    gap: 6,
  },
  statusInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  statusName: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: '#334155',
    flex: 1,
  },
  statusVal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
    flexShrink: 0,
  },
  statusTrack: {
    height: 7,
    backgroundColor: '#f1f5f9',
    borderRadius: 3.5,
    overflow: 'hidden',
  },
  statusTrackDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  statusFill: {
    height: '100%',
    borderRadius: 3.5,
  },

  // Module Details Section
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontFamily: 'Manrope',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
    color: '#1e293b',
  },
  sectionBadge: {
    fontSize: 11,
    color: '#64748b',
  },
  moduleCardsContainer: {
    gap: 10,
    marginBottom: 18,
  },
  moduleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },
  moduleCardDark: {
    backgroundColor: '#1e293b',
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  moduleCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 8,
  },
  moduleCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  moduleIconBox: {
    width: 34,
    height: 34,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  moduleTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    color: '#1e293b',
    flex: 1,
  },
  moduleDesc: {
    fontSize: 11,
    lineHeight: 15,
    color: '#64748b',
    marginTop: 2,
    flex: 1,
  },
  moduleCountBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: '#eff6ff',
    flexShrink: 0,
  },
  moduleCountBadgeDark: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
  },
  moduleCountText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563eb',
  },
  moduleStatsRow: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    padding: 8,
    borderRadius: 10,
    gap: 6,
    marginTop: 6,
  },
  moduleStatsRowDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  moduleStatItem: {
    flex: 1,
  },
  moduleStatLabel: {
    fontSize: 10,
    lineHeight: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  moduleStatVal: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: '#1e293b',
  },

  // Recent Submissions Feed
  recentFeed: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 18,
    overflow: 'hidden',
  },
  feedHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  feedTitle: {
    fontFamily: 'Manrope',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  feedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    gap: 10,
  },
  feedItemDark: {
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  feedIconDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  feedContent: {
    flex: 1,
    marginRight: 4,
  },
  feedItemTitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  feedItemMeta: {
    fontSize: 10,
    lineHeight: 14,
    color: '#64748b',
    marginTop: 2,
  },
  feedStatusBadge: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 7,
    flexShrink: 0,
  },
  feedStatusText: {
    fontSize: 10,
    fontWeight: '700',
  },
});

export default styles;
