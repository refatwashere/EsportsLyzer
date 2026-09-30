'use client';

import FavoriteButton from './FavoriteButton';

export default function FavoritesList({
  favorites,
  loading,
  onSelect,
  onToggle,
  isFavorite,
}) {
  if (loading) {
    return (
      <div className="mb-6 text-sm text-gray-500">Loading favorites...</div>
    );
  }

  if (!favorites || favorites.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
        <span>★</span> Your Favorites
      </h3>
      <div className="flex flex-wrap gap-2">
        {favorites.map((f) => (
          <div
            key={`${f.sport}-${f.match_id}`}
            className="flex items-center gap-2 bg-gray-900 border border-yellow-500/30 rounded-lg px-3 py-1.5"
          >
            <button
              onClick={() => onSelect(f)}
              className="text-sm hover:text-white text-gray-200"
            >
              <span className="text-xs text-gray-500 uppercase mr-1">
                {f.sport}
              </span>
              {f.home_team} vs {f.away_team}
            </button>
            <FavoriteButton
              isFav={true}
              onToggle={() =>
                onToggle({
                  id: f.match_id,
                  sport: f.sport,
                  teams: [
                    { name: f.home_team },
                    { name: f.away_team },
                  ],
                })
              }
              size="sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
