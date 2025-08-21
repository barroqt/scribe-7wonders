import React, { useState } from "react";
import { Plus, Trash2, Users } from "lucide-react";
import { usePlayers, useCreatePlayer, useDeletePlayer } from "@/hooks/useApi";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

const Players: React.FC = () => {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const { data: players, isLoading, error } = usePlayers();
  const createPlayerMutation = useCreatePlayer();
  const deletePlayerMutation = useDeletePlayer();

  const handleAddPlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayerName.trim()) return;

    try {
      await createPlayerMutation.mutateAsync({ name: newPlayerName.trim() });
      setNewPlayerName("");
      setIsAdding(false);
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to add player");
    }
  };

  const handleDeletePlayer = async (playerId: string, playerName: string) => {
    if (
      !confirm(
        `Are you sure you want to delete ${playerName}? This action cannot be undone if they haven't played any games.`
      )
    ) {
      return;
    }

    try {
      await deletePlayerMutation.mutateAsync(playerId);
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to delete player");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-ancient-cream">Loading players...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-ancient-red text-center">
        Failed to load players. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="h-6 w-6 text-ancient-gold" />
          <h1 className="text-2xl font-bold text-ancient-cream font-serif">
            Players Management
          </h1>
        </div>
        <Button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Player</span>
        </Button>
      </div>

      {isAdding && (
        <Card>
          <form onSubmit={handleAddPlayer} className="space-y-4">
            <Input
              label="Player Name"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Enter player name"
              disabled={createPlayerMutation.isLoading}
              autoFocus
            />
            <div className="flex space-x-2">
              <Button
                type="submit"
                disabled={
                  !newPlayerName.trim() || createPlayerMutation.isLoading
                }
              >
                {createPlayerMutation.isLoading ? "Adding..." : "Add Player"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setIsAdding(false);
                  setNewPlayerName("");
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {players?.map((player) => (
          <Card key={player.id} hover>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-ancient-cream">
                  {player.name}
                </h3>
                <p className="text-sm text-gray-400">
                  Added: {new Date(player.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDeletePlayer(player.id, player.name)}
                disabled={deletePlayerMutation.isLoading}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {players?.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-ancient-cream mb-2">
            No players yet
          </h3>
          <p className="text-gray-400 mb-4">
            Add your first player to get started with tracking games.
          </p>
        </div>
      )}
    </div>
  );
};

export default Players;
