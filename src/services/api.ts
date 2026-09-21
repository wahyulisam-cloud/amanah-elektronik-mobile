import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const LOCAL_IP = "192.168.1.10";

const API_URL =
  Platform.OS === "web"
    ? "http://127.0.0.1:8000/api"
    : `http://${LOCAL_IP}:8000/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("pelanggan_token");

    console.log("===== API REQUEST =====");
    console.log("PLATFORM:", Platform.OS);
    console.log("BASE URL:", API_URL);
    console.log("URL:", config.url);
    console.log("TOKEN ADA:", !!token);
    console.log("=======================");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;