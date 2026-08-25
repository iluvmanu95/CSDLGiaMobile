import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  navItem: {
    padding: 12,
    borderRadius: 999,
  },
  activeNavItem: {
    backgroundColor: '#222353',
  },
  containerDark: {
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeNavItemDark: {
    backgroundColor: '#334155',
  },
});

export default styles;
