import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  containerDark: {
    backgroundColor: '#0f172a',
  },
  bgDecor1: {
    position: 'absolute',
    top: '-10%',
    left: '-10%',
    width: '40%',
    height: '40%',
    backgroundColor: 'rgba(193, 193, 252, 0.2)',
    borderRadius: 9999,
  },
  bgDecor2: {
    position: 'absolute',
    bottom: '-5%',
    right: '-5%',
    width: '30%',
    height: '30%',
    backgroundColor: 'rgba(255, 182, 146, 0.1)',
    borderRadius: 9999,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 448,
    alignItems: 'center',
  },
  contentWrapperDesktop: {
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  brandName: {
    fontFamily: 'Manrope',
    fontSize: 30,
    fontWeight: '800',
    color: '#222353',
    letterSpacing: -0.5,
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#191c1d',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.04,
    shadowRadius: 40,
    elevation: 4,
  },
  cardDark: {
    backgroundColor: '#1e293b',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  cardHeader: {
    marginBottom: 32,
  },
  title: {
    fontFamily: 'Manrope',
    fontSize: 24,
    fontWeight: '700',
    color: '#191c1d',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#464652',
    lineHeight: 22,
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#464652',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginLeft: 4,
  },
  input: {
    width: '100%',
    backgroundColor: '#e7e8e9',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#191c1d',
  },
  inputDark: {
    backgroundColor: '#334155',
    color: '#ffffff',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#e7e8e9',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  passwordInputContainerDark: {
    backgroundColor: '#334155',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 14,
    color: '#191c1d',
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPassword: {
    fontSize: 12,
    fontWeight: '500',
    color: '#222353',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#222353',
    paddingVertical: 16,
    borderRadius: 9999,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  loginButtonText: {
    fontFamily: 'Manrope',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#464652',
  },
  signupText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222353',
  },
  textDark: {
    color: '#ffffff',
  },
  textMutedDark: {
    color: '#94a3b8',
  },
});

export default styles;
