'use client';

import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function AuthPanel() {
  const { user, loading, configured, signUp, signIn, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('signin'); // signin | signup
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  if (loading) return null;

  if (!configured) {
    return (
      <div className="bg-amber-900/20 border border-amber-700/60 rounded-xl p-4 mb-6 text-sm text-amber-200">
        Supabase is not configured yet. Add the project URL and anon key to frontend/.env.local to enable sign-in and favorites.
      </div>
    );
  }

  if (user) {
    return (
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 flex items-center justify-between">
        <span className="text-sm text-gray-300">
          Signed in as <strong className="text-white">{user.email}</strong>
        </span>
        <button
          onClick={signOut}
          className="text-sm bg-red-600/80 hover:bg-red-500 px-3 py-1.5 rounded-lg"
        >
          Sign Out
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');
    try {
      if (mode === 'signup') {
        await signUp(email, password);
        setMsg('Check your email for confirmation link ✨');
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 mb-6">
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setMode('signin')}
          className={`px-3 py-1 rounded ${mode === 'signin' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}
        >
          Sign In
        </button>
        <button
          onClick={() => setMode('signup')}
          className={`px-3 py-1 rounded ${mode === 'signup' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm flex-1 min-w-[180px]"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm flex-1 min-w-[140px]"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"
        >
          {mode === 'signin' ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      {msg && <p className="text-green-400 text-sm mt-2">{msg}</p>}
      <p className="text-xs text-gray-500 mt-2">
        Requires Supabase keys in .env.local (see .env.example)
      </p>
    </div>
  );
}
