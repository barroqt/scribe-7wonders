import { Pool, QueryResult } from 'pg';
import { Player, Game, GamePlayer } from '../types';

class PostgresDatabase {
  private pool: Pool | null = null;
  private isConnected: boolean = false;

  constructor() {
    // Only initialize the pool if we have a DATABASE_URL
    if (process.env.DATABASE_URL) {
      this.pool = new Pool({
        connectionString: process.env.DATABASE_URL,
      });
      
      // Initialize database tables
      this.initializeDatabase();
    }
  }

  private async initializeDatabase(): Promise<void> {
    // Don't try to initialize if we don't have a pool
    if (!this.pool) {
      console.log('No database URL provided, skipping database initialization');
      return;
    }
    
    try {
      await this.pool.query(`
        CREATE TABLE IF NOT EXISTS players (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          created_at TIMESTAMP NOT NULL
        )
      `);
      
      await this.pool.query(`
        CREATE TABLE IF NOT EXISTS games (
          id VARCHAR(255) PRIMARY KEY,
          players JSONB NOT NULL,
          created_at TIMESTAMP NOT NULL
        )
      `);
      
      this.isConnected = true;
      console.log('Database tables initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  // Player methods
  async getAllPlayers(): Promise<Player[]> {
    if (!this.pool || !this.isConnected) {
      throw new Error('Database not connected');
    }
    
    try {
      const result: QueryResult = await this.pool.query('SELECT * FROM players ORDER BY created_at DESC');
      return result.rows.map(row => ({
        id: row.id,
        name: row.name,
        createdAt: new Date(row.created_at)
      }));
    } catch (error) {
      console.error('Error getting all players:', error);
      return [];
    }
  }

  async getPlayerById(id: string): Promise<Player | undefined> {
    if (!this.pool || !this.isConnected) {
      throw new Error('Database not connected');
    }
    
    try {
      const result: QueryResult = await this.pool.query('SELECT * FROM players WHERE id = $1', [id]);
      if (result.rows.length === 0) return undefined;
      
      const row = result.rows[0];
      return {
        id: row.id,
        name: row.name,
        createdAt: new Date(row.created_at)
      };
    } catch (error) {
      console.error(`Error getting player by id ${id}:`, error);
      return undefined;
    }
  }

  async createPlayer(player: Player): Promise<Player> {
    if (!this.pool || !this.isConnected) {
      throw new Error('Database not connected');
    }
    
    try {
      await this.pool.query(
        'INSERT INTO players (id, name, created_at) VALUES ($1, $2, $3)',
        [player.id, player.name, player.createdAt]
      );
      return player;
    } catch (error) {
      console.error('Error creating player:', error);
      throw error;
    }
  }

  async deletePlayer(id: string): Promise<boolean> {
    if (!this.pool || !this.isConnected) {
      throw new Error('Database not connected');
    }
    
    try {
      const result: QueryResult = await this.pool.query('DELETE FROM players WHERE id = $1', [id]);
      return result.rowCount !== null && result.rowCount > 0;
    } catch (error) {
      console.error(`Error deleting player with id ${id}:`, error);
      return false;
    }
  }

  // Game methods
  async getAllGames(): Promise<Game[]> {
    if (!this.pool || !this.isConnected) {
      throw new Error('Database not connected');
    }
    
    try {
      const result: QueryResult = await this.pool.query('SELECT * FROM games ORDER BY created_at DESC');
      return result.rows.map(row => ({
        id: row.id,
        players: row.players,
        createdAt: new Date(row.created_at)
      }));
    } catch (error) {
      console.error('Error getting all games:', error);
      return [];
    }
  }

  async getGameById(id: string): Promise<Game | undefined> {
    if (!this.pool || !this.isConnected) {
      throw new Error('Database not connected');
    }
    
    try {
      const result: QueryResult = await this.pool.query('SELECT * FROM games WHERE id = $1', [id]);
      if (result.rows.length === 0) return undefined;
      
      const row = result.rows[0];
      return {
        id: row.id,
        players: row.players,
        createdAt: new Date(row.created_at)
      };
    } catch (error) {
      console.error(`Error getting game by id ${id}:`, error);
      return undefined;
    }
  }

  async createGame(game: Game): Promise<Game> {
    if (!this.pool || !this.isConnected) {
      throw new Error('Database not connected');
    }
    
    try {
      await this.pool.query(
        'INSERT INTO games (id, players, created_at) VALUES ($1, $2, $3)',
        [game.id, JSON.stringify(game.players), game.createdAt]
      );
      return game;
    } catch (error) {
      console.error('Error creating game:', error);
      throw error;
    }
  }

  async deleteGame(id: string): Promise<boolean> {
    if (!this.pool || !this.isConnected) {
      throw new Error('Database not connected');
    }
    
    try {
      const result: QueryResult = await this.pool.query('DELETE FROM games WHERE id = $1', [id]);
      return result.rowCount !== null && result.rowCount > 0;
    } catch (error) {
      console.error(`Error deleting game with id ${id}:`, error);
      return false;
    }
  }
}

export const postgresDb = new PostgresDatabase();