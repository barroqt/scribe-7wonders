import React, { useState } from "react";
import { Gamepad2, Plus, Trash2 } from "lucide-react";
import { usePlayers, useWonders, useCreateGame } from "@/hooks/useApi";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import { CreateGameRequest } from "@/types";

interface GamePlayerForm {
  playerId: string;
  wonderName: string;
  score: string;
}

const AddGame: React.FC = () => {
  const [gamePlayers, setGamePlayers] = useState<GamePlayerForm[]>([
    { playerId: "", wonderName: "", score: "" },
    { playerId: "", wonderName: "", score: "" },
    { playerId: "", wonderName: "", score: "" },
  ]);

  const { data: players } = usePlayers();
  const { data: wonders } = useWonders();
  const createGameMutation = useCreateGame();

  const addPlayer = () => {
    if (gamePlayers.length < 7) {
      setGamePlayers([
        ...gamePlayers,
        { playerId: "", wonderName: "", score: "" },
      ]);
    }
  };

  const removePlayer = (index: number) => {
    if (gamePlayers.length > 3) {
      setGamePlayers(gamePlayers.filter((_, i) => i !== index));
    }
  };

  const updatePlayer = (
    index: number,
    field: keyof GamePlayerForm,
    value: string
  ) => {
    const updated = [...gamePlayers];
    updated[index][field] = value;
    setGamePlayers(updated);
  };

  const getUsedPlayerIds = () => {
    return gamePlayers.map((p) => p.playerId).filter(Boolean);
  };

  const getUsedWonders = () => {
    return gamePlayers.map((p) => p.wonderName).filter(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const validPlayers = gamePlayers.filter(
      (p) => p.playerId && p.wonderName && p.score
    );

    if (validPlayers.length < 3) {
      alert("A game must have at least 3 players");
      return;
    }

    // Check for duplicates
    const playerIds = validPlayers.map((p) => p.playerId);
    const wonderNames = validPlayers.map((p) => p.wonderName);

    if (new Set(playerIds).size !== playerIds.length) {
      alert("Each player can only play once per game");
      return;
    }

    if (new Set(wonderNames).size !== wonderNames.length) {
      alert("Each wonder can only be played once per game");
      return;
    }

    const gameData: CreateGameRequest = {
      players: validPlayers.map((p) => ({
        playerId: p.playerId,
        wonderName: p.wonderName,
        score: parseInt(p.score),
      })),
    };

    try {
      await createGameMutation.mutateAsync(gameData);
      // Reset form
      setGamePlayers([
        { playerId: "", wonderName: "", score: "" },
        { playerId: "", wonderName: "", score: "" },
        { playerId: "", wonderName: "", score: "" },
      ]);
      alert("Game added successfully!");
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to add game");
    }
  };

  if (!players || !wonders) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-ancient-cream">Loading...</div>
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div className="text-center py-12">
        <Gamepad2 className="h-16 w-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-ancient-cream mb-2">
          No players available
        </h3>
        <p className="text-gray-400">
          Please add some players before creating a game.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Gamepad2 className="h-6 w-6 text-ancient-gold" />
        <h1 className="text-2xl font-bold text-ancient-cream font-serif">
          Add Game
        </h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {gamePlayers.map((player, index) => (
              <div
                key={index}
                className="border border-gray-600 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-ancient-cream">
                    Player {index + 1}
                  </h3>
                  {gamePlayers.length > 3 && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removePlayer(index)}
                      type="button"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select
                    label="Player"
                    value={player.playerId}
                    onChange={(e) =>
                      updatePlayer(index, "playerId", e.target.value)
                    }
                    placeholder="Select player"
                  >
                    {players
                      .filter(
                        (p) =>
                          !getUsedPlayerIds().includes(p.id) ||
                          p.id === player.playerId
                      )
                      .map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                  </Select>

                  <Select
                    label="Wonder"
                    value={player.wonderName}
                    onChange={(e) =>
                      updatePlayer(index, "wonderName", e.target.value)
                    }
                    placeholder="Select wonder"
                  >
                    {wonders
                      .filter(
                        (w) =>
                          !getUsedWonders().includes(w.name) ||
                          w.name === player.wonderName
                      )
                      .map((w) => (
                        <option key={w.name} value={w.name}>
                          {w.displayName}
                        </option>
                      ))}
                  </Select>

                  <Input
                    label="Score"
                    type="number"
                    min="0"
                    max="200"
                    value={player.score}
                    onChange={(e) =>
                      updatePlayer(index, "score", e.target.value)
                    }
                    placeholder="Final score"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={addPlayer}
              disabled={gamePlayers.length >= 7}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Player ({gamePlayers.length}/7)
            </Button>

            <Button
              type="submit"
              disabled={createGameMutation.isLoading}
              className="min-w-[120px]"
            >
              {createGameMutation.isLoading ? "Adding..." : "Add Game"}
            </Button>
          </div>
        </form>
      </Card>

      <div className="text-sm text-gray-400 space-y-1">
        <p>• A game requires between 3 and 7 players</p>
        <p>• Each player must use a different wonder</p>
        <p>• Scores should be between 0 and 200</p>
      </div>
    </div>
  );
};

export default AddGame;
