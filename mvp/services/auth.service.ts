import axios, { AxiosError, AxiosInstance } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://10.0.2.2:3000/api";
// const API_URL = "http://localhost:3000/api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("@ChefNow:token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 401:
          await AsyncStorage.removeItem("@ChefNow:token");
          await AsyncStorage.removeItem("@ChefNow:user");
          throw new ApiError(
            status,
            "Sessão expirada. Por favor, faça login novamente."
          );
        case 403:
          throw new ApiError(status, "Acesso negado.");
        case 404:
          throw new ApiError(status, "Recurso não encontrado.");
        case 500:
          throw new ApiError(status, "Erro interno do servidor.");
        default:
          throw new ApiError(status, "Ocorreu um erro na requisição.");
      }
    }
    if (error.request) {
      throw new Error("Não foi possível conectar ao servidor.");
    }
    throw error;
  }
);

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/login", credentials);
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error("Falha na autenticação");
    }
  },

  async signup(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(
        "/auth/signup",
        credentials
      );
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error("Falha no cadastro");
    }
  },

  async refreshToken(): Promise<string> {
    try {
      const response = await api.post<{ token: string }>("/auth/refresh-token");
      const { token } = response.data;
      await AsyncStorage.setItem("@ChefNow:token", token);
      return token;
    } catch (error) {
      throw new Error("Falha ao atualizar o token");
    }
  },
};
