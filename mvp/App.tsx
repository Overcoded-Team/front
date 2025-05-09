import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from './contexts/AuthContext';

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export default function App() {
  const { signIn, signUp } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const clearFields = () => {
    setEmail('');
    setPassword('');
    setErrors({});
  };

  const validateForm = (): boolean => {
    console.log('Validando formulário...');
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (!validatePassword(password)) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    }

    console.log('Erros de validação:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = async () => {
    console.log('handleAuth iniciado', { activeTab, email, password });
    
    if (!validateForm()) {
      console.log('Validação falhou');
      return;
    }

    setLoading(true);
    try {
      console.log('Tentando autenticação...');
      if (activeTab === 'login') {
        console.log('Tentando login...');
        await signIn(email, password);
      } else {
        console.log('Tentando signup...');
        await signUp(email, password);
      }
      console.log('Autenticação bem-sucedida!');
      clearFields();
    } catch (error) {
      console.error('Erro na autenticação:', error);
      Alert.alert(
        'Erro',
        error instanceof Error ? error.message : 'Ocorreu um erro inesperado'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1.2, backgroundColor: '#FF4B00' }} />
        <View style={{ flex: 0.8, backgroundColor: '#fff' }} />
        <View style={styles.centeredContent}>
          <View style={styles.header}>
            <Image
              source={require('./assets/logo-chefNow.png')}
              style={styles.logoImg}
              resizeMode="contain"
            />
          </View>
          <View style={styles.card}>
            <View style={styles.tabs}>
              <TouchableOpacity
                onPress={() => {
                  setActiveTab('login');
                  clearFields();
                }}
                style={styles.tabBtn}
              >
                <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>
                  Login
                </Text>
                {activeTab === 'login' && <View style={styles.activeTabBar} />}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setActiveTab('signup');
                  clearFields();
                }}
                style={styles.tabBtn}
              >
                <Text style={[styles.tabText, activeTab === 'signup' && styles.activeTabText]}>
                  Sign-up
                </Text>
                {activeTab === 'signup' && <View style={styles.activeTabBar} />}
              </TouchableOpacity>
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Email address</Text>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="Informe seu email"
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                placeholder="Informe sua senha"
                secureTextEntry
                editable={!loading}
              />
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

              {activeTab === 'login' && (
                <TouchableOpacity>
                  <Text style={styles.forgot}>Forgot passcode?</Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
              onPress={handleAuth}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginBtnText}>
                  {activeTab === 'login' ? 'Login' : 'Sign-up'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <StatusBar style="auto" />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  centeredContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logoImg: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  tabs: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 8,
  },
  tabText: {
    fontSize: 18,
    color: '#888',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FF4B00',
    fontWeight: 'bold',
  },
  activeTabBar: {
    marginTop: 4,
    height: 3,
    width: 40,
    backgroundColor: '#FF4B00',
    borderRadius: 2,
  },
  form: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
    marginBottom: 2,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#888',
    fontSize: 16,
    paddingVertical: 6,
    marginBottom: 8,
    color: '#222',
  },
  forgot: {
    color: '#FF4B00',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 10,
  },
  loginBtn: {
    backgroundColor: '#FF4B00',
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 10,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputError: {
    borderBottomColor: '#FF4B00',
  },
  errorText: {
    color: '#FF4B00',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 8,
  },
  loginBtnDisabled: {
    opacity: 0.7,
  },
});
