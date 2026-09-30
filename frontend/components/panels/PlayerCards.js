export default function PlayerCards({ players }) {
  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
      <h3 className="font-semibold mb-4">Player Performance</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {players.length === 0 ? (
          <p className="text-gray-500 text-sm col-span-2">No player data</p>
        ) : (
          players.map((p, i) => (
            <div
              key={i}
              className="bg-gray-800/60 rounded-lg p-4 border border-gray-700"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold">{p.name}</h4>
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    p.team === players[0]?.team
                      ? 'bg-blue-500/20 text-blue-300'
                      : 'bg-red-500/20 text-red-300'
                  }`}
                >
                  {p.team}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-y-1 text-sm text-gray-300">
                <span>Rating</span>
                <span className="text-right font-medium text-white">
                  {p.rating?.toFixed(2)}
                </span>
                <span>K/D</span>
                <span className="text-right">
                  {p.kills}/{p.deaths}
                </span>
                <span>Clutches</span>
                <span className="text-right">{p.clutches ?? '-'}</span>
                <span>KAST</span>
                <span className="text-right">
                  {((p.kast || 0) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
