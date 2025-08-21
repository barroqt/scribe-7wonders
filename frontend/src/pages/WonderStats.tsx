import React from "react";
import { Crown, Trophy, Target } from "lucide-react";
import { useWonderStats } from "@/hooks/useApi";
import Card from "@/components/ui/Card";

const WonderStats: React.FC = () => {
  const { data: wonderStats, isLoading, error } = useWonderStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-ancient-cream">Loading wonder statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-ancient-red text-center">
        Failed to load wonder statistics. Please try again.
      </div>
    );
  }

  if (!wonderStats || wonderStats.length === 0) {
    return (
      <div className="text-center py-12">
        <Crown className="h-16 w-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-ancient-cream mb-2">
          No statistics available
        </h3>
        <p className="text-gray-400">
          Play some games to see wonder statistics.
        </p>
      </div>
    );
  }

  // Sort wonders by win rate, then by total games
  const sortedStats = [...wonderStats].sort((a, b) => {
    if (b.winRate !== a.winRate) return b.winRate - a.winRate;
    return b.totalGames - a.totalGames;
  });

  const getWonderRank = (index: number) => {
    switch (index) {
      case 0:
        return { icon: Trophy, color: "text-ancient-gold", label: "1st" };
      case 1:
        return { icon: Target, color: "text-gray-300", label: "2nd" };
      case 2:
        return { icon: Target, color: "text-ancient-red", label: "3rd" };
      default:
        return { icon: Crown, color: "text-gray-400", label: `${index + 1}th` };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Crown className="h-6 w-6 text-ancient-gold" />
        <h1 className="text-2xl font-bold text-ancient-cream font-serif">
          Wonder Statistics
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedStats.map((stats, index) => {
          const rank = getWonderRank(index);
          const IconComponent = rank.icon;

          return (
            <Card key={stats.wonderName} hover>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <IconComponent className={`h-5 w-5 ${rank.color}`} />
                    <div className="text-sm font-semibold text-gray-400">
                      {rank.label}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-ancient-gold">
                      {stats.winRate.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-400">Win Rate</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-ancient-cream leading-tight">
                    {stats.wonderDisplayName}
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-ancient-cream">
                      {stats.totalGames}
                    </div>
                    <div className="text-xs text-gray-400">Games</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-ancient-cream">
                      {stats.wins}
                    </div>
                    <div className="text-xs text-gray-400">Wins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-ancient-cream">
                      {stats.averageScore.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-400">Avg Score</div>
                  </div>
                </div>

                {/* Win rate progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Performance</span>
                    <span>{stats.winRate.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-ancient-gold to-ancient-cream h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(stats.winRate, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="text-sm text-gray-400 space-y-1">
        <p>• Wonders are ranked by win rate across all players</p>
        <p>• Only wonders that have been played appear in statistics</p>
        <p>• Win rate is calculated independently of who played the wonder</p>
      </div>
    </div>
  );
};

export default WonderStats;
