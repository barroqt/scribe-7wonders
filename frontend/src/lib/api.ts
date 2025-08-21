import axios from "axios";
import {
  Player,
  Wonder,
  Game,
  PlayerStats,
  WonderStats,
  GameHistory,
  CreatePlayerRequest,
  CreateGameRequest,
} from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL + "/api"
  : "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Players
export const playersApi = {
  getAll: () => api.get<Player[]>("/players"),
  create: (data: CreatePlayerRequest) => api.post<Player>("/players", data),
  delete: (id: string) => api.delete(`/players/${id}`),
};

// Wonders
export const wondersApi = {
  getAll: () => api.get<Wonder[]>("/wonders"),
};

// Games
export const gamesApi = {
  getAll: () => api.get<Game[]>("/games"),
  create: (data: CreateGameRequest) => api.post<Game>("/games", data),
  delete: (id: string) => api.delete(`/games/${id}`),
  getHistory: () => api.get<GameHistory[]>("/games/history"),
};

// Stats
export const statsApi = {
  getPlayerStats: () => api.get<PlayerStats[]>("/stats/players"),
  getWonderStats: () => api.get<WonderStats[]>("/stats/wonders"),
};
