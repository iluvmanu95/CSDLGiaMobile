import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#222353',
    marginBottom: 8,
    fontFamily: 'Manrope',
  },
  subtitle: {
    fontSize: 14,
    color: '#464652',
    fontFamily: 'Manrope',
  },
  grid: {
    gap: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  badge: {
    backgroundColor: 'rgba(34, 35, 83, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#222353',
    letterSpacing: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222353',
  },
  editButton: {
    backgroundColor: '#222353',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  detailItem: {
    width: '45%',
  },
  detailLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#464652',
    letterSpacing: 1,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: '#222353',
    fontWeight: '500',
  },
  themeCard: {
    backgroundColor: '#222353',
    aspectRatio: 1,
    justifyContent: 'space-between',
  },
  cardIcon: {
    marginBottom: 16,
  },
  themeCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  themeCardSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 18,
  },
  themeToggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 4,
    borderRadius: 100,
  },
  themeOption: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 100,
  },
  activeThemeOption: {
    backgroundColor: '#ffffff',
  },
  themeOptionText: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  activeThemeOptionText: {
    color: '#222353',
  },
  section: {
    marginTop: 8,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#464652',
    letterSpacing: 2,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  listContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222353',
    marginBottom: 2,
  },
  listItemSubtitle: {
    fontSize: 12,
    color: '#464652',
  },
  listItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusBadge: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#464652',
  },
  dangerZone: {
    marginTop: 16,
    padding: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(186, 26, 26, 0.05)',
    borderWidth: 2,
    borderColor: 'rgba(186, 26, 26, 0.1)',
    borderStyle: 'dashed',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 20,
  },
  dangerZoneText: {
    flex: 1,
  },
  dangerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ba1a1a',
    marginBottom: 4,
  },
  dangerSubtitle: {
    fontSize: 13,
    color: '#464652',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ba1a1a',
  },
  deleteButtonText: {
    color: '#ba1a1a',
    fontSize: 13,
    fontWeight: '700',
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
  badgeDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  editButtonDark: {
    backgroundColor: '#334155',
  },
  borderDark: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconContainerDark: {
    backgroundColor: '#334155',
  },
  dangerZoneDark: {
    backgroundColor: 'rgba(186, 26, 26, 0.1)',
    borderColor: 'rgba(186, 26, 26, 0.2)',
  },
});

export default styles;
