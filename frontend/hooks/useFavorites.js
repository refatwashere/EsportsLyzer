'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './useAuth';

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setFavorites(data || []);
    } catch (err) {
      console.error('Favorites fetch error:', err.message);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const isFavorite = (sport, matchId) => {
    return favorites.some(
      (f) => f.sport === sport && String(f.match_id) === String(matchId)
    );
  };

  const toggleFavorite = async (match) => {
    if (!user) {
      alert('Sign in to save favorites ✨');
      return;
    }

    const sport = match.sport || 'esports';
    const matchId = String(match.id || match.match_id);
    const already = isFavorite(sport, matchId);

    try {
      if (already) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('sport', sport)
          .eq('match_id', matchId);
        if (error) throw error;
      } else {
        const home =
          match.teams?.[0]?.name ||
          match.home_team ||
          match.homeTeam ||
          'Team 1';
        const away =
          match.teams?.[1]?.name ||
          match.away_team ||
          match.awayTeam ||
          'Team 2';

        const { error } = await supabase.from('favorites').upsert(
          {
            user_id: user.id,
            sport,
            match_id: matchId,
            home_team: home,
            away_team: away,
          },
          { onConflict: 'user_id,sport,match_id' }
        );
        if (error) throw error;
      }
      await refresh();
    } catch (err) {
      console.error('Toggle favorite error:', err.message);
      alert('Could not update favorite. Check Supabase setup.');
    }
  };

  return {
    favorites,
    loading,
    isFavorite,
    toggleFavorite,
    refresh,
  };
}
