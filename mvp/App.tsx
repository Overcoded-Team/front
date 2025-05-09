import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
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
            <TouchableOpacity onPress={() => setActiveTab('login')} style={styles.tabBtn}>
              <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>Login</Text>
              {activeTab === 'login' && <View style={styles.activeTabBar} />}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('signup')} style={styles.tabBtn}>
              <Text style={[styles.tabText, activeTab === 'signup' && styles.activeTabText]}>Sign-up</Text>
              {activeTab === 'signup' && <View style={styles.activeTabBar} />}
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="vitoriamendes@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="********"
              secureTextEntry
            />
            <TouchableOpacity>
              <Text style={styles.forgot}>Forgot passcode?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    </View>
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
});
