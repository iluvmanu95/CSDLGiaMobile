import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f3f4f5',
    borderRightWidth: 1,
    borderRightColor: 'rgba(0, 0, 0, 0.05)',
  },
  scrollContent: {
    padding: 16,
  },
  profileHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#38396a',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    backgroundColor: '#34d399',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#f3f4f5',
  },
  profileInfo: {
    gap: 2,
  },
  profileName: {
    fontFamily: 'Manrope',
    fontWeight: '700',
    fontSize: 20,
    color: '#222353',
  },
  profileEmail: {
    fontSize: 14,
    color: '#464652',
  },
  badge: {
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: 'rgba(34, 35, 83, 0.1)',
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#222353',
  },
  nav: {
    flex: 1,
    gap: 4,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeNavItem: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  navLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#464652',
  },
  activeNavLabel: {
    color: '#222353',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginVertical: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ba1a1a',
  },
  footer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  brand: {
    fontFamily: 'Manrope',
    fontWeight: '800',
    fontSize: 18,
    color: '#222353',
  },
  version: {
    fontSize: 10,
    fontWeight: '700',
    color: '#777683',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  containerDark: {
    backgroundColor: '#1e293b',
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatarWrapperDark: {
    borderColor: '#1e293b',
  },
  statusDotDark: {
    borderColor: '#1e293b',
  },
  textDark: {
    color: '#ffffff',
  },
  textMutedDark: {
    color: '#94a3b8',
  },
  badgeDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeNavItemDark: {
    backgroundColor: '#334155',
  },
  activeNavLabelDark: {
    color: '#ffffff',
  },
  dividerDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  footerDark: {
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export default styles;
