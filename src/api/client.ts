import axios from "axios";
import { API_ENDPOINTS, UI_CONFIG, PLAYER_ID } from "../constants/game";

export const apiClient = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  timeout: UI_CONFIG.API_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  config.headers["X-Player-Id"] = PLAYER_ID;
  return config;
});
