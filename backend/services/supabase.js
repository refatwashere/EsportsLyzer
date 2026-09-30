/**
 * Supabase service (Auth + DB helpers)
 * Requires SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env
 * Frontend uses the anon key.
 */

const { createClient } = require('@supabase/supabase-js');

let supabase = null;

function getAdminClient() {
  if (supabase) return supabase;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.warn('Supabase env vars missing — auth features will be disabled');
    return null;
  }
  supabase = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
  return supabase;
}

async function getUserFavorites(userId) {
  const client = getAdminClient();
  if (!client) return [];
  const { data, error } = await client
    .from('favorites')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data || [];
}

async function addFavorite(userId, match) {
  const client = getAdminClient();
  if (!client) throw new Error('Supabase not configured');
  const { data, error } = await client
    .from('favorites')
    .upsert(
      {
        user_id: userId,
        sport: match.sport || 'esports',
        match_id: String(match.id),
        home_team: match.teams?.[0]?.name || match.homeTeam,
        away_team: match.teams?.[1]?.name || match.awayTeam
      },
      { onConflict: 'user_id,sport,match_id' }
    )
    .select();
  if (error) throw error;
  return data;
}

async function removeFavorite(userId, sport, matchId) {
  const client = getAdminClient();
  if (!client) throw new Error('Supabase not configured');
  const { error } = await client
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('sport', sport)
    .eq('match_id', String(matchId));
  if (error) throw error;
}

module.exports = {
  getAdminClient,
  getUserFavorites,
  addFavorite,
  removeFavorite
};
