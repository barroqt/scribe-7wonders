import { useQuery, useMutation, useQueryClient } from "react-query";
import { playersApi, wondersApi, gamesApi, statsApi } from "@/lib/api";
import { CreatePlayerRequest, CreateGameRequest } from "@/types";

// Players
export const usePlayers = () => {
  return useQuery("players", () => playersApi.getAll().then((res) => res.data));
};

export const useCreatePlayer = () => {
  const queryClient = useQueryClient();
  return useMutation((data: CreatePlayerRequest) => playersApi.create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("players");
    },
  });
};

export const useDeletePlayer = () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => playersApi.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("players");
      queryClient.invalidateQueries("playerStats");
    },
  });
};

// Wonders
export const useWonders = () => {
  return useQuery("wonders", () => wondersApi.getAll().then((res) => res.data));
};

// Games
export const useGames = () => {
  return useQuery("games", () => gamesApi.getAll().then((res) => res.data));
};

export const useCreateGame = () => {
  const queryClient = useQueryClient();
  return useMutation((data: CreateGameRequest) => gamesApi.create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("games");
      queryClient.invalidateQueries("gameHistory");
      queryClient.invalidateQueries("playerStats");
      queryClient.invalidateQueries("wonderStats");
    },
  });
};

export const useDeleteGame = () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => gamesApi.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("games");
      queryClient.invalidateQueries("gameHistory");
      queryClient.invalidateQueries("playerStats");
      queryClient.invalidateQueries("wonderStats");
    },
  });
};

export const useGameHistory = () => {
  return useQuery("gameHistory", () =>
    gamesApi.getHistory().then((res) => res.data)
  );
};

// Stats
export const usePlayerStats = () => {
  return useQuery("playerStats", () =>
    statsApi.getPlayerStats().then((res) => res.data)
  );
};

export const useWonderStats = () => {
  return useQuery("wonderStats", () =>
    statsApi.getWonderStats().then((res) => res.data)
  );
};
