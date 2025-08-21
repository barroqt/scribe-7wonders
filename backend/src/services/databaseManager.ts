import { Player, Game } from '../types';
import { db as fileDb } from './database';
import { postgresDb } from './postgresDatabase';

class DatabaseManager {
  private isProduction: boolean;

  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
  }

  // Player methods
  async getAllPlayers(): Promise<Player[]> {
    if (this.isProduction) {
      try {
        return await postgresDb.getAllPlayers();
      } catch (error) {
        console.error('Error using PostgreSQL, falling back to file database:', error);
        return fileDb.getAllPlayers();
      }
    } else {
      return fileDb.getAllPlayers();
    }
  }

  async getPlayerById(id: string): Promise<Player | undefined> {
    if (this.isProduction) {
      try {
        return await postgresDb.getPlayerById(id);
      } catch (error) {
        console.error('Error using PostgreSQL, falling back to file database:', error);
        return fileDb.getPlayerById(id);
      }
    } else {
      return fileDb.getPlayerById(id);
    }
  }

  async createPlayer(player: Player): Promise<Player> {
    if (this.isProduction) {
      try {
        return await postgresDb.createPlayer(player);
      } catch (error) {
        console.error('Error using PostgreSQL, falling back to file database:', error);
        return fileDb.createPlayer(player);
      }
    } else {
      return fileDb.createPlayer(player);
    }
  }

  async deletePlayer(id: string): Promise<boolean> {
    if (this.isProduction) {
      try {
        return await postgresDb.deletePlayer(id);
      } catch (error) {
        console.error('Error using PostgreSQL, falling back to file database:', error);
        return fileDb.deletePlayer(id);
      }
    } else {
      return fileDb.deletePlayer(id);
    }
  }

  // Game methods
  async getAllGames(): Promise<Game[]> {
    if (this.isProduction) {
      try {
        return await postgresDb.getAllGames();
      } catch (error) {
        console.error('Error using PostgreSQL, falling back to file database:', error);
        return fileDb.getAllGames();
      }
    } else {
      return fileDb.getAllGames();
    }
  }

  async getGameById(id: string): Promise<Game | undefined> {
    if (this.isProduction) {
      try {
        return await postgresDb.getGameById(id);
      } catch (error) {
        console.error('Error using PostgreSQL, falling back to file database:', error);
        return fileDb.getGameById(id);
      }
    } else {
      return fileDb.getGameById(id);
    }
  }

  async createGame(game: Game): Promise<Game> {
    if (this.isProduction) {
      try {
        return await postgresDb.createGame(game);
      } catch (error) {
        console.error('Error using PostgreSQL, falling back to file database:', error);
        return fileDb.createGame(game);
      }
    } else {
      return fileDb.createGame(game);
    }
  }

  async deleteGame(id: string): Promise<boolean> {
    if (this.isProduction) {
      try {
        return await postgresDb.deleteGame(id);
      } catch (error) {
        console.error('Error using PostgreSQL, falling back to file database:', error);
        return fileDb.deleteGame(id);
      }
    } else {
      return fileDb.deleteGame(id);
    }
  }
}

export const db = new DatabaseManager();