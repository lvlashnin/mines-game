import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./client";
import { API_ENDPOINTS } from "../constants/game";
import { QUERY_KEYS, GAME_STATUS } from "../constants/game";
import type {
  CreateGameRequest,
  CreateGameResponse,
  RevealRequest,
  RevealResponse,
  CashoutResponse,
  GameStateResponse,
} from "../types";

export const useCreateGameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createGame"],
    mutationFn: async (payload: CreateGameRequest) => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      const { data } = await apiClient.post<CreateGameResponse>(
        API_ENDPOINTS.GAMES,
        payload,
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.activeGame, data);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.balance });
    },
  });
};

export const useRevealCellMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["revealCell"],
    mutationFn: async ({
      gameId,
      row,
      col,
    }: RevealRequest & { gameId: string }) => {
      const { data } = await apiClient.post<RevealResponse>(
        `${API_ENDPOINTS.GAMES}/${gameId}/reveal`,
        { row, col },
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<GameStateResponse | undefined>(
        QUERY_KEYS.activeGame,
        (oldState) => {
          if (!oldState) return undefined;
          return {
            ...oldState,
            ...data,
          };
        },
      );
      if (data.status === GAME_STATUS.LOST) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.balance });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.history });
      }
    },
  });
};

export const useCashOutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cashOut"],
    mutationFn: async ({ gameId }: { gameId: string }) => {
      const { data } = await apiClient.post<CashoutResponse>(
        `${API_ENDPOINTS.GAMES}/${gameId}/cashout`,
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<GameStateResponse | undefined>(
        QUERY_KEYS.activeGame,
        (oldState) => {
          if (!oldState) return undefined;
          return {
            ...oldState,
            ...data,
          };
        },
      );

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.balance });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.history });
    },
  });
};

export const useResetGame = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.setQueryData(QUERY_KEYS.activeGame, null);
  };
};
