import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiClient } from "./client";
import { API_ENDPOINTS, GAME_STATUS, QUERY_KEYS } from "../constants/game";
import type {
  BalanceResponse,
  GameHistoryItem,
  GameStateResponse,
  HistoryResponse,
} from "../types";
import { HISTORY_OUTCOME } from "../constants";

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
      const finishedGames = data.games.filter(
        (game) => game.status !== GAME_STATUS.ACTIVE,
      );

      const uiData: GameHistoryItem[] = finishedGames.map((serverItem) => {
        const isWin = serverItem.status === GAME_STATUS.WON;

        return {
          id: serverItem.gameId,
          betAmount: serverItem.betAmount,
          outcome: isWin ? HISTORY_OUTCOME.WIN : HISTORY_OUTCOME.BUST,
          profit: serverItem.profit || serverItem.betAmount * -1,
          multiplier: serverItem.multiplier || undefined,
        };
      });
      return uiData;
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
