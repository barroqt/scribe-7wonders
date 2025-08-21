#!/usr/bin/env node

/**
 * Supabase Connection Test Script
 * 
 * This script tests the connection to the Supabase database
 * to ensure the backend can communicate with it properly.
 */

const fs = require('fs');
const path = require('path');

// Manual dotenv implementation to avoid caching issues
const envPath = path.resolve(__dirname, '..', '.env');
let envVars = {};

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  // Parse the .env content
  envContent.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...value] = line.split('=');
      envVars[key.trim()] = value.join('=').trim();
    }
  });
} catch (err) {
  console.error('Could not read .env file at', envPath);
  process.exit(1);
}

console.log('🔍 Testing Supabase connection...');
console.log('🔗 Supabase URL:', envVars.SUPABASE_URL);

// Validate environment variables
if (!envVars.SUPABASE_URL || !envVars.SUPABASE_KEY) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please ensure SUPABASE_URL and SUPABASE_KEY are set in your .env file');
  process.exit(1);
}

// Check if the URL format is correct
if (envVars.SUPABASE_URL.startsWith('postgresql://')) {
  console.error('❌ Invalid Supabase URL format');
  console.error('The SUPABASE_URL should be the REST API URL, not the PostgreSQL connection string');
  console.error('Example: https://your-project.supabase.co');
  process.exit(1);
}

// Test the Supabase connection
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(envVars.SUPABASE_URL, envVars.SUPABASE_KEY);

async function testConnection() {
  try {
    // Test 1: Check if we can connect and fetch players
    console.log('\nTest 1: Fetching players...');
    const { data: playersData, error: playersError } = await supabase
      .from('players')
      .select('id')
      .limit(1);

    if (playersError) {
      console.error('❌ Error fetching players:', playersError.message);
      return false;
    } else {
      console.log('✅ Successfully connected to players table');
    }

    // Test 2: Check if we can fetch games
    console.log('\nTest 2: Fetching games...');
    const { data: gamesData, error: gamesError } = await supabase
      .from('games')
      .select('id')
      .limit(1);

    if (gamesError) {
      console.error('❌ Error fetching games:', gamesError.message);
      return false;
    } else {
      console.log('✅ Successfully connected to games table');
    }

    // Test 3: Check if we can fetch game_players
    console.log('\nTest 3: Fetching game players...');
    const { data: gamePlayersData, error: gamePlayersError } = await supabase
      .from('game_players')
      .select('id')
      .limit(1);

    if (gamePlayersError) {
      console.error('❌ Error fetching game players:', gamePlayersError.message);
      return false;
    } else {
      console.log('✅ Successfully connected to game_players table');
    }

    console.log('\n🎉 All Supabase connection tests passed!');
    console.log('✅ Database connection is functional');
    return true;
  } catch (err) {
    console.error('❌ Unexpected error during Supabase connection test:', err.message);
    return false;
  }
}

// Run the test
testConnection().then(success => {
  if (!success) {
    process.exit(1);
  }
});