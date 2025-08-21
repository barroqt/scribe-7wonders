import { Router, Request, Response } from "express";
import { db } from "../services/database";
import { statsService } from "../services/statsService";
import { createPlayerSchema, createGameSchema } from "../validation/schema";
import { WONDERS } from "../data/wonders";
import { CreatePlayerRequest, CreateGameRequest, Player, Game } from "../types";
import { v4 as uuidv4 } from "uuid";

const router = Router();

// Health check
router.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Get all wonders
router.get("/wonders", (req: Request, res: Response) => {
  res.json(WONDERS);
});

// Player routes
router.get("/players", (req: Request, res: Response) => {
  try {
    const players = db.getAllPlayers();
    res.json(players);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch players" });
  }
});

router.post("/players", (req: Request, res: Response) => {
  try {
    const validatedData = createPlayerSchema.parse(
      req.body
    ) as CreatePlayerRequest;

    // Check if player name already exists
    const existingPlayers = db.getAllPlayers();
    const existingPlayer = existingPlayers.find(
      (p) => p.name.toLowerCase() === validatedData.name.toLowerCase()
    );

    if (existingPlayer) {
      return res.status(400).json({ error: "Player name already exists" });
    }

    const newPlayer: Player = {
      id: uuidv4(),
      name: validatedData.name,
      createdAt: new Date(),
    };

    const createdPlayer = db.createPlayer(newPlayer);
    res.status(201).json(createdPlayer);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Invalid input" });
  }
});

router.delete("/players/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = db.deletePlayer(id);
    if (!deleted) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete player" });
  }
});

// Game routes
router.get("/games", (req: Request, res: Response) => {
  try {
    const games = db.getAllGames();
    res.json(games);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch games" });
  }
});

router.post("/games", (req: Request, res: Response) => {
  try {
    const validatedData = createGameSchema.parse(req.body) as CreateGameRequest;

    // Validate that all player IDs exist
    const players = db.getAllPlayers();
    const playerIds = players.map((p) => p.id);

    for (const gamePlayer of validatedData.players) {
      if (!playerIds.includes(gamePlayer.playerId)) {
        return res.status(400).json({
          error: `Player with ID ${gamePlayer.playerId} does not exist`,
        });
      }
    }

    const newGame: Game = {
      id: uuidv4(),
      players: validatedData.players.map(p => ({
        playerId: p.playerId,
        wonderName: p.wonderName,
        score: p.score
      })),
      createdAt: new Date(),
    };

    const createdGame = db.createGame(newGame);
    res.status(201).json(createdGame);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Invalid input" });
  }
});

router.delete("/games/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = db.deleteGame(id);
    if (!deleted) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete game" });
  }
});

// Stats routes
router.get("/stats/players", async (req: Request, res: Response) => {
  try {
    const stats = await statsService.calculatePlayerStats();
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to calculate player stats" });
  }
});

router.get("/stats/wonders", async (req: Request, res: Response) => {
  try {
    const stats = await statsService.calculateWonderStats();
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to calculate wonder stats" });
  }
});

router.get("/games/history", async (req: Request, res: Response) => {
  try {
    const history = await statsService.getGameHistory();
    res.json(history);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to get game history" });
  }
});

export default router;
