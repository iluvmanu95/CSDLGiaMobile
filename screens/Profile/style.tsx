import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroSection: {
    position: 'relative',
  },
  coverContainer: {
    height: 200,
    width: '100%',
    backgroundColor: '#e2e8f0',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  profileHeader: {
    paddingHorizontal: 24,
    marginTop: -60,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarWrapper: {
    height: 120,
    width: 120,
    borderRadius: 32,
    borderWidth: 6,
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: '#222353',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
  },
  editButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  shareButton: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 999,
  },
  identityContainer: {
    marginBottom: 8,
  },
  name: {
    fontFamily: 'Manrope',
    fontSize: 28,
    fontWeight: '800',
    color: '#222353',
  },
  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#f59e0b',
  },
  content: {
    padding: 24,
    gap: 24,
  },
  card: {
    backgroundColor: '#f8fafc',
    padding: 24,
    borderRadius: 32,
    gap: 16,
  },
  cardTitle: {
    fontFamily: 'Manrope',
    fontSize: 18,
    fontWeight: '700',
    color: '#222353',
  },
  bioText: {
    fontSize: 14,
    color: '#464652',
    lineHeight: 22,
  },
  metaContainer: {
    gap: 14,
    paddingVertical: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  metaContent: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 2,
  },
  metaText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222353',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#222353',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#64748b',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  tabs: {
    flexDirection: 'row',
    gap: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    paddingBottom: 4,
  },
  tab: {
    paddingBottom: 12,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#222353',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94a3b8',
  },
  activeTabText: {
    color: '#222353',
  },
  collectionsGrid: {
    gap: 24,
  },
  collectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  collectionImageWrapper: {
    height: 240,
    width: '100%',
    position: 'relative',
  },
  collectionImage: {
    width: '100%',
    height: '100%',
  },
  editorBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#f59e0b',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  editorBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  collectionInfo: {
    padding: 24,
  },
  collectionTitle: {
    fontFamily: 'Manrope',
    fontSize: 20,
    fontWeight: '700',
    color: '#222353',
  },
  collectionDesc: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 8,
    lineHeight: 20,
  },
  collectionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stackAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  moreAvatars: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -10,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  moreAvatarsText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#222353',
  },
  collectionMeta: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  containerDark: {
    backgroundColor: '#0f172a',
  },
  coverContainerDark: {
    backgroundColor: '#1e293b',
  },
  avatarWrapperDark: {
    borderColor: '#1e293b',
    backgroundColor: '#1e293b',
  },
  cameraButtonDark: {
    backgroundColor: '#334155',
  },
  editButtonDark: {
    backgroundColor: '#334155',
  },
  editButtonTextDark: {
    color: '#ffffff',
  },
  shareButtonDark: {
    backgroundColor: '#334155',
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
  borderDark: {
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  dividerDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeTabDark: {
    borderBottomWidth: 3,
    borderBottomColor: '#ffffff',
  },
  activeTabTextDark: {
    color: '#ffffff',
  },
  stackAvatarDark: {
    borderColor: '#1e293b',
  },
  moreAvatarsDark: {
    backgroundColor: '#334155',
    borderColor: '#1e293b',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fee2e2',
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 16,
  },
  logoutButtonDark: {
    backgroundColor: 'rgba(186, 26, 26, 0.1)',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ba1a1a',
  },
});

export default styles;
