'use client';

import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import FootballMomentumChart from '../components/charts/FootballMomentumChart';
import TennisMomentumChart from '../components/charts/TennisMomentumChart';
import HighlightFeed from '../components/panels/HighlightFeed';
import RoundTimeline from '../components/panels/RoundTimeline';
import PlayerCards from '../components/panels/PlayerCards';
import TeamComparison from '../components/panels/TeamComparison';
import PossessionBar from '../components/panels/PossessionBar';
import SportStatsPanel from '../components/panels/SportStatsPanel';
import SportSelector from '../components/SportSelector';
import AuthPanel from '../components/AuthPanel';
import FavoritesList from '../components/FavoritesList';
import FavoriteButton from '../components/FavoriteButton';
import { useFavorites } from '../hooks/useFavorites';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export default function Home() {
  const [sport, setSport] = useState('esports');
  const [matchId, setMatchId] = useState('2396949');
  const [data, setData] = useState(null);
  const [latestMatches, setLatestMatches] = useState([]);
  const [latestMatchesLoading, setLatestMatchesLoading] = useState(false);
  const [latestMatchesError, setLatestMatchesError] = useState('');
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState(null);

  const { favorites, loading: favLoading, isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const s = io(SOCKET_URL, { transports: ['websocket'] });
    setSocket(s);

    s.on('connect', () => setConnected(true));
    s.on('disconnect', () => setConnected(false));
    s.on('matchUpdate', (update) => setData(update));
    s.on('error', (err) => console.error(err));

    return () => s.disconnect();
  }, []);

  // Load latest CS2 matches when on esports
  useEffect(() => {
    if (sport !== 'esports') return;
    let active = true;
    setLatestMatchesLoading(true);
    setLatestMatchesError('');
    fetch(`${BACKEND_URL}/api/matches/latest`)
      .then((response) => {
        if (!response.ok) throw new Error('Could not load recent CS2 results');
        return response.json();
      })
      .then((matches) => {
        if (active) setLatestMatches(Array.isArray(matches) ? matches : []);
      })
      .catch((error) => {
        if (active) setLatestMatchesError(error.message);
      })
      .finally(() => {
        if (active) setLatestMatchesLoading(false);
      });

    return () => {
      active = false;
    };
  }, [sport]);

  const subscribe = (id = matchId, s = sport) => {
    if (!socket || !id) return;
    socket.emit('subscribeMatch', { sport: s, id });
  };

  const extractId = (input) => {
    const match = input.match(/matches\/(\d+)/) || input.match(/event\/(\d+)/);
    return match ? match[1] : input.trim();
  };

  const handleSelectFavorite = (f) => {
    setSport(f.sport);
    setMatchId(String(f.match_id));
    subscribe(f.match_id, f.sport);
  };

  // Current match object for starring
  const currentMatchForFav = data?.matchData
    ? {
        id: data.matchData.id || matchId,
        sport: data.sport || sport,
        teams: data.matchData.teams,
      }
    : null;

  return (
    <main className="min-h-screen p-6 max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          EsportsLyzer 🔥
        </h1>
        <p className="text-gray-400 mt-1">
          CS2 results and player analytics • Football and tennis via Sofascore
        </p>
        <div className="flex items-center gap-2 mt-2 text-sm">
          <span className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400' : 'bg-red-500'}`} />
          {connected ? 'Connected' : 'Disconnected'}
        </div>
      </header>

      <AuthPanel />

      <SportSelector sport={sport} setSport={setSport} />

      {/* Favorites */}
      <FavoritesList
        favorites={favorites}
        loading={favLoading}
        onSelect={handleSelectFavorite}
        onToggle={toggleFavorite}
        isFavorite={isFavorite}
      />

      {/* Match picker */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <input
          type="text"
          placeholder={
            sport === 'esports'
              ? 'Paste CS2 match ID'
              : 'Paste Sofascore event ID'
          }
          value={matchId}
          onChange={(e) => setMatchId(extractId(e.target.value))}
          className="flex-1 min-w-[260px] bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => subscribe()}
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-lg transition"
        >
          Load Match
        </button>
        {currentMatchForFav && (
          <FavoriteButton
            isFav={isFavorite(currentMatchForFav.sport, currentMatchForFav.id)}
            onToggle={() => toggleFavorite(currentMatchForFav)}
          />
        )}
      </div>

      {/* Quick pick latest CS2 matches */}
      {sport === 'esports' && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">
            Recent CS2 Results
          </h3>
          {latestMatchesLoading && <p className="text-sm text-gray-500">Loading results...</p>}
          {latestMatchesError && <p className="text-sm text-red-400">{latestMatchesError}</p>}
          {!latestMatchesLoading && !latestMatchesError && latestMatches.length === 0 && (
            <p className="text-sm text-gray-500">No recent results available.</p>
          )}
          {latestMatches.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {latestMatches.slice(0, 10).map((m) => {
                const fav = isFavorite('esports', m.id);
                return (
                  <div
                    key={m.id}
                    className={`flex items-center gap-1 rounded-lg border px-2 py-1 ${
                      fav
                        ? 'border-yellow-500/40 bg-yellow-500/10'
                        : 'border-gray-700 bg-gray-800'
                    }`}
                  >
                    <button
                      onClick={() => {
                        setMatchId(String(m.id));
                        subscribe(m.id, 'esports');
                      }}
                      className="text-xs hover:text-white text-gray-200"
                    >
                      {m.teams?.[0]?.name} vs {m.teams?.[1]?.name}
                      {m.winner ? ` • ${m.winner}` : ''}
                    </button>
                    <FavoriteButton
                      isFav={fav}
                      onToggle={() =>
                        toggleFavorite({
                          id: m.id,
                          sport: 'esports',
                          teams: m.teams,
                        })
                      }
                      size="sm"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Dashboard */}
      {data ? (
        <div className="space-y-8">
          {/* Score header */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  {data.sport}
                </p>
                <h2 className="text-xl font-bold">
                  {data.matchData?.teams?.[0]?.name || 'Team 1'} vs{' '}
                  {data.matchData?.teams?.[1]?.name || 'Team 2'}
                </h2>
                {data.matchData?.event && (
                  <p className="text-sm text-gray-400">{data.matchData.event}</p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold">
                  {data.sport === 'esports' ? (
                    <span>
                      {data.matchData?.score?.team1 ?? 0} –{' '}
                      {data.matchData?.score?.team2 ?? 0}
                    </span>
                  ) : (
                    <span>
                      {data.matchData?.score?.home ?? 0} –{' '}
                      {data.matchData?.score?.away ?? 0}
                    </span>
                  )}
                </div>
                {currentMatchForFav && (
                  <FavoriteButton
                    isFav={isFavorite(
                      currentMatchForFav.sport,
                      currentMatchForFav.id
                    )}
                    onToggle={() => toggleFavorite(currentMatchForFav)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Esports-only deep panels */}
          {data.sport === 'esports' && data.prediction && (
            <>
              <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
                <h2 className="text-lg font-semibold mb-3">
                  Ranking-Based Win Estimate
                </h2>
                <div className="flex flex-wrap gap-8 text-2xl font-bold">
                  <span className="text-blue-400">
                    {data.prediction.series.team1Name}{' '}
                    {(data.prediction.series.team1Win * 100).toFixed(1)}%
                  </span>
                  <span className="text-red-400">
                    {data.prediction.series.team2Name}{' '}
                    {(data.prediction.series.team2Win * 100).toFixed(1)}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Source: {data.prediction.source}. No round-by-round history is provided.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <RoundTimeline
                    timeline={data.timeline || []}
                    teams={data.matchData?.teams}
                  />
                </div>
                <HighlightFeed highlights={data.highlights || []} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PlayerCards players={data.players || []} />
                <TeamComparison teams={data.teams || []} />
              </div>
            </>
          )}

          {/* Football rich view */}
          {data.sport === 'football' && (
            <div className="space-y-6">
              <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
                <FootballMomentumChart data={data.matchData?.graph} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PossessionBar
                  home={data.matchData?.possession?.home}
                  away={data.matchData?.possession?.away}
                  homeName={data.matchData?.teams?.[0]?.name}
                  awayName={data.matchData?.teams?.[1]?.name}
                />
                <SportStatsPanel
                  sport="football"
                  stats={data.matchData?.stats}
                />
              </div>

              <p className="text-xs text-gray-600 text-center">
                Sofascore data • realistic mock when live feed is blocked
              </p>
            </div>
          )}

          {/* Tennis rich view */}
          {data.sport === 'tennis' && (
            <div className="space-y-6">
              <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
                <TennisMomentumChart data={data.matchData?.graph} />
              </div>

              <SportStatsPanel
                sport="tennis"
                stats={data.matchData?.stats}
              />

              <p className="text-xs text-gray-600 text-center">
                Sofascore data • realistic mock when live feed is blocked
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          Choose a sport and match ID, then select <strong>Load Match</strong>.
        </div>
      )}
    </main>
  );
}
