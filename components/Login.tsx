import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  useWindowDimensions,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Apple } from 'lucide-react-native';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const { isDark } = useTheme();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePressLogin = async () => {
    //onLogin();

    if (!username || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }

    setIsLoading(true);
    try {
      // Use 10.0.2.2 for Android emulator to access PC localhost, 
      // or substitute with your PC's local IP (e.g., 192.168.1.x) if testing on physical device
      //const apiUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/login' : 'http://localhost:8000/api/login';
      const apiUrl = 'https://subintegumental-earthly-lon.ngrok-free.dev/api/login';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const json = await response.json();

      if (response.ok && json.success) {
        onLogin();
      } else {
        Alert.alert('Đăng nhập thất bại', json.message || 'Tên đăng nhập hoặc mật khẩu không đúng');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi kết nối', 'Không thể kết nối tới máy chủ API. Vui lòng kiểm tra lại chạy `php artisan serve` ở backend.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
            backgroundColor: isDark ? '#0f172a' : '#f8f9fa'
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Decorative Background Elements */}
          <View style={styles.bgDecor1} />
          <View style={styles.bgDecor2} />

          <View style={[styles.contentWrapper, isDesktop && styles.contentWrapperDesktop]}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Sparkles size={32} color="#ffffff" fill="#ffffff" />
              </View>
              <Text style={[styles.brandName, isDark && styles.textDark]}>Cơ sở dữ liệu Giá</Text>
            </View>

            <View style={[styles.card, isDark && styles.cardDark]}>
              <View style={styles.cardHeader}>
                <Text style={[styles.title, isDark && styles.textDark]}>Chào mừng bạn</Text>
                <Text style={[styles.subtitle, isDark && styles.textMutedDark]}>
                  Vui lòng nhập thông tin đăng nhập để truy cập vào bảng điều khiển của bạn.
                </Text>
              </View>

              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, isDark && styles.textMutedDark]}>TÊN ĐĂNG NHẬP</Text>
                  <TextInput
                    style={[styles.input, isDark && styles.inputDark]}
                    placeholder="Nhập tên đăng nhập"
                    placeholderTextColor={isDark ? "#94a3b8" : "#9ca3af"}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <View style={styles.passwordHeader}>
                    <Text style={[styles.label, isDark && styles.textMutedDark]}>MẬT KHẨU</Text>
                    <TouchableOpacity>
                      <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={[styles.input, isDark && styles.inputDark]}
                    placeholder="••••••••"
                    placeholderTextColor={isDark ? "#94a3b8" : "#9ca3af"}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>

                <TouchableOpacity
                  style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                  onPress={handlePressLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <Text style={styles.loginButtonText}>Đăng Nhập</Text>
                  )}
                </TouchableOpacity>
              </View>

              {/* <View style={styles.dividerContainer}>
                <View style={[styles.dividerLine, isDark && styles.dividerLineDark]} />
                <View style={[styles.dividerTextContainer, isDark && styles.dividerTextContainerDark]}>
                  <Text style={[styles.dividerText, isDark && styles.textMutedDark]}>OR SIGN IN WITH</Text>
                </View>
              </View>

              <View style={styles.socialContainer}>
                <TouchableOpacity style={[styles.socialButton, isDark && styles.socialButtonDark]}>
                  <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }}
                    style={styles.socialIcon}
                  />
                  <Text style={[styles.socialButtonText, isDark && styles.textDark]}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.socialButton, isDark && styles.socialButtonDark]}>
                  <Apple size={20} color={isDark ? "#ffffff" : "#191c1d"} fill={isDark ? "#ffffff" : "#191c1d"} />
                  <Text style={[styles.socialButtonText, isDark && styles.textDark]}>Apple</Text>
                </TouchableOpacity>
              </View> */}
            </View>

            <View style={styles.footer}>
              <Text style={[styles.footerText, isDark && styles.textMutedDark]}>
                Bạn chưa có tài khoản?{' '}
              </Text>
              <TouchableOpacity>
                <Text style={styles.signupText}>Đăng ký</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

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
    // Note: React Native doesn't support CSS blur filter directly on Views without extra libraries
    // We'd typically use an image or SVG for complex blurred backgrounds
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
    maxWidth: 448, // max-w-md
    alignItems: 'center',
  },
  contentWrapperDesktop: {
    // Add any specific desktop styles here if needed
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#222353',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#191c1d',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.04,
    shadowRadius: 40,
    elevation: 5,
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
  dividerContainer: {
    position: 'relative',
    marginVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dividerLine: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(199, 197, 212, 0.2)',
  },
  dividerLineDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dividerTextContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
  dividerTextContainerDark: {
    backgroundColor: '#1e293b',
  },
  dividerText: {
    fontSize: 12,
    color: '#777683',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '600',
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#f3f4f5',
    paddingVertical: 12,
    borderRadius: 9999,
  },
  socialButtonDark: {
    backgroundColor: '#334155',
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#191c1d',
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
