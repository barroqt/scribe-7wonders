import React from "react";
import { History, Trash2, Trophy, Medal, Award } from "lucide-react";
import { useGameHistory, useDeleteGame } from "@/hooks/useApi";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const GameHistory: React.FC = () => {
  const { data: gameHistory, isLoading, error } = useGameHistory();
  const deleteGameMutation = useDeleteGame();

  const handleDeleteGame = async (gameId: string, gameDate: string) => {
    if (
      !confirm(
        `Are you sure you want to delete the game from ${gameDate}? This will recalculate all statistics.`
      )
    ) {
      return;
    }

    try {
      await deleteGameMutation.mutateAsync(gameId);
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to delete game");
    }
  };

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-5 w-5 text-ancient-gold" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-300" />;
      case 3:
        return <Award className="h-5 w-5 text-ancient-red" />;
      default:
        return (
          <div className="h-5 w-5 flex items-center justify-center text-gray-400 font-bold">
            {position}
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-ancient-cream">Loading game history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-ancient-red text-center">
        Failed to load game history. Please try again.
      </div>
    );
  }

  if (!gameHistory || gameHistory.length === 0) {
    return (
      <div className="text-center py-12">
        <History className="h-16 w-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-ancient-cream mb-2">
          No games played yet
        </h3>
        <p className="text-gray-400">
          Start playing games to see the history here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <History className="h-6 w-6 text-ancient-gold" />
        <h1 className="text-2xl font-bold text-ancient-cream font-serif">
          Game History
        </h1>
      </div>

      <div className="space-y-4">
        {gameHistory.map((game) => (
          <Card key={game.id} hover>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-ancient-cream">
                    Game #{game.id.slice(-8)}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {new Date(game.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() =>
                    handleDeleteGame(
                      game.id,
                      new Date(game.createdAt).toLocaleDateString()
                    )
                  }
                  disabled={deleteGameMutation.isLoading}
                  title="Delete this game"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {game.players.map((player) => (
                  <div
                    key={`${player.playerId}-${player.wonderName}`}
                    className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {getPositionIcon(player.position)}
                      <div>
                        <div className="font-semibold text-ancient-cream">
                          {player.playerName}
                        </div>
                        <div className="text-sm text-gray-400">
                          {player.wonderDisplayName}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-ancient-gold">
                        {player.score}
                      </div>
                      <div className="text-xs text-gray-400">
                        {player.position === 1
                          ? "Winner"
                          : `${player.position}${
                              player.position === 2
                                ? "nd"
                                : player.position === 3
                                ? "rd"
                                : "th"
                            } place`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-xs text-gray-500 pt-2 border-t border-gray-600">
                Players: {game.players.length} • Winner:{" "}
                {game.players.find((p) => p.position === 1)?.playerName} •
                Highest Score: {Math.max(...game.players.map((p) => p.score))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-sm text-gray-400 space-y-1">
        <p>• Games are sorted by date (newest first)</p>
        <p>• Deleting a game will recalculate all statistics</p>
        <p>• Players are ranked by their final scores</p>
      </div>
    </div>
  );
};

export default GameHistory;
