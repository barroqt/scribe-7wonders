import React from "react";
import { TrendingUp, Trophy, Crown } from "lucide-react";
import { usePlayerStats } from "@/hooks/useApi";
import Card from "@/components/ui/Card";

const PlayerStats: React.FC = () => {
  const { data: playerStats, isLoading, error } = usePlayerStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-ancient-cream">Loading player statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-ancient-red text-center">
        Failed to load player statistics. Please try again.
      </div>
    );
  }

  if (!playerStats || playerStats.length === 0) {
    return (
      <div className="text-center py-12">
        <TrendingUp className="h-16 w-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-ancient-cream mb-2">
          No statistics available
        </h3>
        <p className="text-gray-400">
          Play some games to see player statistics.
        </p>
      </div>
    );
  }

  // Sort players by win rate, then by total games
  const sortedStats = [...playerStats].sort((a, b) => {
    if (b.winRate !== a.winRate) return b.winRate - a.winRate;
    return b.totalGames - a.totalGames;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <TrendingUp className="h-6 w-6 text-ancient-gold" />
        <h1 className="text-2xl font-bold text-ancient-cream font-serif">
          Player Statistics
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedStats.map((stats, index) => (
          <Card key={stats.playerId} hover>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {index === 0 && stats.totalGames > 0 && (
                    <Trophy className="h-5 w-5 text-ancient-gold" />
                  )}
                  <h3 className="text-xl font-bold text-ancient-cream">
                    {stats.playerName}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-ancient-gold">
                    {stats.winRate.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-400">Win Rate</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-ancient-cream">
                    {stats.totalGames}
                  </div>
                  <div className="text-sm text-gray-400">Games</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-ancient-cream">
                    {stats.wins}
                  </div>
                  <div className="text-sm text-gray-400">Wins</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-ancient-cream">
                    {stats.averageScore.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-400">Avg Score</div>
                </div>
              </div>

              {stats.wonderStats.length > 0 && (
                <div className="border-t border-gray-600 pt-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Crown className="h-4 w-4 text-ancient-gold" />
                    <h4 className="font-semibold text-ancient-cream">
                      Wonder Performance
                    </h4>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {stats.wonderStats
                      .sort((a, b) => b.winRate - a.winRate)
                      .map((wonder) => (
                        <div
                          key={wonder.wonderName}
                          className="flex items-center justify-between text-sm bg-gray-800 p-2 rounded"
                        >
                          <div className="flex-1">
                            <div className="text-ancient-cream font-medium">
                              {wonder.wonderDisplayName
                                .replace("The ", "")
                                .replace(" at Ephesus", "")
                                .replace(" of ", " of\n")}
                            </div>
                            <div className="text-gray-400 text-xs">
                              {wonder.gamesPlayed} games • {wonder.wins} wins
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-ancient-gold font-semibold">
                              {wonder.winRate.toFixed(0)}%
                            </div>
                            <div className="text-gray-400 text-xs">
                              {wonder.averageScore.toFixed(0)} avg
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="text-sm text-gray-400 space-y-1">
        <p>• Players are ranked by win rate, then by total games played</p>
        <p>• Wonder performance shows statistics for each wonder played</p>
      </div>
    </div>
  );
};

export default PlayerStats;
