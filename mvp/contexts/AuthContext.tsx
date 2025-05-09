import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService, AuthResponse } from '../services/auth.service';

interface AuthContextData {
  user: AuthResponse['user'] | null;
  token: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const defaultContext: AuthContextData = {
  user: null,
  token: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
};

const AuthContext = createContext<AuthContextData>(defaultContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredData();
  }, []);

  async function loadStoredData() {
    try {
      const storedToken = await AsyncStorage.getItem('@ChefNow:token');
      const storedUser = await AsyncStorage.getItem('@ChefNow:user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      // erro ao carregar dados armazenados
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const response = await authService.login({ email, password });
      setUser(response.user);
      setToken(response.token);
      await AsyncStorage.setItem('@ChefNow:token', response.token);
      await AsyncStorage.setItem('@ChefNow:user', JSON.stringify(response.user));
    } catch (error) {
      throw error;
    }
  }

  async function signUp(email: string, password: string) {
    try {
      const response = await authService.signup({ email, password });
      setUser(response.user);
      setToken(response.token);
      await AsyncStorage.setItem('@ChefNow:token', response.token);
      await AsyncStorage.setItem('@ChefNow:user', JSON.stringify(response.user));
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      await AsyncStorage.removeItem('@ChefNow:token');
      await AsyncStorage.removeItem('@ChefNow:user');
      setUser(null);
      setToken(null);
    } catch (error) {
      // erro ao fazer logout
    }
  }

  const value = {
    user,
    token,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
} 