import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiClient } from "./client";
import { API_ENDPOINTS, QUERY_KEYS } from "../constants/game";
import type {
  BalanceResponse,
  GameStateResponse,
  HistoryResponse,
} from "../types";

export const useBalanceQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.balance,
    queryFn: async () => {
      const { data } = await apiClient.get<BalanceResponse>(
        API_ENDPOINTS.BALANCE,
      );
      return data;
    },
  });
};

export const useHistoryQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.history,
    queryFn: async () => {
      const { data } = await apiClient.get<HistoryResponse>(
        API_ENDPOINTS.HISTORY,
      );
      return data;
    },
  });
};

export const useActiveGameQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.activeGame,
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<GameStateResponse>(
          API_ENDPOINTS.ACTIVE_GAME,
        );
        return data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
    refetchOnWindowFocus: false,
  });
};
