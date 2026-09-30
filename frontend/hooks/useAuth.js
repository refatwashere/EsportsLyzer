'use client';

import { useState, useEffect } from 'react';
import { getSupabaseClient, supabaseConfigured } from '../lib/supabaseClient';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const client = getSupabaseClient();
    if (!client) {
      setLoading(false);
      return undefined;
    }

    client.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data: listener } = client.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const ensureConfigured = () => {
    if (!supabaseConfigured) {
      throw new Error('Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to frontend/.env.local.');
    }
  };

  const signUp = async (email, password) => {
    ensureConfigured();
    const client = getSupabaseClient();
    const { error } = await client.auth.signUp({ email, password });
    if (error) throw error;
  };

  const signIn = async (email, password) => {
    ensureConfigured();
    const client = getSupabaseClient();
    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    ensureConfigured();
    const client = getSupabaseClient();
    await client.auth.signOut();
  };

  return { user, loading, configured: supabaseConfigured, signUp, signIn, signOut };
}
