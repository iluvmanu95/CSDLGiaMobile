import styles from './style';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  useWindowDimensions,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Pressable
} from 'react-native';
import { useTheme, useAuth } from '../../store';
import { Eye, EyeOff } from 'lucide-react-native';
import Logo from '../../assets/avatars/logoThaiNguyen.png';

interface LoginProps {
  onLogin?: (username: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const { isDark } = useTheme();
  const { login } = useAuth();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePressLogin = async () => {
    if (!username || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(username, password);
      if (success) {
        if (onLogin) onLogin(username);
      } else {
        Alert.alert('Đăng nhập thất bại', 'Tên đăng nhập hoặc mật khẩu không đúng');
      }
    } catch (error: any) {
      Alert.alert('Lỗi kết nối', error?.message || 'Không thể kết nối tới máy chủ API.');
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
                <Image source={Logo} style={styles.logoImage} />
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
                  <View style={[styles.passwordInputContainer, isDark && styles.passwordInputContainerDark]}>
                    <TextInput
                      style={[styles.passwordInput, isDark && styles.textDark]}
                      placeholder="••••••••"
                      placeholderTextColor={isDark ? "#94a3b8" : "#9ca3af"}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!isPasswordVisible}
                    />
                    <Pressable
                      onPressIn={() => setIsPasswordVisible(true)}
                      onPressOut={() => setIsPasswordVisible(false)}
                      style={styles.eyeIcon}
                    >
                      {isPasswordVisible ? (
                        <Eye size={20} color={isDark ? "#ffffff" : "#464652"} />
                      ) : (
                        <EyeOff size={20} color={isDark ? "#ffffff" : "#464652"} />
                      )}
                    </Pressable>
                  </View>
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
            </View>

            {/* <View style={styles.footer}>
              <Text style={[styles.footerText, isDark && styles.textMutedDark]}>
                Bạn chưa có tài khoản?{' '}
              </Text>
              <TouchableOpacity>
                <Text style={styles.signupText}>Đăng ký</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
export default Login;
